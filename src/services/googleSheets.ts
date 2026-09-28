// Google Sheets Service for Keerthi Infotech Inquiries
import { getGoogleClientId, GOOGLE_SHEETS_SCOPES } from '../config/google-auth';

export interface InquiryRecord {
  name: string;
  phone: string;
  course: string;
  message?: string;
  source?: string;
}

export interface GoogleSheetsSyncResult {
  success: boolean;
  spreadsheetId?: string;
  spreadsheetUrl?: string;
  updatedRange?: string;
  error?: string;
}

const STORAGE_KEY_SPREADSHEET_ID = 'keerthi_infotech_spreadsheet_id';
const STORAGE_KEY_SPREADSHEET_URL = 'keerthi_infotech_spreadsheet_url';

export class GoogleSheetsService {
  private static tokenClient: any = null;
  private static inMemoryToken: string | null = null;
  private static tokenExpiresAt: number = 0;

  /**
   * Get the current in-memory access token if not expired
   */
  public static getAccessToken(): string | null {
    if (this.inMemoryToken && Date.now() < this.tokenExpiresAt) {
      return this.inMemoryToken;
    }
    return null;
  }

  /**
   * Set in-memory access token
   */
  public static setAccessToken(token: string, expiresInSeconds: number = 3599) {
    this.inMemoryToken = token;
    this.tokenExpiresAt = Date.now() + (expiresInSeconds - 60) * 1000;
  }

  /**
   * Clear in-memory token
   */
  public static clearAccessToken() {
    this.inMemoryToken = null;
    this.tokenExpiresAt = 0;
  }

  /**
   * Get stored Spreadsheet ID from localStorage
   */
  public static getStoredSpreadsheetId(): string | null {
    return localStorage.getItem(STORAGE_KEY_SPREADSHEET_ID);
  }

  /**
   * Get stored Spreadsheet URL from localStorage
   */
  public static getStoredSpreadsheetUrl(): string | null {
    return localStorage.getItem(STORAGE_KEY_SPREADSHEET_URL);
  }

  /**
   * Save Spreadsheet ID and URL
   */
  public static saveSpreadsheetInfo(id: string, url?: string) {
    localStorage.setItem(STORAGE_KEY_SPREADSHEET_ID, id);
    if (url) {
      localStorage.setItem(STORAGE_KEY_SPREADSHEET_URL, url);
    } else {
      localStorage.setItem(
        STORAGE_KEY_SPREADSHEET_URL,
        `https://docs.google.com/spreadsheets/d/${id}/edit`
      );
    }
  }

  /**
   * Request Google OAuth Access Token via Google Identity Services
   */
  public static async requestAccessToken(): Promise<string> {
    const existingToken = this.getAccessToken();
    if (existingToken) {
      return existingToken;
    }

    return new Promise((resolve, reject) => {
      const clientId = getGoogleClientId();
      if (!clientId) {
        reject(
          new Error(
            'Google OAuth Client ID is missing. Please verify client configuration.'
          )
        );
        return;
      }

      const win = window as any;
      if (!win.google || !win.google.accounts || !win.google.accounts.oauth2) {
        reject(
          new Error(
            'Google Identity Services library is not loaded yet. Please refresh the page.'
          )
        );
        return;
      }

      try {
        const client = win.google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope: GOOGLE_SHEETS_SCOPES.join(' '),
          callback: (response: any) => {
            if (response.error) {
              reject(new Error(response.error_description || response.error));
              return;
            }
            if (response.access_token) {
              const expiresIn = response.expires_in
                ? parseInt(response.expires_in, 10)
                : 3599;
              this.setAccessToken(response.access_token, expiresIn);
              resolve(response.access_token);
            } else {
              reject(new Error('No access token received from Google authorization.'));
            }
          },
        });

        this.tokenClient = client;
        // Prompt user for consent/authorization popup
        client.requestAccessToken({ prompt: '' });
      } catch (err: any) {
        reject(new Error(err?.message || 'Failed to initialize Google authorization.'));
      }
    });
  }

  /**
   * Get user email from tokeninfo
   */
  public static async getUserEmail(token: string): Promise<string | null> {
    try {
      const res = await fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`
      );
      if (res.ok) {
        const data = await res.json();
        return data.email || null;
      }
    } catch {
      // Ignore tokeninfo fetch error
    }
    return null;
  }

  /**
   * Create a new Google Spreadsheet for Keerthi Infotech student inquiries
   */
  public static async createSpreadsheet(token: string): Promise<{ id: string; url: string }> {
    const title = 'Keerthi Infotech - Student Inquiries & Admissions';
    const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          title,
        },
        sheets: [
          {
            properties: {
              title: 'Inquiries',
              gridProperties: {
                frozenRowCount: 1,
              },
            },
          },
        ],
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(
        errData?.error?.message || `Failed to create spreadsheet (${response.status})`
      );
    }

    const data = await response.json();
    const spreadsheetId = data.spreadsheetId;
    const spreadsheetUrl =
      data.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

    // Initialize Header Row with professional formatting columns
    const headers = [
      'Timestamp (IST)',
      'Full Name',
      'Mobile / WhatsApp',
      'Program of Interest',
      'Inquiry Notes / Questions',
      'Source',
      'Status',
    ];

    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Inquiries!A1:G1:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [headers],
        }),
      }
    );

    this.saveSpreadsheetInfo(spreadsheetId, spreadsheetUrl);
    return { id: spreadsheetId, url: spreadsheetUrl };
  }

  /**
   * Verify access to a spreadsheet
   */
  public static async verifySpreadsheetAccess(token: string, spreadsheetId: string): Promise<boolean> {
    try {
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=spreadsheetId,properties.title`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.ok;
    } catch {
      return false;
    }
  }

  /**
   * Append an inquiry record to Google Sheets
   */
  public static async appendInquiry(
    inquiry: InquiryRecord,
    providedToken?: string
  ): Promise<GoogleSheetsSyncResult> {
    try {
      const token = providedToken || (await this.requestAccessToken());
      let spreadsheetId = this.getStoredSpreadsheetId();
      let spreadsheetUrl = this.getStoredSpreadsheetUrl();

      // If no spreadsheet ID exists or previously saved one is inaccessible, create one
      if (!spreadsheetId) {
        const created = await this.createSpreadsheet(token);
        spreadsheetId = created.id;
        spreadsheetUrl = created.url;
      } else {
        // Verify access to existing sheet; if invalid/deleted, create a fresh one
        const isAccessible = await this.verifySpreadsheetAccess(token, spreadsheetId);
        if (!isAccessible) {
          const created = await this.createSpreadsheet(token);
          spreadsheetId = created.id;
          spreadsheetUrl = created.url;
        }
      }

      // Format date in Indian Standard Time (IST)
      const now = new Date();
      const istDateString = now.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short',
      });

      const rowValues = [
        istDateString,
        inquiry.name.trim(),
        inquiry.phone.trim(),
        inquiry.course.trim(),
        inquiry.message?.trim() || '—',
        inquiry.source || 'Website Contact Form',
        'New / Pending Counselor Callback',
      ];

      // Append row to the sheet
      const appendResponse = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A:G:append?valueInputOption=USER_ENTERED`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values: [rowValues],
          }),
        }
      );

      if (!appendResponse.ok) {
        const errJson = await appendResponse.json().catch(() => ({}));
        throw new Error(
          errJson?.error?.message ||
            `Failed to append row to Google Sheets (${appendResponse.status})`
        );
      }

      const appendData = await appendResponse.json();

      return {
        success: true,
        spreadsheetId,
        spreadsheetUrl:
          spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
        updatedRange: appendData.updates?.updatedRange,
      };
    } catch (err: any) {
      console.error('Error syncing to Google Sheets:', err);
      return {
        success: false,
        error: err?.message || 'Failed to sync inquiry to Google Sheets.',
      };
    }
  }

  /**
   * Fetch all rows from the spreadsheet
   */
  public static async fetchSheetRows(
    providedToken?: string,
    providedSpreadsheetId?: string
  ): Promise<{ headers: string[]; rows: string[][] }> {
    const token = providedToken || (await this.requestAccessToken());
    const spreadsheetId = providedSpreadsheetId || this.getStoredSpreadsheetId();

    if (!spreadsheetId) {
      return { headers: [], rows: [] };
    }

    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A:G`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error?.message || `Failed to read sheet (${response.status})`);
    }

    const data = await response.json();
    const values: string[][] = data.values || [];
    if (values.length === 0) {
      return { headers: [], rows: [] };
    }

    const [headers, ...rows] = values;
    return { headers, rows };
  }
}

