import React, { useState } from 'react';
import { INSTITUTION_INFO, FAQS } from '../data/coursesData';
import { useGoogleSheets } from '../context/GoogleSheetsContext';
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  ChevronDown,
  Send,
  RefreshCw,
} from 'lucide-react';

interface ContactScreenProps {
  onOpenEnquire: (courseId?: string, mode?: 'enquiry' | 'lab_tour' | 'counseling') => void;
}

export const ContactScreen: React.FC<ContactScreenProps> = ({ onOpenEnquire }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('DCA Diploma');
  const [message, setMessage] = useState('');

  const { isConnected, syncInquiry } = useGoogleSheets();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setIsSubmitting(true);

    const record = {
      name: name.trim(),
      phone: phone.trim(),
      course,
      message: message.trim(),
      source: 'Contact Page Form',
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

    // 2. If Google Sheets is authenticated on this browser, append inquiry directly as well
    if (isConnected) {
      try {
        await syncInquiry(record);
      } catch (err) {
        console.error('Silent Google Sheets sync error:', err);
      }
    }

    setFormSubmitted(true);
    setIsSubmitting(false);
  };

  const handleResetForm = () => {
    setFormSubmitted(false);
    setName('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="w-full flex flex-col bg-[#faf8ff]">
      {/* Header Banner */}
      <section className="bg-[#f2f3ff] px-4 md:px-10 py-10 md:py-14 border-b border-[#c0c7d1]/50">
        <div className="max-w-[80rem] mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dae2fd] text-[#00507d] text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#00507d]"></span>
            MIYAPUR CAMPUS • HYDERABAD
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-[#131b2e] tracking-tight font-sans">
            Contact & Campus Lab Visit
          </h1>
          <p className="text-[17px] text-[#40474f] max-w-2xl">
            Have questions regarding course fees, batch schedules, or curriculum details? Walk into our Miyapur computer academy or connect with an admissions counselor right away.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="w-full py-12 px-4 md:px-10">
        <div className="max-w-[80rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Contact Info & Campus Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 md:p-8 rounded-2xl bg-[#ffffff] border border-[#c0c7d1]/50 shadow-xs space-y-6">
              <div className="flex items-center justify-start pb-2 border-b border-[#c0c7d1]/40">
                <img
                  src="/keerthi-logo.png"
                  alt="Keerthi Infotech Logo"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <h2 className="text-xl font-bold text-[#131b2e] pb-1">
                Institution Contact Coordinates
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#cde5ff] text-[#00507d] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#40474f]">
                      Direct Telephone
                    </div>
                    <a
                      href="tel:+919849174718"
                      className="text-base font-bold text-[#00507d] hover:underline"
                    >
                      {INSTITUTION_INFO.phone}
                    </a>
                    <div className="text-xs text-[#40474f]">
                      Admissions Desk (Monday – Friday)
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#cde5ff] text-[#00507d] flex items-center justify-center shrink-0 mt-0.5">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#40474f]">
                      Instant WhatsApp
                    </div>
                    <a
                      href={INSTITUTION_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-[#00507d] hover:underline"
                    >
                      {INSTITUTION_INFO.whatsapp}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#cde5ff] text-[#00507d] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#40474f]">
                      Official Email
                    </div>
                    <a
                      href={`mailto:${INSTITUTION_INFO.email}`}
                      className="text-base font-bold text-[#00507d] hover:underline"
                    >
                      {INSTITUTION_INFO.email}
                    </a>
                    <div className="text-xs text-[#40474f]">
                      Verification & Corporate Inquiries
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#cde5ff] text-[#00507d] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#40474f]">
                      Miyapur Campus Address
                    </div>
                    <p className="text-sm font-bold text-[#131b2e] leading-snug">
                      {INSTITUTION_INFO.address}
                    </p>
                    <div className="text-xs text-[#40474f] mt-0.5">
                      Landmark: Below Union Bank, NH65, Miyapur X Roads
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#cde5ff] text-[#00507d] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#40474f]">
                      Campus & Lab Hours
                    </div>
                    <div className="text-sm font-semibold text-[#131b2e]">
                      {INSTITUTION_INFO.officeHours}
                    </div>
                    <div className="text-xs text-[#00507d] font-medium">
                      Saturday & Sunday: Weekends are Online Classes
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Campus Photo & Directions */}
            <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#c0c7d1]/50 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-[#131b2e]">
                How to Reach Our Campus
              </h3>
              <img
                src={INSTITUTION_INFO.panoramicFacilityImageUrl}
                alt="Keerthi Infotech Miyapur Lab facility"
                className="w-full h-44 object-cover rounded-xl border border-[#c0c7d1]/40"
              />
              <ul className="text-xs text-[#40474f] space-y-1.5 leading-relaxed">
                <li>• <strong>By Metro:</strong> Miyapur Metro Station (Terminal Red Line) is just 1.2 km away. Autos and feeder buses are available every 2 minutes.</li>
                <li>• <strong>By Bus:</strong> Alight at Miyapur Bus Stop / Allwyn X Roads. The institute is situated right on NH65.</li>
              </ul>
            </div>
          </div>

          {/* Right: Interactive Message & Enquiry Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 md:p-8 rounded-2xl bg-[#ffffff] border border-[#c0c7d1]/50 shadow-sm space-y-5">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[#131b2e]">
                  Send an Inquiry / Schedule Lab Visit
                </h2>
                <p className="text-xs md:text-sm text-[#40474f] mt-1">
                  Fill in your details below and our admissions team will confirm batch availability and syllabus details.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-6 md:p-8 rounded-2xl bg-[#cde5ff]/40 border border-[#94ccff] text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#00507d] text-[#ffffff] flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-[#001d32]">
                      Inquiry Received Successfully!
                    </h3>
                    <p className="text-sm text-[#004b74] max-w-md mx-auto">
                      Thank you, <strong>{name}</strong>. Our faculty counselor will reach out to you shortly on <strong>{phone}</strong> regarding <strong>{course}</strong>.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={`https://wa.me/919849174718?text=Hi%20Keerthi%20Infotech,%20I%20just%20sent%20an%20enquiry%20for%20${encodeURIComponent(course)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0369a1] text-[#ffffff] text-xs font-bold hover:bg-[#025684] transition-colors shadow-xs"
                    >
                      Connect on WhatsApp Now
                    </a>
                    <button
                      onClick={handleResetForm}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#c0c7d1] bg-[#ffffff] text-[#131b2e] text-xs font-bold hover:bg-[#f2f3ff] transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sravan Kumar"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#c0c7d1] bg-[#ffffff] text-sm text-[#131b2e] focus:outline-hidden focus:border-[#00507d]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                        Mobile Number / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#c0c7d1] bg-[#ffffff] text-sm text-[#131b2e] focus:outline-hidden focus:border-[#00507d]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                      Select Program of Interest
                    </label>
                    <select
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#c0c7d1] bg-[#ffffff] text-sm text-[#131b2e] focus:outline-hidden focus:border-[#00507d]"
                    >
                      <option>DCA (Diploma in Computer Applications)</option>
                      <option>MDCA (Master Diploma in Computer Apps)</option>
                      <option>Tally with GST</option>
                      <option>Advanced Excel & Financial Modeling</option>
                      <option>C & C++ Programming</option>
                      <option>Python Programming</option>
                      <option>Power BI & Generative AI for Business</option>
                      <option>Oracle & Relational Database Design</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                      Your Message or Questions (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Ask about fee structures, fast-track crash batches, certificate recognition..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#c0c7d1] bg-[#ffffff] text-sm text-[#131b2e] focus:outline-hidden focus:border-[#00507d]"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-xl bg-[#00507d] text-[#ffffff] font-bold text-sm hover:bg-[#0369a1] transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Sending Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Inquiry & Request Callback</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Frequently Asked Questions Accordion */}
            <div className="p-6 md:p-8 rounded-2xl bg-[#ffffff] border border-[#c0c7d1]/50 shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-[#131b2e]">
                Frequently Asked Questions
              </h2>

              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-xl border border-[#c0c7d1]/40 overflow-hidden bg-[#faf8ff]"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full p-4 text-left flex items-center justify-between gap-3 text-sm font-bold text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#00507d] shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-xs text-[#40474f] leading-relaxed border-t border-[#c0c7d1]/30 pt-3">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
