// Google Workspace OAuth and API Configuration
import firebaseConfig from '../../firebase-applet-config.json';

// Current active Google OAuth Web Client ID
export const CURRENT_GOOGLE_CLIENT_ID =
  '253256067985-isjjpv68jftns9fenog3e30j4j4cs2af.apps.googleusercontent.com';

declare global {
  interface Window {
    google?: any;
    __APPLET_CONFIG__?: {
      oAuthClientId?: string;
      apiKey?: string;
      projectId?: string;
    };
  }
}

/**
 * Resolves Google OAuth Client ID with proper priority:
 * 1. Prioritizes explicit VITE_GOOGLE_CLIENT_ID environment variable (never overridden by static config)
 * 2. Dynamic runtime config (window.__APPLET_CONFIG__)
 * 3. firebase-applet-config.json oAuthClientId
 * 4. Fallback default to CURRENT_GOOGLE_CLIENT_ID
 */
export const getGoogleClientId = (): string => {
  const envClientId = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID;
  if (envClientId && typeof envClientId === 'string' && envClientId.trim() !== '') {
    return envClientId.trim();
  }

  if (window.__APPLET_CONFIG__?.oAuthClientId) {
    return window.__APPLET_CONFIG__.oAuthClientId;
  }

  if ((firebaseConfig as any)?.oAuthClientId) {
    return (firebaseConfig as any).oAuthClientId;
  }

  return CURRENT_GOOGLE_CLIENT_ID;
};

export const getGoogleApiKey = (): string => {
  const envApiKey = (import.meta as any).env?.VITE_GOOGLE_API_KEY;
  if (envApiKey && typeof envApiKey === 'string' && envApiKey.trim() !== '') {
    return envApiKey.trim();
  }

  return (
    window.__APPLET_CONFIG__?.apiKey ||
    (firebaseConfig as any)?.apiKey ||
    ''
  );
};

export const GOOGLE_SHEETS_SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
];
