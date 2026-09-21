import React, { useState } from 'react';
import { ScreenType } from '../types';
import { INSTITUTION_INFO } from '../data/coursesData';
import { Menu, X, Phone, User, ExternalLink } from 'lucide-react';

interface NavbarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenEnquire: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  onOpenEnquire,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; screen: ScreenType }[] = [
    { label: 'Home', screen: 'home' },
    { label: 'Courses', screen: 'courses' },
    { label: 'About', screen: 'about' },
    { label: 'Contact', screen: 'contact' },
  ];

  const handleLinkClick = (screen: ScreenType) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#ffffff]/95 backdrop-blur-md border-b border-[#c0c7d1]/60 shadow-xs">
      {/* Top micro-announcement bar for quick trust signals */}
      <div className="bg-[#00507d] text-[#ffffff] px-4 py-1 text-xs hidden md:flex items-center justify-between font-medium max-w-[80rem] mx-auto w-full">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 font-semibold text-[#cde5ff]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#94ccff] animate-pulse"></span>
            Estd. 1999 • 25+ Years of Computer Education in Hyderabad
          </span>
          <span className="text-[#ffffff]/60">•</span>
          <span className="text-[#ffffff]/90">{INSTITUTION_INFO.accreditationBadge}</span>
          <span className="text-[#ffffff]/60">•</span>
          <span className="text-[#ffffff]/90">{INSTITUTION_INFO.regNo}</span>
        </div>
        <div className="flex items-center gap-4 text-[#ffffff]/90">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">location_on</span>
            Miyapur, Hyderabad
          </span>
          <a
            href="tel:+919849174718"
            className="flex items-center gap-1 hover:text-[#cde5ff] transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            +91 98491 74718
          </a>
        </div>
      </div>

      <div className="h-20 max-w-[80rem] mx-auto px-4 md:px-10 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-center text-left group focus:outline-hidden py-1 cursor-pointer"
          aria-label="Keerthi Infotech Homepage"
        >
          <img
            alt="Keerthi Infotech Computer Education Official Logo"
            className="h-11 sm:h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            src="/keerthi-logo.svg"
          />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((item) => {
            const isActive = currentScreen === item.screen;
            return (
              <button
                key={item.screen}
                onClick={() => handleLinkClick(item.screen)}
                className={`relative py-1 text-[15px] transition-all cursor-pointer font-medium ${
                  isActive
                    ? 'text-[#00507d] font-bold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#00507d] after:w-full'
                    : 'text-[#40474f] hover:text-[#131b2e] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#00507d] after:w-0 hover:after:w-full after:transition-all'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Button & Avatar */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenEnquire}
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#00507d] text-[#ffffff] font-medium text-[14px] hover:bg-[#0369a1] transition-all active:scale-[0.98] shadow-sm cursor-pointer"
          >
            Enquire Now
          </button>

          <button
            onClick={() => handleLinkClick('contact')}
            title="Miyapur Campus Desk"
            className="w-8 h-8 rounded-full bg-[#00507d] text-[#ffffff] flex items-center justify-center hover:bg-[#0369a1] transition-colors focus:outline-hidden"
            aria-label="User profile or contact"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#131b2e] hover:bg-[#eaedff] focus:outline-hidden"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#ffffff] border-b border-[#c0c7d1] px-4 py-4 space-y-3 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((item) => {
              const isActive = currentScreen === item.screen;
              return (
                <button
                  key={item.screen}
                  onClick={() => handleLinkClick(item.screen)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-[15px] font-medium transition-colors ${
                    isActive
                      ? 'bg-[#cde5ff] text-[#00507d] font-bold'
                      : 'text-[#40474f] hover:bg-[#f2f3ff]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#eaedff] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquire();
              }}
              className="w-full py-2.5 rounded-xl bg-[#00507d] text-[#ffffff] font-medium text-center hover:bg-[#0369a1]"
            >
              Enquire for Admission / Lab Visit
            </button>
            <div className="text-xs text-[#40474f] text-center pt-1">
              Call: <a href="tel:+919849174718" className="font-bold text-[#00507d]">+91 98491 74718</a> • Miyapur, Hyderabad
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
