import React, { useState } from 'react';
import { X, CheckCircle2, Phone, Calendar, BookOpen, Send, FileSpreadsheet, ExternalLink, RefreshCw } from 'lucide-react';
import { COURSES_CATALOG, INSTITUTION_INFO } from '../data/coursesData';
import { useGoogleSheets } from '../context/GoogleSheetsContext';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourseId?: string;
  defaultMode?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultCourseId,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [courseId, setCourseId] = useState(defaultCourseId || 'dca-diploma');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isConnected, spreadsheetUrl, syncInquiry } = useGoogleSheets();

  if (!isOpen) return null;

  const selectedCourse = COURSES_CATALOG.find((c) => c.id === courseId) || COURSES_CATALOG[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setIsSubmitting(true);

    const record = {
      name: name.trim(),
      phone: phone.trim(),
      course: selectedCourse.title,
      message: notes.trim(),
      source: 'Admission Enquiry Modal',
    };

    // 1. Always save to 24/7 database first
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
    } catch (err) {
      console.error('Failed to post inquiry to server database:', err);
    }

    // 2. If Google Sheets is connected in this browser session, sync directly
    if (isConnected) {
      try {
        await syncInquiry(record);
      } catch (err) {
        console.error('Direct Google Sheets sync error:', err);
      }
    }

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setPhone('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#131b2e]/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-[#ffffff] rounded-2xl shadow-2xl border border-[#c0c7d1]/50 overflow-hidden">
        {/* Header */}
        <div className="bg-[#f2f3ff] px-6 py-4 border-b border-[#c0c7d1]/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/keerthi-logo.jpeg"
              alt="Keerthi Infotech Logo"
              className="h-9 w-auto object-contain"
            />
            <div>
              <h3 className="text-[17px] font-bold text-[#131b2e] leading-tight">
                Course Admission & Syllabus Enquiry
              </h3>
              <p className="text-xs text-[#40474f]">
                Keerthi Infotech • Estd. 1999 • Reg. No: 1999/TN/IT-EDU
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#40474f] hover:bg-[#dae2fd] hover:text-[#131b2e] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#cde5ff] text-[#00507d] flex items-center justify-center mx-auto ring-8 ring-[#eaedff]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-[#131b2e]">
                  Enquiry Successfully Received!
                </h4>
                <p className="text-sm text-[#40474f] max-w-sm mx-auto">
                  Thank you, <strong className="text-[#131b2e]">{name}</strong>. Our admissions counselor at our Miyapur campus will contact you within 30 minutes at <strong className="text-[#00507d]">{phone}</strong>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#f2f3ff] text-left text-xs space-y-1.5 border border-[#c0c7d1]/50">
                <div className="flex justify-between">
                  <span className="text-[#40474f]">Course:</span>
                  <span className="font-semibold text-[#131b2e]">{selectedCourse.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#40474f]">Campus Address:</span>
                  <span className="font-semibold text-[#131b2e]">Miyapur, Below Union Bank</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`https://wa.me/919849174718?text=Hi%20Keerthi%20Infotech,%20I%20just%20submitted%20an%20enquiry%20for%20${encodeURIComponent(selectedCourse.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0369a1] text-[#ffffff] font-medium text-sm hover:bg-[#00507d]"
                >
                  Confirm Instant on WhatsApp
                </a>
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-xl border border-[#c0c7d1] text-[#131b2e] font-medium text-sm hover:bg-[#f2f3ff] cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#c0c7d1] bg-[#ffffff] text-sm text-[#131b2e] focus:outline-hidden focus:border-[#00507d] focus:ring-2 focus:ring-[#cde5ff]"
                />
              </div>

              {/* Mobile Phone */}
              <div>
                <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                  Mobile / WhatsApp Number *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-sm text-[#40474f] font-medium">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-12 pr-3.5 py-2.5 rounded-xl border border-[#c0c7d1] bg-[#ffffff] text-sm text-[#131b2e] focus:outline-hidden focus:border-[#00507d] focus:ring-2 focus:ring-[#cde5ff]"
                  />
                </div>
              </div>

              {/* Course Selection */}
              <div>
                <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                  Interested Course / Discipline *
                </label>
                <select
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#c0c7d1] bg-[#ffffff] text-sm text-[#131b2e] focus:outline-hidden focus:border-[#00507d] focus:ring-2 focus:ring-[#cde5ff]"
                >
                  {COURSES_CATALOG.map((course) => (
                    <option key={course.id} value={course.id}>
                      [{course.trackName}] {course.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Optional queries */}
              <div>
                <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                  Any questions or specific requirements? (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Syllabus details, fast-track options, or course requirements..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#c0c7d1] bg-[#ffffff] text-sm text-[#131b2e] focus:outline-hidden focus:border-[#00507d] focus:ring-2 focus:ring-[#cde5ff]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-[#00507d] text-[#ffffff] font-bold text-sm hover:bg-[#0369a1] transition-all active:scale-[0.99] shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Saving Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Request (Instant Counselor Call)</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center">
                <p className="text-[11px] text-[#40474f]">
                  Prefer direct call? Speak to counselor: <a href="tel:+919849174718" className="font-bold text-[#00507d]">+91 98491 74718</a>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
