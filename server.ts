import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Permanent data persistence for student admissions & inquiries
  const DATA_DIR = path.resolve(__dirname, 'data');
  const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
  const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const getInquiries = (): any[] => {
    if (!fs.existsSync(INQUIRIES_FILE)) {
      return [];
    }
    try {
      const content = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
      return JSON.parse(content);
    } catch {
      return [];
    }
  };

  const saveInquiries = (inquiries: any[]) => {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
  };

  const getSettings = (): { webhookUrl: string; staffPassword?: string } => {
    if (!fs.existsSync(SETTINGS_FILE)) {
      return { webhookUrl: '' };
    }
    try {
      return JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf-8'));
    } catch {
      return { webhookUrl: '' };
    }
  };

  const saveSettings = (settings: { webhookUrl?: string; staffPassword?: string }) => {
    const current = getSettings();
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify({ ...current, ...settings }, null, 2), 'utf-8');
  };

  const getEffectiveStaffPassword = (): string => {
    const settings = getSettings();
    if (settings.staffPassword && typeof settings.staffPassword === 'string' && settings.staffPassword.trim() !== '') {
      return settings.staffPassword.trim();
    }
    return process.env.STAFF_PORTAL_PASSWORD || 'keerthi1999';
  };

  // Google Apps Script Webhook URL resolution:
  // 1. Primary: Server environment variable (Railway / backend environment)
  // 2. Fallback: Configured in settings.json
  const getWebhookUrl = (): string => {
    const envWebhook = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL;
    if (envWebhook && typeof envWebhook === 'string' && envWebhook.trim().startsWith('http')) {
      return envWebhook.trim();
    }
    const settings = getSettings();
    if (settings.webhookUrl && typeof settings.webhookUrl === 'string' && settings.webhookUrl.trim().startsWith('http')) {
      return settings.webhookUrl.trim();
    }
    return '';
  };

  // Staff Authentication Middleware
  const requireStaffAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.headers['x-staff-token'] || req.headers['authorization'];
    const effectivePass = getEffectiveStaffPassword();

    if (token === effectivePass || token === `Bearer ${effectivePass}`) {
      return next();
    }
    return res.status(401).json({ error: 'Unauthorized: Staff authentication required' });
  };

  // 1. Submit Inquiry 24/7 (Always open for any student / visitor from any device)
  app.post('/api/inquiries', async (req, res) => {
    try {
      const { name, phone, course, message, source } = req.body;
      if (!name || !phone) {
        return res.status(400).json({ error: 'Name and phone are required' });
      }

      // Format current timestamp in Indian Standard Time (IST)
      const now = new Date();
      const istTime = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(now);

      const newInquiry = {
        id: 'inq_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        timestamp: istTime,
        createdAt: now.toISOString(),
        name: String(name).trim(),
        phone: String(phone).trim(),
        course: String(course || 'DCA Diploma').trim(),
        message: String(message || '').trim(),
        source: String(source || 'Website Contact Form').trim(),
        status: 'New Lead',
        syncedToGoogleSheets: false,
      };

      // Always save locally to database first
      const inquiries = getInquiries();
      inquiries.unshift(newInquiry);
      saveInquiries(inquiries);

      // Webhook payload: using existing inquiry fields
      const webhookPayload = {
        timestamp: newInquiry.timestamp,
        name: newInquiry.name,
        phone: newInquiry.phone,
        course: newInquiry.course,
        message: newInquiry.message,
        source: newInquiry.source,
        id: newInquiry.id,
        status: newInquiry.status,
        createdAt: newInquiry.createdAt,
      };

      // Forward to Google Apps Script Webhook if configured
      const targetWebhookUrl = getWebhookUrl();
      if (targetWebhookUrl) {
        // Send HTTP POST asynchronously so Google Sheets latency or downtime doesn't impact customer enquiry response
        (async () => {
          try {
            console.log(`[Webhook] Forwarding enquiry ${newInquiry.id} to Google Apps Script...`);
            const webhookRes = await fetch(targetWebhookUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(webhookPayload),
              redirect: 'follow',
            });

            if (webhookRes.ok) {
              console.log(`[Webhook] Successfully forwarded enquiry ${newInquiry.id} to Google Sheets (Status: ${webhookRes.status}).`);
              // Mark as synced locally in database
              try {
                const current = getInquiries();
                const updated = current.map((item: any) =>
                  item.id === newInquiry.id ? { ...item, syncedToGoogleSheets: true } : item
                );
                saveInquiries(updated);
              } catch (updateErr) {
                console.error('[Webhook] Error marking inquiry synced locally:', updateErr);
              }
            } else {
              const resBody = await webhookRes.text().catch(() => '');
              console.warn(`[Webhook] Google Apps Script responded with HTTP ${webhookRes.status}: ${resBody}`);
            }
          } catch (webhookErr: any) {
            console.error(
              `[Webhook] Failed to deliver enquiry ${newInquiry.id} to Google Apps Script:`,
              webhookErr?.message || webhookErr
            );
          }
        })();
      } else {
        console.log('[Webhook] No GOOGLE_APPS_SCRIPT_WEBHOOK_URL configured. Inquiry saved locally.');
      }

      // Return success response to the customer immediately
      return res.status(201).json({ success: true, inquiry: newInquiry });
    } catch (err: any) {
      console.error('Error recording student inquiry:', err);
      return res.status(500).json({ error: 'Internal server error recording inquiry' });
    }
  });

  // Staff Authentication Endpoints
  app.post('/api/staff/login', (req, res) => {
    const { password } = req.body;
    const effectivePass = getEffectiveStaffPassword();
    if (!password || String(password).trim() !== effectivePass) {
      return res.status(401).json({ error: 'Invalid staff passcode. Access denied.' });
    }
    return res.json({ success: true, token: effectivePass });
  });

  app.get('/api/staff/verify', requireStaffAuth, (req, res) => {
    return res.json({ success: true, valid: true });
  });

  app.post('/api/staff/change-password', requireStaffAuth, (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const effectivePass = getEffectiveStaffPassword();
    if (currentPassword !== effectivePass) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }
    if (!newPassword || typeof newPassword !== 'string' || newPassword.trim().length < 4) {
      return res.status(400).json({ error: 'New password must be at least 4 characters long' });
    }
    saveSettings({ staffPassword: newPassword.trim() });
    return res.json({
      success: true,
      message: 'Staff password updated successfully',
      token: newPassword.trim(),
    });
  });

  // 2. Fetch all inquiries (used by Staff Portal - Protected)
  app.get('/api/inquiries', requireStaffAuth, (req, res) => {
    try {
      const inquiries = getInquiries();
      return res.json({ inquiries });
    } catch (err: any) {
      return res.status(500).json({ error: 'Failed to retrieve inquiries' });
    }
  });

  // 3. Mark inquiries as synced to Google Sheets (Protected)
  app.post('/api/inquiries/mark-synced', requireStaffAuth, (req, res) => {
    try {
      const { ids } = req.body;
      if (!Array.isArray(ids)) {
        return res.status(400).json({ error: 'ids array is required' });
      }
      const inquiries = getInquiries();
      const idSet = new Set(ids);
      const updated = inquiries.map((item: any) => {
        if (idSet.has(item.id)) {
          return { ...item, syncedToGoogleSheets: true };
        }
        return item;
      });
      saveInquiries(updated);
      return res.json({ success: true, count: ids.length });
    } catch (err: any) {
      return res.status(500).json({ error: 'Failed to update sync status' });
    }
  });

  // 4. Webhook settings for optional instant Google Apps Script integration (Protected)
  app.get('/api/settings', requireStaffAuth, (req, res) => {
    const settings = getSettings();
    const hasEnvWebhook = Boolean(
      process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL &&
      process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL.trim().startsWith('http')
    );
    // Never expose raw server environment variables to the browser
    return res.json({
      webhookUrl: settings.webhookUrl || '',
      hasEnvWebhook,
    });
  });

  app.post('/api/settings', requireStaffAuth, (req, res) => {
    const { webhookUrl } = req.body;
    saveSettings({ webhookUrl: String(webhookUrl || '').trim() });
    return res.json({ success: true, settings: { webhookUrl: String(webhookUrl || '').trim() } });
  });

  // Mount Vite middleware for development
  if (process.env.NODE_ENV === 'production' && fs.existsSync(path.resolve(__dirname, 'dist'))) {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Keerthi Infotech Full-Stack Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
