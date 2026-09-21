import React from 'react';
import { INSTITUTION_INFO } from '../data/coursesData';
import { MessageCircle } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 group flex items-center justify-end">
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none mr-2 px-3 py-1.5 rounded-lg bg-[#283044] text-[#eef0ff] text-xs font-semibold shadow-md whitespace-nowrap">
        Chat on WhatsApp: {INSTITUTION_INFO.phone}
      </div>
      <a
        aria-label="Chat on WhatsApp"
        className="w-12 h-12 rounded-full bg-[#0369a1] text-[#ffffff] flex items-center justify-center shadow-lg hover:bg-[#00507d] transition-all active:scale-95 cursor-pointer ring-4 ring-[#cde5ff]/60"
        href={INSTITUTION_INFO.whatsappUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
};
