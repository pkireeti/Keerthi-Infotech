// Google Workspace OAuth and API Configuration
import firebaseConfig from '../../firebase-applet-config.json';

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

export const getGoogleClientId = (): string => {
  return (
    window.__APPLET_CONFIG__?.oAuthClientId ||
    (firebaseConfig as any)?.oAuthClientId ||
    (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID ||
    ''
  );
};

export const getGoogleApiKey = (): string => {
  return (
    window.__APPLET_CONFIG__?.apiKey ||
    (firebaseConfig as any)?.apiKey ||
    (import.meta as any).env?.VITE_GOOGLE_API_KEY ||
    ''
  );
};

export const GOOGLE_SHEETS_SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
];
