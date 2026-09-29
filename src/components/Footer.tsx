import React from 'react';
import { ScreenType } from '../types';
import { INSTITUTION_INFO } from '../data/coursesData';
import { Phone, MessageSquare, Mail, MapPin, CheckCircle2, Lock } from 'lucide-react';

interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenEnquire: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenEnquire }) => {
  const handleNav = (screen: ScreenType) => {
    onNavigate(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#f2f3ff] border-t border-[#c0c7d1] pt-12 pb-8">
      <div className="max-w-[80rem] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
          {/* Col 1: Institute Brand info */}
          <div className="space-y-3">
            <div className="bg-[#ffffff] p-2 rounded-xl border border-[#c0c7d1]/50 shadow-xs inline-block">
              <img
                alt="Keerthi Infotech Computer Education Official Logo"
                className="h-12 w-auto object-contain"
                src="/keerthi-logo.png"
              />
            </div>
            <p className="text-[13px] text-[#40474f] leading-relaxed">
              Dedicated to empowering students and professionals with industry-recognized vocational IT curriculum, certified faculty, and computational excellence.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenEnquire}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#cde5ff] text-[#00507d] hover:bg-[#00507d] hover:text-[#ffffff] transition-colors"
              >
                Apply for Next Batch
              </button>
            </div>
          </div>

          {/* Col 2: Quick Navigation */}
          <div>
            <h4 className="text-[14px] font-bold text-[#131b2e] mb-4 tracking-wider uppercase">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-[13px]">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="text-[#40474f] hover:text-[#00507d] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('courses')}
                  className="text-[#40474f] hover:text-[#00507d] transition-colors cursor-pointer"
                >
                  Courses & Programs
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="text-[#40474f] hover:text-[#00507d] transition-colors cursor-pointer"
                >
                  About Us (25-Yr Journey)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="text-[#40474f] hover:text-[#00507d] transition-colors cursor-pointer"
                >
                  Contact & Lab Visit
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenEnquire}
                  className="text-[#00507d] font-semibold hover:underline transition-colors cursor-pointer"
                >
                  Schedule Lab Visit
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Institutional Programs */}
          <div>
            <h4 className="text-[14px] font-bold text-[#131b2e] mb-4 tracking-wider uppercase">
              Institutional Programs
            </h4>
            <ul className="space-y-2 text-[13px] text-[#40474f]">
              <li className="hover:text-[#00507d] transition-colors">
                • Software Development & Programming (C, C++, Python)
              </li>
              <li className="hover:text-[#00507d] transition-colors">
                • Diploma in Computer Applications (DCA & MDCA)
              </li>
              <li className="hover:text-[#00507d] transition-colors">
                • Tally with GST
              </li>
              <li className="hover:text-[#00507d] transition-colors">
                • Power BI & Applied Generative AI
              </li>
              <li className="hover:text-[#00507d] transition-colors">
                • Relational Databases & Oracle Mastery
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Details */}
          <div>
            <h4 className="text-[14px] font-bold text-[#131b2e] mb-4 tracking-wider uppercase">
              Contact Details
            </h4>
            <div className="space-y-2.5 text-[13px] text-[#40474f]">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#00507d] mt-0.5 shrink-0" />
                <a href="tel:+919849174718" className="hover:text-[#00507d]">
                  {INSTITUTION_INFO.phone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 text-[#00507d] mt-0.5 shrink-0" />
                <a
                  href={INSTITUTION_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00507d]"
                >
                  WhatsApp: {INSTITUTION_INFO.whatsapp}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#00507d] mt-0.5 shrink-0" />
                <a
                  href={`mailto:${INSTITUTION_INFO.email}`}
                  className="hover:text-[#00507d]"
                >
                  {INSTITUTION_INFO.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#00507d] mt-0.5 shrink-0" />
                <span>{INSTITUTION_INFO.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-[#c0c7d1] pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <p className="text-[13px] text-[#40474f]">
            © 2026 Keerthi Infotech Computer Education. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[13px] text-[#40474f]">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#00507d]" />
              {INSTITUTION_INFO.accreditationBadge}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="font-mono text-xs">{INSTITUTION_INFO.regNo}</span>
            <span className="hidden sm:inline">•</span>
            <button
              onClick={() => handleNav('admin')}
              className="inline-flex items-center gap-1 text-xs text-[#5f6368] hover:text-[#00507d] transition-colors cursor-pointer hover:underline"
            >
              <Lock className="w-3 h-3" />
              <span>Staff Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
