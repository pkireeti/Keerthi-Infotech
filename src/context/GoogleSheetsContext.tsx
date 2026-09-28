import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  GoogleSheetsService,
  InquiryRecord,
  GoogleSheetsSyncResult,
} from '../services/googleSheets';

interface GoogleSheetsContextType {
  isConnected: boolean;
  isConnecting: boolean;
  userEmail: string | null;
  spreadsheetId: string | null;
  spreadsheetUrl: string | null;
  lastSyncStatus: {
    status: 'idle' | 'syncing' | 'success' | 'error';
    message?: string;
    url?: string;
    timestamp?: number;
  };
  connect: () => Promise<boolean>;
  disconnect: () => void;
  createOrResetSpreadsheet: () => Promise<{ id: string; url: string } | null>;
  syncInquiry: (inquiry: InquiryRecord) => Promise<GoogleSheetsSyncResult>;
  fetchRows: () => Promise<{ headers: string[]; rows: string[][] }>;
}

const GoogleSheetsContext = createContext<GoogleSheetsContextType | undefined>(undefined);

export const GoogleSheetsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [spreadsheetId, setSpreadsheetId] = useState<string | null>(() =>
    GoogleSheetsService.getStoredSpreadsheetId()
  );
  const [spreadsheetUrl, setSpreadsheetUrl] = useState<string | null>(() =>
    GoogleSheetsService.getStoredSpreadsheetUrl()
  );
  const [lastSyncStatus, setLastSyncStatus] = useState<{
    status: 'idle' | 'syncing' | 'success' | 'error';
    message?: string;
    url?: string;
    timestamp?: number;
  }>({ status: 'idle' });

  // Check if token exists in memory on mount or after changes
  useEffect(() => {
    const token = GoogleSheetsService.getAccessToken();
    if (token) {
      setIsConnected(true);
      GoogleSheetsService.getUserEmail(token).then((email) => {
        if (email) setUserEmail(email);
      });
    }
  }, []);

  const connect = async (): Promise<boolean> => {
    setIsConnecting(true);
    try {
      const token = await GoogleSheetsService.requestAccessToken();
      setIsConnected(true);
      const email = await GoogleSheetsService.getUserEmail(token);
      if (email) setUserEmail(email);

      // Check if we need to auto-create or ensure spreadsheet exists
      let currentId = GoogleSheetsService.getStoredSpreadsheetId();
      if (!currentId) {
        const created = await GoogleSheetsService.createSpreadsheet(token);
        setSpreadsheetId(created.id);
        setSpreadsheetUrl(created.url);
      } else {
        const accessible = await GoogleSheetsService.verifySpreadsheetAccess(token, currentId);
        if (!accessible) {
          const created = await GoogleSheetsService.createSpreadsheet(token);
          setSpreadsheetId(created.id);
          setSpreadsheetUrl(created.url);
        } else {
          setSpreadsheetId(currentId);
          setSpreadsheetUrl(GoogleSheetsService.getStoredSpreadsheetUrl());
        }
      }

      setIsConnecting(false);
      return true;
    } catch (err: any) {
      console.error('Google Sheets connection error:', err);
      setIsConnecting(false);
      setLastSyncStatus({
        status: 'error',
        message: err?.message || 'Failed to connect Google Sheets',
        timestamp: Date.now(),
      });
      return false;
    }
  };

  const disconnect = () => {
    GoogleSheetsService.clearAccessToken();
    setIsConnected(false);
    setUserEmail(null);
  };

  const createOrResetSpreadsheet = async () => {
    try {
      const token = await GoogleSheetsService.requestAccessToken();
      const created = await GoogleSheetsService.createSpreadsheet(token);
      setSpreadsheetId(created.id);
      setSpreadsheetUrl(created.url);
      return created;
    } catch (err) {
      console.error('Failed to create new spreadsheet:', err);
      return null;
    }
  };

  const syncInquiry = async (inquiry: InquiryRecord): Promise<GoogleSheetsSyncResult> => {
    setLastSyncStatus({ status: 'syncing' });
    try {
      const result = await GoogleSheetsService.appendInquiry(inquiry);
      if (result.success) {
        if (result.spreadsheetId) setSpreadsheetId(result.spreadsheetId);
        if (result.spreadsheetUrl) setSpreadsheetUrl(result.spreadsheetUrl);

        setIsConnected(true);
        setLastSyncStatus({
          status: 'success',
          message: 'Inquiry successfully saved to Google Sheets',
          url: result.spreadsheetUrl,
          timestamp: Date.now(),
        });
      } else {
        setLastSyncStatus({
          status: 'error',
          message: result.error || 'Failed to sync inquiry',
          timestamp: Date.now(),
        });
      }
      return result;
    } catch (err: any) {
      const errorMsg = err?.message || 'Unknown error occurred while syncing';
      setLastSyncStatus({
        status: 'error',
        message: errorMsg,
        timestamp: Date.now(),
      });
      return { success: false, error: errorMsg };
    }
  };

  const fetchRows = async (): Promise<{ headers: string[]; rows: string[][] }> => {
    try {
      const token = await GoogleSheetsService.requestAccessToken();
      const currentId = GoogleSheetsService.getStoredSpreadsheetId();
      if (!currentId) {
        return { headers: [], rows: [] };
      }
      return await GoogleSheetsService.fetchSheetRows(token, currentId);
    } catch (err: any) {
      console.error('Failed to fetch spreadsheet rows:', err);
      return { headers: [], rows: [] };
    }
  };

  return (
    <GoogleSheetsContext.Provider
      value={{
        isConnected,
        isConnecting,
        userEmail,
        spreadsheetId,
        spreadsheetUrl,
        lastSyncStatus,
        connect,
        disconnect,
        createOrResetSpreadsheet,
        syncInquiry,
        fetchRows,
      }}
    >
      {children}
    </GoogleSheetsContext.Provider>
  );
};

export const useGoogleSheets = () => {
  const context = useContext(GoogleSheetsContext);
  if (!context) {
    throw new Error('useGoogleSheets must be used within a GoogleSheetsProvider');
  }
  return context;
};
