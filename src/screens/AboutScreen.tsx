import React, { useState } from 'react';
import { ScreenType } from '../types';
import { INSTITUTION_INFO, TIMELINE_ERAS, COURSE_TRACKS } from '../data/coursesData';
import {
  Award,
  CheckCircle2,
  Monitor,
  MapPin,
  BookOpen,
  TrendingUp,
  Sparkles,
  History,
  Terminal,
  Headphones,
  GitFork,
  FileText,
  Calculator,
  Code2,
  Brain,
  Clock,
  Check,
  ArrowRight,
  PhoneCall,
  CalendarCheck,
} from 'lucide-react';

interface AboutScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenEnquire: (courseId?: string, mode?: 'enquiry' | 'lab_tour' | 'counseling') => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({
  onNavigate,
  onOpenEnquire,
}) => {
  const [activeEraIndex, setActiveEraIndex] = useState(0);
  const activeEra = TIMELINE_ERAS[activeEraIndex];

  return (
    <div className="w-full flex flex-col bg-[#faf8ff]">
      {/* Hero Section */}
      <section className="relative w-full bg-[#f2f3ff] px-4 md:px-10 py-12 md:py-16 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#cde5ff]/40 blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/3 bottom-0 w-80 h-80 rounded-full bg-[#d9e2ff]/30 blur-2xl pointer-events-none"></div>

        <div className="max-w-[80rem] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dae2fd] text-[#00507d] text-xs font-semibold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#00507d] animate-pulse"></span>
                FOUNDED 1999 • 25+ YEARS OF EXCELLENCE
              </div>

              <div className="space-y-1">
                <h1 className="text-3xl md:text-5xl lg:text-[56px] lg:leading-[64px] text-[#131b2e] tracking-tight font-bold font-sans">
                  About Keerthi Infotech
                </h1>
                <p className="text-xl md:text-[22px] text-[#00507d] font-semibold">
                  Computer Education Since 1999
                </p>
              </div>

              <p className="text-[17px] leading-relaxed text-[#40474f] max-w-2xl">
                Keerthi Infotech Computer Education has been providing computer education since 1999. The institute focuses on helping learners develop practical computer skills through structured courses across office productivity, programming, accounting, data analysis, and modern AI technologies.
              </p>

              {/* Quick Key Metrics */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#ffffff] shadow-xs border border-[#c0c7d1]/40">
                  <span className="material-symbols-outlined text-[#00507d] text-[22px]">
                    workspace_premium
                  </span>
                  <div>
                    <div className="text-[18px] font-bold text-[#131b2e] leading-tight">
                      20,000+
                    </div>
                    <div className="text-[12px] text-[#40474f]">
                      Students Trained
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#ffffff] shadow-xs border border-[#c0c7d1]/40">
                  <span className="material-symbols-outlined text-[#00507d] text-[22px]">
                    devices
                  </span>
                  <div>
                    <div className="text-[18px] font-bold text-[#131b2e] leading-tight">
                      1:1 Ratio
                    </div>
                    <div className="text-[12px] text-[#40474f]">
                      Dedicated Lab Stations
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Campus Photo Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-[#ffffff] p-2 border border-[#c0c7d1]/50">
                <img
                  className="w-full h-80 md:h-96 object-cover rounded-xl"
                  src={INSTITUTION_INFO.heroLabImageUrl}
                  alt="Modern Indian computer laboratory with bright ambient lighting, students practicing software on desktop computers at Keerthi Infotech Miyapur Hyderabad"
                />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#ffffff]/95 backdrop-blur-md shadow-md border border-[#c0c7d1]/40">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[#00507d] font-bold">
                        Campus Milestone
                      </div>
                      <div className="text-[18px] text-[#131b2e] font-bold">
                        Serving Miyapur, Hyderabad
                      </div>
                      <div className="text-xs text-[#40474f]">
                        Mega Hills Complex, NH65 Below Union Bank
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#cde5ff] text-[#00507d] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Milestones & Evolution */}
      <section className="w-full py-12 md:py-16 px-4 md:px-10 bg-[#faf8ff]">
        <div className="max-w-[80rem] mx-auto space-y-10">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold tracking-widest text-[#00507d] uppercase">
              Milestones & Evolution
            </span>
            <h2 className="text-2xl md:text-4xl text-[#131b2e] font-bold font-sans">
              Our 25-Year Journey in Vocational IT
            </h2>
            <p className="text-[17px] text-[#40474f] leading-relaxed">
              From the dawn of retail personal computing in 1999 to the current frontier of Generative AI, Keerthi Infotech has consistently bridged the digital skills gap for thousands of undergraduate students, job aspirants, and working professionals.
            </p>
          </div>

          {/* Narrative Bento Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#f2f3ff] shadow-xs space-y-3 flex flex-col justify-between border border-[#c0c7d1]/40">
              <div className="space-y-2">
                <BookOpen className="w-8 h-8 text-[#00507d]" />
                <h3 className="text-[18px] text-[#131b2e] font-bold">
                  Foundation (1999)
                </h3>
                <p className="text-sm text-[#40474f] leading-relaxed">
                  Inception during the early computer adoption wave in Andhra Pradesh & Telangana, training first-generation digital typists, office clerks, and diploma seekers.
                </p>
              </div>
              <div className="font-mono text-xs text-[#00507d] font-bold pt-2">
                ERA: DOS • Win98 • Office 97
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#f2f3ff] shadow-xs space-y-3 flex flex-col justify-between border border-[#c0c7d1]/40">
              <div className="space-y-2">
                <TrendingUp className="w-8 h-8 text-[#00507d]" />
                <h3 className="text-[18px] text-[#131b2e] font-bold">
                  Commercial Growth (2000s–2010s)
                </h3>
                <p className="text-sm text-[#40474f] leading-relaxed">
                  Recognized as a premier vocational academy for computerized financial accounting (Tally) and software fundamentals for regional engineering students.
                </p>
              </div>
              <div className="font-mono text-xs text-[#00507d] font-bold pt-2">
                ERA: Tally ERP • C/C++ • Java
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#f2f3ff] shadow-xs space-y-3 flex flex-col justify-between border border-[#c0c7d1]/40">
              <div className="space-y-2">
                <Sparkles className="w-8 h-8 text-[#00507d]" />
                <h3 className="text-[18px] text-[#131b2e] font-bold">
                  Applied Intelligence (Present)
                </h3>
                <p className="text-sm text-[#40474f] leading-relaxed">
                  Empowering the modern knowledge worker with actionable digital skills, advanced Business Intelligence dashboards, and Generative AI workflows.
                </p>
              </div>
              <div className="font-mono text-xs text-[#00507d] font-bold pt-2">
                ERA: Power BI • Python • LLM Workflows
              </div>
            </div>
          </div>

          {/* Interactive Chronology Component */}
          <div className="p-6 md:p-8 rounded-2xl bg-[#ffffff] shadow-md border border-[#c0c7d1]/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 gap-2">
              <div>
                <h3 className="text-xl md:text-[22px] text-[#131b2e] font-bold">
                  Interactive Chronology
                </h3>
                <p className="text-xs md:text-sm text-[#40474f]">
                  Select an era below to explore how our academic curriculum progressed alongside the technology industry.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#00507d] font-bold">
                <History className="w-4 h-4" />
                Curriculum Archive
              </div>
            </div>

            {/* Timeline Tab Controller */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 p-1.5 rounded-xl bg-[#eaedff] mb-6">
              {TIMELINE_ERAS.map((era, index) => {
                const isActive = activeEraIndex === index;
                return (
                  <button
                    key={era.id}
                    onClick={() => setActiveEraIndex(index)}
                    className={`py-2 px-3 rounded-lg text-xs md:text-sm font-semibold transition-all text-center cursor-pointer ${
                      isActive
                        ? 'bg-[#00507d] text-[#ffffff] font-bold shadow-xs'
                        : 'text-[#40474f] hover:text-[#131b2e] hover:bg-[#ffffff]/50'
                    }`}
                  >
                    {era.tabLabel}
                  </button>
                );
              })}
            </div>

            {/* Timeline Dynamic Card */}
            <div className="flex flex-col lg:flex-row items-center gap-8 p-6 rounded-xl bg-[#f2f3ff] transition-all border border-[#c0c7d1]/40">
              <div className="w-full lg:w-1/2 space-y-3">
                <div className="inline-block px-2.5 py-0.5 rounded bg-[#cde5ff] text-[#001d32] font-mono text-xs font-bold">
                  {activeEra.eraBadge}
                </div>
                <h4 className="text-xl md:text-[24px] text-[#131b2e] font-bold leading-snug">
                  {activeEra.title}
                </h4>
                <p className="text-sm text-[#40474f] leading-relaxed">
                  {activeEra.description}
                </p>

                <ul className="space-y-2 text-sm text-[#131b2e] pt-1">
                  {activeEra.bulletPoints.map((point, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00507d] shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('courses')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00507d] hover:underline"
                  >
                    View Corresponding Modern Courses
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="w-full lg:w-1/2 rounded-xl overflow-hidden shadow-sm border border-[#c0c7d1]/50 bg-[#ffffff]">
                <img
                  className="w-full h-64 object-cover transition-opacity duration-300"
                  src={activeEra.imageUrl}
                  alt={activeEra.altText}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Pedagogical Rigor / Learning Methodology */}
      <section className="w-full py-12 md:py-16 px-4 md:px-10 bg-[#f2f3ff]">
        <div className="max-w-[80rem] mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold tracking-widest text-[#00507d] uppercase">
              Pedagogical Rigor
            </span>
            <h2 className="text-2xl md:text-4xl text-[#131b2e] font-bold font-sans">
              Our Learning Methodology
            </h2>
            <p className="text-sm md:text-base text-[#40474f]">
              We reject purely theoretical rote instruction. Every concept is directly transformed into an on-screen practical exercise with instant mentor feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Approach Card 1 */}
            <div className="p-6 md:p-8 rounded-2xl bg-[#ffffff] shadow-md hover:-translate-y-1 transition-transform space-y-4 border border-[#c0c7d1]/50">
              <div className="w-14 h-14 rounded-xl bg-[#cde5ff] flex items-center justify-center text-[#00507d]">
                <Terminal className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-[#00507d] uppercase tracking-wider">
                  Pillar One
                </div>
                <h3 className="text-[18px] text-[#131b2e] font-bold">
                  100% Practical Lab Training
                </h3>
                <p className="text-sm text-[#40474f] leading-relaxed">
                  Every lecture is immediately backed by live machine time. Learners spend over 75% of their enrolled hours executing exercises, debugging errors, and creating functional deliverables.
                </p>
              </div>
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs font-semibold text-[#40474f] mb-1.5">
                  <span>Hands-on Lab Share</span>
                  <span className="font-bold text-[#00507d]">100%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#eaedff]">
                  <div className="h-2 rounded-full bg-[#00507d] w-full"></div>
                </div>
              </div>
            </div>

            {/* Approach Card 2 */}
            <div className="p-6 md:p-8 rounded-2xl bg-[#ffffff] shadow-md hover:-translate-y-1 transition-transform space-y-4 border border-[#c0c7d1]/50">
              <div className="w-14 h-14 rounded-xl bg-[#d9e2ff] flex items-center justify-center text-[#1d59c1]">
                <Headphones className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-[#1d59c1] uppercase tracking-wider">
                  Pillar Two
                </div>
                <h3 className="text-[18px] text-[#131b2e] font-bold">
                  Dedicated Instructor Guidance
                </h3>
                <p className="text-sm text-[#40474f] leading-relaxed">
                  No crowd teaching. Our certified faculty monitor individual lab desks, offering personalized walkthroughs for complex queries, coding bugs, and accounting reconciliations.
                </p>
              </div>
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs font-semibold text-[#40474f] mb-1.5">
                  <span>Student to Mentor Ratio</span>
                  <span className="font-bold text-[#1d59c1]">Individual Focus</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#eaedff]">
                  <div className="h-2 rounded-full bg-[#1d59c1] w-5/6"></div>
                </div>
              </div>
            </div>

            {/* Approach Card 3 */}
            <div className="p-6 md:p-8 rounded-2xl bg-[#ffffff] shadow-md hover:-translate-y-1 transition-transform space-y-4 border border-[#c0c7d1]/50">
              <div className="w-14 h-14 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#00507b]">
                <GitFork className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-[#00507b] uppercase tracking-wider">
                  Pillar Three
                </div>
                <h3 className="text-[18px] text-[#131b2e] font-bold">
                  Modular Step-by-Step Curriculum
                </h3>
                <p className="text-sm text-[#40474f] leading-relaxed">
                  Course materials are organized into progressive, self-contained milestones. Learners pass structured skill checkpoints before unlocking advanced techniques.
                </p>
              </div>
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs font-semibold text-[#40474f] mb-1.5">
                  <span>Curriculum Completion Rate</span>
                  <span className="font-bold text-[#0069a0]">96.4%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#eaedff]">
                  <div className="h-2 rounded-full bg-[#0069a0] w-[96%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: What We Teach (4 Pillars) */}
      <section className="w-full py-12 md:py-16 px-4 md:px-10 bg-[#faf8ff]">
        <div className="max-w-[80rem] mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold tracking-widest text-[#00507d] uppercase">
                Specialized Academics
              </span>
              <h2 className="text-2xl md:text-4xl text-[#131b2e] font-bold font-sans">
                What We Teach
              </h2>
              <p className="text-[17px] text-[#40474f]">
                Four targeted curriculum disciplines built to meet contemporary recruitment standards in the modern corporate and institutional landscape.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-[#00507d] text-sm font-bold">
              <span>All course syllabuses updated for 2026</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1: Office Productivity */}
            <div className="p-6 rounded-2xl bg-[#f2f3ff] hover:bg-[#ffffff] transition-all shadow-xs hover:shadow-md flex flex-col justify-between border border-[#c0c7d1]/40 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#dae2fd] text-[#00507d] flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-[#00507d] font-bold">TRACK 01</span>
                  <h3 className="text-[18px] text-[#131b2e] font-bold mt-0.5">
                    Office Productivity
                  </h3>
                </div>
                <p className="text-xs text-[#40474f] leading-relaxed">
                  Complete workplace readiness covering computer fundamentals, Microsoft Word, PowerPoint, and advanced spreadsheet data management.
                </p>
                <div className="pt-2 space-y-1 text-xs text-[#131b2e]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00507d]"></span>
                    MS Office • Word • Excel
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00507d]"></span>
                    Advanced Formulas & Pivots
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00507d]"></span>
                    PowerPoint & Presentations
                  </div>
                </div>
              </div>
              <div className="pt-4 flex items-center justify-between border-t border-[#c0c7d1]/30 mt-4">
                <span className="inline-block px-2 py-0.5 rounded bg-[#eaedff] text-[#40474f] text-xs font-medium">
                  Cert: DCA / MDCA
                </span>
                <button
                  onClick={() => onNavigate('courses')}
                  className="text-xs font-bold text-[#00507d] group-hover:underline"
                >
                  Explore →
                </button>
              </div>
            </div>

            {/* Pillar 2: Financial Accounting */}
            <div className="p-6 rounded-2xl bg-[#f2f3ff] hover:bg-[#ffffff] transition-all shadow-xs hover:shadow-md flex flex-col justify-between border border-[#c0c7d1]/40 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#dae2fd] text-[#00507d] flex items-center justify-center">
                  <Calculator className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-[#00507d] font-bold">TRACK 02</span>
                  <h3 className="text-[18px] text-[#131b2e] font-bold mt-0.5">
                    Financial Accounting
                  </h3>
                </div>
                <p className="text-xs text-[#40474f] leading-relaxed">
                  Professional accounting, ledger generation, inventory records, and statutory GST taxation processing utilizing industry-standard Tally Prime.
                </p>
                <div className="pt-2 space-y-1 text-xs text-[#131b2e]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00507d]"></span>
                    Tally with GST
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00507d]"></span>
                    Balance Sheet & P&L Analysis
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00507d]"></span>
                    Inventory & E-Way Billing
                  </div>
                </div>
              </div>
              <div className="pt-4 flex items-center justify-between border-t border-[#c0c7d1]/30 mt-4">
                <span className="inline-block px-2 py-0.5 rounded bg-[#eaedff] text-[#40474f] text-xs font-medium">
                  Cert: Financial IT
                </span>
                <button
                  onClick={() => onNavigate('courses')}
                  className="text-xs font-bold text-[#00507d] group-hover:underline"
                >
                  Explore →
                </button>
              </div>
            </div>

            {/* Pillar 3: Programming & Tech */}
            <div className="p-6 rounded-2xl bg-[#f2f3ff] hover:bg-[#ffffff] transition-all shadow-xs hover:shadow-md flex flex-col justify-between border border-[#c0c7d1]/40 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#dae2fd] text-[#00507d] flex items-center justify-center">
                  <Code2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-[#00507d] font-bold">TRACK 03</span>
                  <h3 className="text-[18px] text-[#131b2e] font-bold mt-0.5">
                    Programming & Tech
                  </h3>
                </div>
                <p className="text-xs text-[#40474f] leading-relaxed">
                  Logic building, control structures, and software engineering foundations tailored for academics and entry-level IT technical screenings.
                </p>
                <div className="pt-2 space-y-1 text-xs text-[#131b2e]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00507d]"></span>
                    C & C++ Programming
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00507d]"></span>
                    Core & Advanced Python
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00507d]"></span>
                    Oracle & Database Architecture
                  </div>
                </div>
              </div>
              <div className="pt-4 flex items-center justify-between border-t border-[#c0c7d1]/30 mt-4">
                <span className="inline-block px-2 py-0.5 rounded bg-[#eaedff] text-[#40474f] text-xs font-medium">
                  Cert: Dev Foundations
                </span>
                <button
                  onClick={() => onNavigate('courses')}
                  className="text-xs font-bold text-[#00507d] group-hover:underline"
                >
                  Explore →
                </button>
              </div>
            </div>

            {/* Pillar 4: AI & Business Intelligence */}
            <div className="p-6 rounded-2xl bg-[#f2f3ff] hover:bg-[#ffffff] transition-all shadow-xs hover:shadow-md flex flex-col justify-between border border-[#c0c7d1]/40 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#dae2fd] text-[#00507d] flex items-center justify-center">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-[#00507d] font-bold">TRACK 04</span>
                  <h3 className="text-[18px] text-[#131b2e] font-bold mt-0.5">
                    AI & Business Intelligence
                  </h3>
                </div>
                <p className="text-xs text-[#40474f] leading-relaxed">
                  Transform raw metrics into actionable insight using Power BI visual modeling paired with workplace Generative AI techniques.
                </p>
                <div className="pt-2 space-y-1 text-xs text-[#131b2e]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00507d]"></span>
                    Power BI Interactive Dashboards
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00507d]"></span>
                    Prompt Engineering Patterns
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00507d]"></span>
                    AI-Assisted Document Synthesis
                  </div>
                </div>
              </div>
              <div className="pt-4 flex items-center justify-between border-t border-[#c0c7d1]/30 mt-4">
                <span className="inline-block px-2 py-0.5 rounded bg-[#eaedff] text-[#40474f] text-xs font-medium">
                  Cert: AI & BI Pro
                </span>
                <button
                  onClick={() => onNavigate('courses')}
                  className="text-xs font-bold text-[#00507d] group-hover:underline"
                >
                  Explore →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Why Learners Choose Keerthi Infotech */}
      <section className="w-full py-12 md:py-16 px-4 md:px-10 bg-[#f2f3ff]">
        <div className="max-w-[80rem] mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold tracking-widest text-[#00507d] uppercase">
              Institutional Advantage
            </span>
            <h2 className="text-2xl md:text-4xl text-[#131b2e] font-bold font-sans">
              Why Learners Choose Keerthi Infotech
            </h2>
            <p className="text-sm md:text-base text-[#40474f]">
              Built on a quarter-century of instructional integrity, uninterrupted lab uptime, and localized student community trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Credibility */}
            <div className="p-6 md:p-8 rounded-2xl bg-[#ffffff] shadow-xs flex flex-col justify-between space-y-4 border border-[#c0c7d1]/50">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#00507d]/10 text-[#00507d] flex items-center justify-center">
                  <History className="w-6 h-6" />
                </div>
                <h3 className="text-[18px] text-[#131b2e] font-bold">
                  Credibility Since 1999
                </h3>
                <p className="text-sm text-[#40474f] leading-relaxed">
                  Over two and a half decades of continuous operation. Our alumni work across regional banks, IT services companies, accounting firms, and government enterprises across South India.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#f2f3ff] flex items-center gap-2">
                <Award className="w-5 h-5 text-[#00507d]" />
                <span className="text-xs text-[#131b2e] font-semibold">
                  25+ Continuous Academic Years
                </span>
              </div>
            </div>

            {/* Infrastructure & Timing */}
            <div className="p-6 md:p-8 rounded-2xl bg-[#ffffff] shadow-xs flex flex-col justify-between space-y-4 border border-[#c0c7d1]/50">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#1d59c1]/10 text-[#1d59c1] flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-[18px] text-[#131b2e] font-bold">
                  1:1 Terminals & Flexible Schedules
                </h3>
                <p className="text-sm text-[#40474f] leading-relaxed">
                  Every student is assigned an independent computer station for the full duration of their session. We offer morning batches and evening batches. Weekends are online classes.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#f2f3ff] flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-[#1d59c1]" />
                <span className="text-xs text-[#131b2e] font-semibold">
                  Morning Batch & Evening Batch • Weekends are Online Classes
                </span>
              </div>
            </div>

            {/* Recognized Certification */}
            <div className="p-6 md:p-8 rounded-2xl bg-[#ffffff] shadow-xs flex flex-col justify-between space-y-4 border border-[#c0c7d1]/50">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#0369a1]/10 text-[#0369a1] flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-[18px] text-[#131b2e] font-bold">
                  Recognized Completion Certificate
                </h3>
                <p className="text-sm text-[#40474f] leading-relaxed">
                  Graduates receive an authorized credential bearing institute registration seals, student roll identifiers, and modular performance grades recognized by hiring managers.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#f2f3ff] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0369a1] text-[20px]">badge</span>
                <span className="text-xs text-[#131b2e] font-semibold">
                  Official Institute Seal
                </span>
              </div>
            </div>
          </div>

          {/* Campus Photo Banner */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#c0c7d1]/50">
            <img
              className="w-full h-64 md:h-80 object-cover"
              src={INSTITUTION_INFO.panoramicFacilityImageUrl}
              alt="Wide panoramic capture of Keerthi Infotech computer institute laboratory with neat rows of sleek monitors in Miyapur, Hyderabad"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#283044]/95 via-[#283044]/75 to-transparent flex items-center p-6 md:p-12">
              <div className="max-w-lg space-y-2 text-[#eef0ff]">
                <span className="text-xs uppercase tracking-widest text-[#d9e2ff] font-bold">
                  Walk In For A Free Lab Tour
                </span>
                <h4 className="text-2xl md:text-3xl font-bold text-[#ffffff] font-sans">
                  Experience Our Miyapur Facility
                </h4>
                <p className="text-sm text-[#eef0ff]/85 leading-relaxed">
                  Visit our lab, speak directly with faculty members, test our terminal setup, and preview the full course syllabus before enrolling.
                </p>
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onOpenEnquire()}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00507d] text-[#ffffff] font-bold text-xs hover:bg-[#0369a1] transition-all cursor-pointer shadow-md"
                  >
                    Enquire for Admission
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="tel:+919849174718"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#ffffff]/15 text-[#ffffff] hover:bg-[#ffffff]/25 text-xs font-semibold backdrop-blur-xs transition-all"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    Call Campus Desk
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA Section */}
      <section className="w-full py-12 md:py-20 px-4 md:px-10 bg-[#00507d] text-[#ffffff] relative overflow-hidden">
        <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-[#0369a1]/40 blur-3xl pointer-events-none"></div>

        <div className="max-w-[80rem] mx-auto relative z-10 text-center space-y-6">
          <div className="max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffffff]/10 text-[#ffffff] text-xs font-medium">
              <span className="material-symbols-outlined text-[16px]">school</span>
              Admissions Open for Next Month Batches
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#ffffff] font-sans">
              Start Your Learning Journey Today
            </h2>
            <p className="text-base md:text-lg text-[#ffffff]/80 max-w-2xl mx-auto">
              Join thousands of learners who built their digital careers with us. Whether you need foundational computer mastery or modern AI literacy, we have a pathway built for you.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('courses')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#faf8ff] text-[#131b2e] font-bold text-sm hover:bg-[#eaedff] transition-all active:scale-[0.98] shadow-lg cursor-pointer"
            >
              Explore Our Courses
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenEnquire()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#ffffff]/10 text-[#ffffff] hover:bg-[#ffffff]/20 font-bold text-sm transition-all active:scale-[0.98] cursor-pointer"
            >
              Contact Institute
              <PhoneCall className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-[#ffffff]/80 text-xs font-medium">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#cde5ff]" /> Dedicated 1:1 Terminals
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#cde5ff]" /> Individual Mentorship
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#cde5ff]" /> 100% Practical Lab Focus
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
