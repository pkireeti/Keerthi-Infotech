import React, { useState } from 'react';
import { MANAGING_DIRECTOR_INFO, INSTITUTION_INFO } from '../data/coursesData';
import {
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Calendar,
  Phone,
  Upload,
  Camera,
  ShieldCheck,
  User,
} from 'lucide-react';

interface ManagingDirectorSectionProps {
  onOpenEnquire?: (courseId?: string, mode?: 'enquiry' | 'lab_tour' | 'counseling') => void;
  variant?: 'full' | 'compact';
}

export const ManagingDirectorSection: React.FC<ManagingDirectorSectionProps> = ({
  onOpenEnquire,
  variant = 'full',
}) => {
  // Allow interactive local preview if user wants to test their photo right in the browser
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(
    MANAGING_DIRECTOR_INFO.photoUrl || null
  );

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewPhoto(objectUrl);
    }
  };

  return (
    <section className="w-full py-12 md:py-20 px-4 md:px-10 bg-gradient-to-b from-[#ffffff] via-[#faf8ff] to-[#f2f3ff] relative overflow-hidden">
      {/* Background Decorative Blurs */}
      <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-[#cde5ff]/30 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#dae2fd]/30 blur-3xl pointer-events-none"></div>

      <div className="max-w-[80rem] mx-auto relative z-10 space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dae2fd] text-[#00507d] text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Award className="w-4 h-4 text-[#00507d]" />
            <span>Institutional Leadership & Student Mentorship</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#131b2e] tracking-tight font-sans">
            Desk of the Managing Director
          </h2>
          <p className="text-[17px] text-[#40474f] leading-relaxed">
            Mentoring students in computer applications, commerce accounting, and career-oriented digital technologies with personal dedication and practical rigor since 1999.
          </p>
        </div>

        {/* Main Leadership Card */}
        <div className="bg-[#ffffff] rounded-3xl border border-[#c0c7d1]/50 shadow-sm overflow-hidden p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Photo Frame Showcase */}
            <div className="lg:col-span-5 flex flex-col items-center">
              {/* Executive Portrait Frame */}
              <div className="w-full max-w-sm relative">
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#f2f3ff] via-[#faf8ff] to-[#e4e9f7] border-2 border-[#c0c7d1]/60 shadow-lg p-3">
                  <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-b from-[#131b2e]/5 to-[#131b2e]/15 flex flex-col items-center justify-center border border-[#c0c7d1]/40">
                    {previewPhoto ? (
                      <img
                        src={previewPhoto}
                        alt="Managing Director - Keerthi Infotech"
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      /* Placeholder Frame when photo is not uploaded yet */
                      <div className="w-full h-full flex flex-col items-center justify-between p-6 text-center bg-gradient-to-b from-[#faf8ff] to-[#edf2fb]">
                        <div className="pt-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00507d]/10 text-[#00507d] text-[11px] font-bold uppercase tracking-wider">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Official Portrait Slot
                          </span>
                        </div>

                        {/* Silhouette Illustration */}
                        <div className="relative my-auto flex flex-col items-center">
                          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#00507d] to-[#0369a1] text-[#ffffff] flex items-center justify-center shadow-md">
                            <User className="w-16 h-16 text-[#ffffff]/90" />
                          </div>
                          <div className="absolute -bottom-2 px-3 py-0.5 rounded-full bg-[#131b2e] text-[#ffffff] text-[10px] font-bold uppercase tracking-wider shadow-xs">
                            Managing Director
                          </div>
                        </div>

                        {/* Photo Upload helper notice */}
                        <div className="w-full bg-[#ffffff] p-3 rounded-xl border border-[#c0c7d1]/50 shadow-2xs space-y-1.5">
                          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#131b2e]">
                            <Camera className="w-3.5 h-3.5 text-[#00507d]" />
                            <span>Photo Section</span>
                          </div>
                          <p className="text-[11px] text-[#5f6368] leading-tight">
                            Add photo anytime. You can preview a photo here:
                          </p>
                          <label className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-2 rounded-lg bg-[#f2f3ff] hover:bg-[#e4e9f7] text-[#00507d] text-[11px] font-bold cursor-pointer transition-colors border border-[#c0c7d1]/40">
                            <Upload className="w-3 h-3" />
                            <span>Choose Photo to Preview</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handlePhotoSelect}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Frame Ribbon Badge */}
                    <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-[#ffffff]/95 backdrop-blur-md shadow-md border border-[#c0c7d1]/50 text-center">
                      <div className="text-xs font-black tracking-wider text-[#131b2e] uppercase">
                        Managing Director
                      </div>
                      <div className="text-[11px] font-semibold text-[#00507d] mt-0.5">
                        Founder & Head of Institution
                      </div>
                    </div>
                  </div>
                </div>

                {/* Experience Badge */}
                <div className="mt-4 p-3.5 rounded-2xl bg-[#f2f3ff] border border-[#c0c7d1]/50 flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#00507d] text-[#ffffff] flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#131b2e]">
                        {INSTITUTION_INFO.yearsOfExcellence} Academic Excellence
                      </div>
                      <div className="text-[11px] text-[#40474f]">
                        Serving Miyapur since 1999
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#00507d] px-2 py-0.5 rounded-md bg-[#ffffff] border border-[#c0c7d1]/40">
                    Estd. 1999
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Leadership Tenets & Institutional Mission */}
            <div className="lg:col-span-7 space-y-6">
              {/* Role Title */}
              <div className="space-y-1.5 border-b border-[#c0c7d1]/40 pb-5">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#131b2e]">
                    Managing Director
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#e6f4ea] text-[#137333] border border-[#ceead6]">
                    Head of Academic Operations
                  </span>
                </div>
                <p className="text-sm font-semibold text-[#00507d]">
                  Founder & Principal Counselor • Keerthi Infotech Computer Education
                </p>
                <p className="text-xs text-[#5f6368]">
                  Miyapur, Hyderabad • Reg. No: 1999/TN/IT-EDU
                </p>
              </div>

              {/* Institutional Focus Overview */}
              <div className="p-5 rounded-2xl bg-[#faf8ff] border border-[#c0c7d1]/40 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#00507d] flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#00507d]" />
                  <span>Educational Commitment</span>
                </div>
                <p className="text-sm text-[#40474f] leading-relaxed">
                  Dedicated to providing individualized hands-on practical training that transforms foundational knowledge into career-ready capability. Our classroom-lab integrated approach ensures students gain real problem-solving confidence.
                </p>
              </div>

              {/* Core Leadership Highlights */}
              <div className="space-y-3 pt-1">
                <div className="text-xs font-bold uppercase tracking-wider text-[#40474f]">
                  Key Institutional Tenets
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#131b2e]">
                  {MANAGING_DIRECTOR_INFO.visionPoints.map((point, index) => (
                    <div
                      key={index}
                      className="p-3.5 rounded-xl bg-[#ffffff] border border-[#c0c7d1]/50 flex items-start gap-2.5 shadow-2xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#00507d] shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-[#c0c7d1]/40">
                {onOpenEnquire && (
                  <button
                    onClick={() => onOpenEnquire(undefined, 'counseling')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00507d] text-[#ffffff] text-xs font-bold hover:bg-[#0369a1] transition-all shadow-sm cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Request 1:1 Counseling with Director</span>
                  </button>
                )}
                <a
                  href={`tel:${INSTITUTION_INFO.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#c0c7d1] bg-[#ffffff] text-[#131b2e] text-xs font-bold hover:bg-[#f2f3ff] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#00507d]" />
                  <span>Direct Desk: {INSTITUTION_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
