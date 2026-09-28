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

  const getSettings = () => {
    if (!fs.existsSync(SETTINGS_FILE)) {
      return { webhookUrl: '' };
    }
    try {
      return JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf-8'));
    } catch {
      return { webhookUrl: '' };
    }
  };

  const saveSettings = (settings: { webhookUrl: string }) => {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf-8');
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

      const inquiries = getInquiries();
      inquiries.unshift(newInquiry);
      saveInquiries(inquiries);

      // Optional: If direct Google Apps Script Webhook is configured, forward silently in real-time
      const settings = getSettings();
      if (settings.webhookUrl && settings.webhookUrl.startsWith('http')) {
        fetch(settings.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newInquiry),
        }).catch((err) => console.error('Webhook delivery error:', err));
      }

      return res.status(201).json({ success: true, inquiry: newInquiry });
    } catch (err: any) {
      console.error('Error recording student inquiry:', err);
      return res.status(500).json({ error: 'Internal server error recording inquiry' });
    }
  });

  // 2. Fetch all inquiries (used by Staff Portal)
  app.get('/api/inquiries', (req, res) => {
    try {
      const inquiries = getInquiries();
      return res.json({ inquiries });
    } catch (err: any) {
      return res.status(500).json({ error: 'Failed to retrieve inquiries' });
    }
  });

  // 3. Mark inquiries as synced to Google Sheets
  app.post('/api/inquiries/mark-synced', (req, res) => {
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

  // 4. Webhook settings for optional instant Google Apps Script integration
  app.get('/api/settings', (req, res) => {
    return res.json(getSettings());
  });

  app.post('/api/settings', (req, res) => {
    const { webhookUrl } = req.body;
    saveSettings({ webhookUrl: String(webhookUrl || '').trim() });
    return res.json({ success: true, settings: getSettings() });
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
