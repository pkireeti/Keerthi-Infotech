import React from 'react';
import { CourseItem } from '../types';
import { X, Download } from 'lucide-react';

interface SyllabusModalProps {
  course: CourseItem | null;
  onClose: () => void;
  onEnquireCourse: (courseId: string) => void;
}

export const SyllabusModal: React.FC<SyllabusModalProps> = ({
  course,
  onClose,
  onEnquireCourse,
}) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#131b2e]/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-[#ffffff] rounded-2xl shadow-2xl border border-[#c0c7d1]/50 max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-[#f2f3ff] border-b border-[#c0c7d1]/60 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#cde5ff] text-[#001d32] text-xs font-bold font-mono">
                {course.code}
              </span>
              <span className="text-xs font-bold text-[#00507d] tracking-wide uppercase">
                {course.trackName}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[#131b2e] leading-snug">
              {course.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#40474f] hover:bg-[#dae2fd] hover:text-[#131b2e] shrink-0"
            aria-label="Close syllabus"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body scrollable */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#40474f] mb-1.5">
              Course Overview
            </h4>
            <p className="text-sm text-[#131b2e] leading-relaxed">
              {course.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#40474f] mb-3">
              Curriculum Modules & Practical Lab Exercises
            </h4>
            <div className="space-y-2.5">
              {course.modules.map((mod, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[#f2f3ff] border border-[#c0c7d1]/30"
                >
                  <span className="w-6 h-6 rounded-full bg-[#00507d] text-[#ffffff] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-sm text-[#131b2e] font-medium leading-relaxed">
                    {mod}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#cde5ff]/50 border border-[#94ccff] flex items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-[#001d32] block">
                Certificate Awarded on Completion:
              </span>
              <span className="text-[#004b74]">{course.certBadge}</span>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-[#00507d] text-[#ffffff] font-bold text-[11px]">
              Course Certificate
            </span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-[#f2f3ff] border-t border-[#c0c7d1]/60 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              window.print();
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#c0c7d1] bg-[#ffffff] text-xs font-semibold text-[#131b2e] hover:bg-[#dae2fd]"
          >
            <Download className="w-3.5 h-3.5 text-[#00507d]" />
            Print / Save Syllabus
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#40474f] hover:text-[#131b2e]"
            >
              Back
            </button>
            <button
              onClick={() => {
                onClose();
                onEnquireCourse(course.id);
              }}
              className="px-5 py-2 rounded-xl bg-[#00507d] text-[#ffffff] text-xs font-bold hover:bg-[#0369a1] transition-all"
            >
              Enroll in this Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
