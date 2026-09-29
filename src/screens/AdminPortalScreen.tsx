import React, { useState, useEffect } from 'react';
import { useGoogleSheets } from '../context/GoogleSheetsContext';
import {
  FileSpreadsheet,
  RefreshCw,
  ExternalLink,
  LogOut,
  ShieldCheck,
  Search,
  Phone,
  MessageSquare,
  ArrowLeft,
  Calendar,
  UserCheck,
  Database,
  Lock,
  Download,
  AlertCircle,
  CheckCircle2,
  Cloud,
  Zap,
  Info,
  Code,
  Copy,
} from 'lucide-react';
import { ScreenType } from '../types';
import { getGoogleClientId } from '../config/google-auth';

interface ServerInquiry {
  id: string;
  timestamp: string;
  createdAt: string;
  name: string;
  phone: string;
  course: string;
  message: string;
  source: string;
  status: string;
  syncedToGoogleSheets: boolean;
}

interface AdminPortalScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const AdminPortalScreen: React.FC<AdminPortalScreenProps> = ({ onNavigate }) => {
  const {
    isConnected,
    isConnecting,
    userEmail,
    spreadsheetId,
    spreadsheetUrl,
    lastSyncStatus,
    connect,
    disconnect,
    syncInquiry,
    fetchRows,
  } = useGoogleSheets();

  const [inquiries, setInquiries] = useState<ServerInquiry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSyncingPending, setIsSyncingPending] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('all');
  const [syncFilter, setSyncFilter] = useState<'all' | 'pending' | 'synced'>('all');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Webhook configuration state
  const [webhookUrl, setWebhookUrl] = useState<string>('');
  const [isSavingWebhook, setIsSavingWebhook] = useState<boolean>(false);
  const [showWebhookGuide, setShowWebhookGuide] = useState<boolean>(false);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);

  // 1. Fetch inquiries from 24/7 Cloud Database
  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
      }
    } catch (err) {
      console.error('Failed to load inquiries from server:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Fetch webhook settings
  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        if (data.webhookUrl) setWebhookUrl(data.webhookUrl);
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    }
  };

  useEffect(() => {
    fetchInquiries();
    fetchSettings();
  }, []);

  // 3. Batch Sync all pending inquiries to Google Sheets
  const handleSyncPendingToSheets = async () => {
    if (!isConnected) {
      setStatusMessage({
        type: 'error',
        text: 'Please sign in with Google to sync with your spreadsheet.',
      });
      return;
    }

    const pending = inquiries.filter((inq) => !inq.syncedToGoogleSheets);
    if (pending.length === 0) {
      setStatusMessage({
        type: 'success',
        text: 'All student inquiries are already synced with your Google Sheet!',
      });
      return;
    }

    setIsSyncingPending(true);
    setStatusMessage(null);

    const successfullySyncedIds: string[] = [];

    try {
      for (const item of pending) {
        const result = await syncInquiry({
          name: item.name,
          phone: item.phone,
          course: item.course,
          message: item.message,
          source: item.source,
        });

        if (result.success) {
          successfullySyncedIds.push(item.id);
        }
      }

      if (successfullySyncedIds.length > 0) {
        // Mark as synced on server
        await fetch('/api/inquiries/mark-synced', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: successfullySyncedIds }),
        });

        // Update local state
        setInquiries((prev) =>
          prev.map((inq) =>
            successfullySyncedIds.includes(inq.id)
              ? { ...inq, syncedToGoogleSheets: true }
              : inq
          )
        );

        setStatusMessage({
          type: 'success',
          text: `Successfully synced ${successfullySyncedIds.length} student inquiry(ies) to Google Sheets!`,
        });
      }
    } catch (err: any) {
      console.error('Batch sync error:', err);
      setStatusMessage({
        type: 'error',
        text: 'Encountered an issue syncing some items. Please check connection and try again.',
      });
    } finally {
      setIsSyncingPending(false);
    }
  };

  // 4. Save Webhook URL
  const handleSaveWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingWebhook(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ webhookUrl }),
      });
      if (res.ok) {
        setStatusMessage({
          type: 'success',
          text: '24/7 Webhook URL saved successfully! New inquiries will forward automatically.',
        });
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: 'Failed to save webhook URL.',
      });
    } finally {
      setIsSavingWebhook(false);
    }
  };

  const copyScriptText = () => {
    const scriptCode = `function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.timestamp || new Date().toLocaleString("en-IN", {timeZone: "Asia/Kolkata"}),
    data.name,
    data.phone,
    data.course,
    data.message,
    data.source,
    "New Lead"
  ]);
  return ContentService.createTextOutput(JSON.stringify({"result":"success"})).setMimeType(ContentService.MimeType.JSON);
}`;
    navigator.clipboard.writeText(scriptCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 3000);
  };

  // Filter inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const textToMatch = `${inq.name} ${inq.phone} ${inq.course} ${inq.message} ${inq.source}`.toLowerCase();
    const matchesSearch = !searchTerm.trim() || textToMatch.includes(searchTerm.toLowerCase());
    const matchesCourse =
      selectedCourseFilter === 'all' ||
      inq.course.toLowerCase().includes(selectedCourseFilter.toLowerCase());
    const matchesSync =
      syncFilter === 'all'
        ? true
        : syncFilter === 'pending'
        ? !inq.syncedToGoogleSheets
        : inq.syncedToGoogleSheets;

    return matchesSearch && matchesCourse && matchesSync;
  });

  const pendingCount = inquiries.filter((inq) => !inq.syncedToGoogleSheets).length;

  const handleExportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = [
      'Timestamp (IST)',
      'Full Name',
      'Contact Phone',
      'Course / Program',
      'Inquiry Notes',
      'Source',
      'Status',
      'Google Sheets Synced',
    ];
    const dataRows = inquiries.map((inq) => [
      inq.timestamp,
      inq.name,
      inq.phone,
      inq.course,
      inq.message,
      inq.source,
      inq.status,
      inq.syncedToGoogleSheets ? 'YES' : 'PENDING',
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers, ...dataRows]
        .map((row) => row.map((cell) => `"${(cell || '').replace(/"/g, '""')}"`).join(','))
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Keerthi_Infotech_Admissions_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#f4f6fb] py-8 px-4 md:px-10">
      <div className="max-w-[85rem] mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#ffffff] p-5 rounded-2xl border border-[#c0c7d1]/50 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#c0c7d1] text-xs font-bold text-[#131b2e] hover:bg-[#f2f3ff] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Website</span>
            </button>
            <div className="h-6 w-px bg-[#c0c7d1]/50 hidden sm:block"></div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#00507d] text-[#ffffff] flex items-center justify-center font-bold text-xs shadow-xs">
                KI
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-bold text-[#131b2e]">
                    Staff Admissions & Google Sheets Portal
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#dae2fd] text-[#00507d]">
                    <Lock className="w-2.5 h-2.5" />
                    Private Admin
                  </span>
                </div>
                <p className="text-xs text-[#40474f]">
                  Keerthi Infotech Miyapur • 24/7 Cloud Lead Capture
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap self-end sm:self-center">
            {isConnected ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#e6f4ea] text-[#137333] border border-[#ceead6] text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#137333] animate-pulse"></span>
                  <span>{userEmail || 'Google Staff Account'}</span>
                </div>
                {spreadsheetUrl && (
                  <a
                    href={spreadsheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0f9d58] text-[#ffffff] text-xs font-bold hover:bg-[#0b8043] transition-colors shadow-xs"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Open Live Sheet</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={disconnect}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-[#c0c7d1] text-xs text-[#ba1a1a] hover:bg-[#ffebee] transition-colors cursor-pointer"
                  title="Sign out of Google Sheets"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col items-end gap-1">
                <button
                  onClick={async () => {
                    const ok = await connect();
                    if (!ok && lastSyncStatus.message) {
                      setStatusMessage({
                        type: 'error',
                        text: lastSyncStatus.message,
                      });
                    }
                  }}
                  disabled={isConnecting}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#131b2e] text-[#ffffff] text-xs font-bold hover:bg-[#00507d] transition-all cursor-pointer shadow-xs disabled:opacity-60"
                >
                  {isConnecting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Connecting Staff Google Account...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span>Connect Google Sheets for Sync</span>
                    </>
                  )}
                </button>
                <div
                  className="text-[10px] text-[#5f6368] font-mono select-all"
                  title={`Google OAuth Client: ${getGoogleClientId()}`}
                >
                  OAuth: {getGoogleClientId().slice(0, 12)}...{getGoogleClientId().slice(-28)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status Alert Banner */}
        {statusMessage && (
          <div
            className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs ${
              statusMessage.type === 'success'
                ? 'bg-[#e6f4ea] text-[#137333] border-[#ceead6]'
                : 'bg-[#ffebee] text-[#ba1a1a] border-[#ffcdd2]'
            }`}
          >
            <div className="flex items-center gap-2">
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#137333]" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-[#ba1a1a]" />
              )}
              <span className="font-semibold">{statusMessage.text}</span>
            </div>
            <button
              onClick={() => setStatusMessage(null)}
              className="text-xs font-bold hover:underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* 24/7 Lead Capture Architecture Explainer Strip */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#00507d]/10 via-[#00507d]/5 to-transparent border border-[#00507d]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-[#001d32]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00507d] text-[#ffffff] flex items-center justify-center shrink-0">
              <Cloud className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold">24/7 Cloud Capture is Active:</span> All inquiries submitted by any visitor on any phone or laptop are permanently recorded in your database immediately.
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center gap-1 font-semibold text-[#00507d]">
              <span className="w-2 h-2 rounded-full bg-[#00507d] animate-ping"></span>
              Live Database Online
            </span>
            <button
              onClick={() => setShowWebhookGuide(!showWebhookGuide)}
              className="font-bold underline hover:text-[#00507d] cursor-pointer"
            >
              {showWebhookGuide ? 'Hide Instant Webhook Guide' : 'Instant 24/7 Webhook (Optional)'}
            </button>
          </div>
        </div>

        {/* Optional Webhook Guide Drawer */}
        {showWebhookGuide && (
          <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#00507d]/30 shadow-sm space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#00507d]" />
                <h3 className="text-sm font-bold text-[#131b2e]">
                  Optional: Direct Google Apps Script Webhook (Instant 24/7 Google Sheets Auto-Post)
                </h3>
              </div>
              <button
                onClick={() => setShowWebhookGuide(false)}
                className="text-xs text-[#40474f] hover:underline cursor-pointer"
              >
                Close
              </button>
            </div>
            <p className="text-xs text-[#40474f] leading-relaxed">
              If you want student submissions to appear inside your Google Sheet <strong>in real time even when you don't open the website</strong>, you can paste this 4-line script into your Google Sheet (via <em>Extensions &gt; Apps Script</em>) and paste the deployed Web App URL below:
            </p>

            <div className="relative bg-[#131b2e] text-[#cde5ff] p-3.5 rounded-xl font-mono text-xs overflow-x-auto">
              <button
                onClick={copyScriptText}
                className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md bg-[#ffffff]/20 hover:bg-[#ffffff]/30 text-white text-[11px] flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>{copiedScript ? 'Copied!' : 'Copy Script'}</span>
              </button>
              <pre>{`function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.timestamp || new Date().toLocaleString("en-IN", {timeZone: "Asia/Kolkata"}),
    data.name,
    data.phone,
    data.course,
    data.message,
    data.source,
    "New Lead"
  ]);
  return ContentService.createTextOutput(JSON.stringify({"result":"success"})).setMimeType(ContentService.MimeType.JSON);
}`}</pre>
            </div>

            <form onSubmit={handleSaveWebhook} className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                placeholder="https://script.google.com/macros/s/.../exec"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl border border-[#c0c7d1] text-xs text-[#131b2e] focus:outline-hidden focus:border-[#00507d]"
              />
              <button
                type="submit"
                disabled={isSavingWebhook}
                className="px-4 py-2 rounded-xl bg-[#00507d] text-[#ffffff] font-bold text-xs hover:bg-[#0369a1] transition-colors cursor-pointer disabled:opacity-60 shrink-0"
              >
                {isSavingWebhook ? 'Saving...' : 'Save Webhook URL'}
              </button>
            </form>
          </div>
        )}

        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#c0c7d1]/50 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#cde5ff] text-[#00507d] flex items-center justify-center shrink-0">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#40474f] uppercase tracking-wider">
                Total Inquiries (24/7)
              </div>
              <div className="text-2xl font-black text-[#131b2e]">
                {inquiries.length}
              </div>
              <div className="text-[11px] text-[#00507d] font-medium">
                Captured permanently in database
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#c0c7d1]/50 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0f9d58]/10 text-[#0f9d58] flex items-center justify-center shrink-0 border border-[#0f9d58]/20">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#40474f] uppercase tracking-wider">
                Google Sheets Sync
              </div>
              <div className="text-sm font-bold text-[#131b2e] flex items-center gap-1.5 mt-0.5">
                {isConnected ? (
                  <span className="text-[#137333] flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#137333]"></span>
                    Connected
                  </span>
                ) : (
                  <span className="text-[#5f6368]">Not Connected</span>
                )}
              </div>
              <div className="text-[11px] text-[#40474f] truncate max-w-[150px]">
                {pendingCount > 0 ? `${pendingCount} pending sync` : 'All records synced'}
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#c0c7d1]/50 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#fff8e1] text-[#b06000] flex items-center justify-center shrink-0 border border-[#ffe082]">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#40474f] uppercase tracking-wider">
                Pending Sheet Sync
              </div>
              <div className="text-2xl font-black text-[#b06000]">
                {pendingCount}
              </div>
              <div className="text-[11px] text-[#40474f]">
                Ready to stream to Google Sheets
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#c0c7d1]/50 shadow-xs flex flex-col justify-between">
            <div className="text-xs font-semibold text-[#40474f] uppercase tracking-wider">
              Quick Sync Action
            </div>
            <div className="mt-2">
              {isConnected ? (
                <button
                  onClick={handleSyncPendingToSheets}
                  disabled={isSyncingPending || pendingCount === 0}
                  className="w-full py-2 px-3 rounded-xl bg-[#0f9d58] text-[#ffffff] text-xs font-bold hover:bg-[#0b8043] transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  {isSyncingPending ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Syncing {pendingCount} Rows...</span>
                    </>
                  ) : pendingCount > 0 ? (
                    <>
                      <Zap className="w-3.5 h-3.5" />
                      <span>Sync {pendingCount} Pending to Sheets</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>All Synced to Sheets</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => connect()}
                  className="w-full py-2 px-3 rounded-xl bg-[#00507d] text-[#ffffff] text-xs font-bold hover:bg-[#0369a1] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Connect Sheets to Sync</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Data Management Table Container */}
        <div className="bg-[#ffffff] rounded-2xl border border-[#c0c7d1]/50 shadow-xs overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 md:p-5 border-b border-[#c0c7d1]/40 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#faf8ff]">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#40474f]" />
                <input
                  type="text"
                  placeholder="Search by student name, phone, course, notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-[#c0c7d1] bg-[#ffffff] text-xs text-[#131b2e] focus:outline-hidden focus:border-[#00507d]"
                />
              </div>

              <select
                value={selectedCourseFilter}
                onChange={(e) => setSelectedCourseFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-[#c0c7d1] bg-[#ffffff] text-xs text-[#131b2e] focus:outline-hidden focus:border-[#00507d]"
              >
                <option value="all">All Programs ({inquiries.length})</option>
                <option value="DCA">DCA Diploma</option>
                <option value="MDCA">MDCA Master Diploma</option>
                <option value="Tally">Tally with GST</option>
                <option value="Excel">Advanced Excel</option>
                <option value="Python">Python</option>
                <option value="C & C++">C / C++</option>
                <option value="Power BI">Power BI & AI</option>
              </select>

              <select
                value={syncFilter}
                onChange={(e) => setSyncFilter(e.target.value as any)}
                className="px-3 py-2 rounded-xl border border-[#c0c7d1] bg-[#ffffff] text-xs text-[#131b2e] focus:outline-hidden focus:border-[#00507d]"
              >
                <option value="all">All Sync Status</option>
                <option value="pending">Pending Sheets Sync ({pendingCount})</option>
                <option value="synced">Synced to Sheets ({inquiries.length - pendingCount})</option>
              </select>
            </div>

            <div className="flex items-center gap-2 self-end md:self-center">
              <button
                onClick={fetchInquiries}
                disabled={isLoading}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#c0c7d1] bg-[#ffffff] text-xs font-semibold text-[#131b2e] hover:bg-[#f2f3ff] transition-colors cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh Leads</span>
              </button>

              <button
                onClick={handleExportCSV}
                disabled={inquiries.length === 0}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#00507d] text-[#ffffff] text-xs font-bold hover:bg-[#0369a1] transition-colors cursor-pointer shadow-xs disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="py-20 flex flex-col items-center justify-center space-y-3">
                <RefreshCw className="w-8 h-8 text-[#00507d] animate-spin" />
                <p className="text-sm font-semibold text-[#131b2e]">
                  Loading real-time 24/7 inquiries...
                </p>
              </div>
            ) : filteredInquiries.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center space-y-3 text-center px-4">
                <div className="w-14 h-14 rounded-2xl bg-[#dae2fd] text-[#00507d] flex items-center justify-center">
                  <Database className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-[#131b2e]">
                  {inquiries.length === 0
                    ? 'No Inquiries Recorded Yet'
                    : 'No Inquiries Match Your Search'}
                </h3>
                <p className="text-xs text-[#40474f] max-w-md">
                  {inquiries.length === 0
                    ? 'When any student submits the Contact form or clicks Enquire Now, their information is immediately saved here 24/7 from any device.'
                    : 'Try changing your search terms or filters.'}
                </p>
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f2f3ff] text-[#131b2e] font-bold border-b border-[#c0c7d1]/50">
                  <tr>
                    <th className="px-4 py-3.5 whitespace-nowrap">Timestamp (IST)</th>
                    <th className="px-4 py-3.5 whitespace-nowrap">Student Name</th>
                    <th className="px-4 py-3.5 whitespace-nowrap">Contact Phone</th>
                    <th className="px-4 py-3.5 whitespace-nowrap">Program of Interest</th>
                    <th className="px-4 py-3.5 min-w-[200px]">Notes / Questions</th>
                    <th className="px-4 py-3.5 whitespace-nowrap">Source</th>
                    <th className="px-4 py-3.5 whitespace-nowrap">Sheets Sync</th>
                    <th className="px-4 py-3.5 whitespace-nowrap text-right">Quick Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c0c7d1]/30 bg-[#ffffff]">
                  {filteredInquiries.map((inq) => {
                    const phoneNum = inq.phone.replace(/\D/g, '');

                    return (
                      <tr key={inq.id} className="hover:bg-[#faf8ff] transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap font-mono text-[11px] text-[#40474f]">
                          {inq.timestamp || '—'}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap font-bold text-[#131b2e]">
                          {inq.name}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {inq.phone ? (
                            <a
                              href={`tel:${inq.phone}`}
                              className="text-[#00507d] font-semibold hover:underline font-mono"
                            >
                              {inq.phone}
                            </a>
                          ) : (
                            '—'
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap font-medium text-[#131b2e]">
                          {inq.course}
                        </td>
                        <td className="px-4 py-3 text-[#40474f] max-w-sm text-xs" title={inq.message}>
                          {inq.message || '—'}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-[11px] text-[#5f6368]">
                          {inq.source || 'Website'}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {inq.syncedToGoogleSheets ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#e6f4ea] text-[#137333] border border-[#ceead6]">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>In Google Sheets</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#fff8e1] text-[#b06000] border border-[#ffe082]">
                              <Cloud className="w-3 h-3" />
                              <span>In Cloud Database (Pending Sheet)</span>
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {phoneNum && (
                              <>
                                <a
                                  href={`tel:${phoneNum}`}
                                  className="p-1.5 rounded-lg border border-[#c0c7d1] text-[#00507d] hover:bg-[#f2f3ff] transition-colors"
                                  title="Call Student"
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                </a>
                                <a
                                  href={`https://wa.me/91${phoneNum}?text=Hello%20${encodeURIComponent(inq.name)},%20this%20is%20Keerthi%20Infotech%20Admissions%20counselor%20regarding%20your%20inquiry%20for%20${encodeURIComponent(inq.course)}.`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg border border-[#c0c7d1] text-[#137333] hover:bg-[#e6f4ea] transition-colors"
                                  title="WhatsApp Student"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                </a>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Table Footer */}
          <div className="p-4 bg-[#f2f3ff] border-t border-[#c0c7d1]/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#40474f]">
            <div>
              Showing <strong>{filteredInquiries.length}</strong> of <strong>{inquiries.length}</strong> total inquiries stored
            </div>
            {spreadsheetUrl && (
              <a
                href={spreadsheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-[#0f9d58] hover:underline"
              >
                <span>Open Google Spreadsheet</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
