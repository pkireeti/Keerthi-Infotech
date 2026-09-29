import React from 'react';
import { ScreenType, CourseItem } from '../types';
import { INSTITUTION_INFO, COURSE_TRACKS, COURSES_CATALOG, TESTIMONIALS } from '../data/coursesData';
import { ManagingDirectorSection } from '../components/ManagingDirectorSection';
import {
  Award,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Users,
  MapPin,
  Calendar,
  Sparkles,
  PhoneCall,
  Terminal,
  Quote,
  Star,
} from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenEnquire: (courseId?: string, mode?: 'enquiry' | 'lab_tour' | 'counseling') => void;
  onSelectCourseSyllabus?: (course: CourseItem) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onOpenEnquire,
  onSelectCourseSyllabus,
}) => {
  const featuredCourses = COURSES_CATALOG.filter((c) => c.featured);

  return (
    <div className="w-full flex flex-col bg-[#faf8ff]">
      {/* Hero Section */}
      <section className="relative w-full bg-[#f2f3ff] px-4 md:px-10 py-12 md:py-20 border-b border-[#c0c7d1]/50 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#cde5ff]/40 blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/4 bottom-0 w-80 h-80 rounded-full bg-[#d9e2ff]/30 blur-2xl pointer-events-none"></div>

        <div className="max-w-[80rem] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#dae2fd] text-[#00507d] text-xs font-semibold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#00507d] animate-pulse"></span>
                ESTD. 1999 • 25+ YEARS OF VOCATIONAL IT EXCELLENCE
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl lg:text-[54px] lg:leading-[62px] font-bold text-[#131b2e] tracking-tight font-sans">
                  Master Practical Computer Skills for Real Digital Careers
                </h1>
                <p className="text-lg md:text-[20px] text-[#00507d] font-semibold">
                  From Basic Office Literacy to Generative AI & Power BI
                </p>
              </div>

              <p className="text-[17px] text-[#40474f] leading-relaxed max-w-2xl">
                Serving Miyapur, Hyderabad for over 25 continuous years. We provide 100% practical lab training with dedicated 1:1 computer terminals, personalized instructor mentoring, and recognized course completion certificates.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('courses')}
                  className="px-6 py-3 rounded-xl bg-[#00507d] text-[#ffffff] font-bold text-sm hover:bg-[#0369a1] transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  Explore Course Syllabus
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenEnquire(undefined, 'lab_tour')}
                  className="px-6 py-3 rounded-xl bg-[#ffffff] border border-[#c0c7d1] text-[#00507d] font-bold text-sm hover:bg-[#eaedff] transition-all shadow-xs cursor-pointer flex items-center gap-2"
                >
                  Schedule Lab Visit
                  <Calendar className="w-4 h-4" />
                </button>
              </div>

              {/* Key Trust Badges */}
              <div className="pt-4 grid grid-cols-3 gap-3 max-w-lg">
                <div className="p-3 rounded-xl bg-[#ffffff] border border-[#c0c7d1]/50 text-center">
                  <div className="text-lg font-bold text-[#00507d]">20,000+</div>
                  <div className="text-[11px] text-[#40474f]">Students Trained</div>
                </div>
                <div className="p-3 rounded-xl bg-[#ffffff] border border-[#c0c7d1]/50 text-center">
                  <div className="text-lg font-bold text-[#00507d]">1:1 Ratio</div>
                  <div className="text-[11px] text-[#40474f]">Lab Terminals</div>
                </div>
                <div className="p-3 rounded-xl bg-[#ffffff] border border-[#c0c7d1]/50 text-center">
                  <div className="text-lg font-bold text-[#00507d]">Estd. 1999</div>
                  <div className="text-[11px] text-[#40474f]">Quality Education</div>
                </div>
              </div>
            </div>

            {/* Right Campus Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-[#ffffff] p-2 border border-[#c0c7d1]/50">
                <img
                  className="w-full h-80 md:h-[400px] object-cover rounded-xl"
                  src={INSTITUTION_INFO.heroLabImageUrl}
                  alt="Students practicing in Keerthi Infotech computer lab in Miyapur Hyderabad"
                />
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#ffffff]/95 backdrop-blur-md shadow-md border border-[#c0c7d1]/40">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-[#00507d] font-bold">
                        Miyapur Campus Desk
                      </div>
                      <div className="text-sm font-bold text-[#131b2e]">
                        Mega Hills Complex, Below Union Bank
                      </div>
                      <div className="text-xs text-[#40474f]">
                        Morning Batch & Evening Batch • Weekends are Online Classes
                      </div>
                    </div>
                    <button
                      onClick={() => onOpenEnquire(undefined, 'lab_tour')}
                      className="px-3 py-1.5 rounded-lg bg-[#00507d] text-[#ffffff] text-xs font-semibold hover:bg-[#0369a1]"
                    >
                      Visit Lab
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Curriculum Disciplines Showcase */}
      <section className="w-full py-12 md:py-16 px-4 md:px-10 bg-[#faf8ff]">
        <div className="max-w-[80rem] mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#00507d] uppercase">
                Specialized Curriculum
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-[#131b2e] font-sans">
                Explore Our Four Academic Tracks
              </h2>
              <p className="text-sm md:text-base text-[#40474f] mt-1">
                Engineered for immediate employability and academic credit.
              </p>
            </div>
            <button
              onClick={() => onNavigate('courses')}
              className="text-xs font-bold text-[#00507d] hover:underline flex items-center gap-1 shrink-0"
            >
              View All Syllabuses & Modules
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COURSE_TRACKS.map((track) => (
              <div
                key={track.id}
                className="p-6 rounded-2xl bg-[#ffffff] border border-[#c0c7d1]/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#00507d]">
                      {track.trackNumber}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#f2f3ff] text-[11px] font-semibold text-[#40474f]">
                      {track.coursesCount} Programs
                    </span>
                  </div>
                  <h3 className="text-[18px] font-bold text-[#131b2e]">
                    {track.title}
                  </h3>
                  <p className="text-xs text-[#40474f] leading-relaxed">
                    {track.shortDesc}
                  </p>
                  <ul className="space-y-1 text-xs text-[#131b2e] pt-1">
                    {track.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00507d] shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 border-t border-[#c0c7d1]/30 mt-4">
                  <button
                    onClick={() => onNavigate('courses')}
                    className="w-full py-2 rounded-xl bg-[#f2f3ff] text-[#00507d] hover:bg-[#eaedff] text-xs font-bold transition-colors cursor-pointer text-center"
                  >
                    Explore {track.title}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Flagship Programs */}
      <section className="w-full py-12 md:py-16 px-4 md:px-10 bg-[#f2f3ff]">
        <div className="max-w-[80rem] mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold tracking-widest text-[#00507d] uppercase">
              Popular Programs
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-[#131b2e] font-sans">
              Flagship Courses Enrolling Now
            </h2>
            <p className="text-sm text-[#40474f]">
              Our most sought-after career-ready courses with morning and evening batches (Weekends are online classes).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <div
                key={course.id}
                className="p-6 rounded-2xl bg-[#ffffff] border border-[#c0c7d1]/60 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-[#cde5ff] text-[#001d32] font-mono text-[11px] font-bold">
                      {course.code}
                    </span>
                  </div>
                  <h3 className="text-[17px] font-bold text-[#131b2e] leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-xs text-[#40474f] line-clamp-3">
                    {course.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#c0c7d1]/30 mt-4">
                  <button
                    onClick={() => onOpenEnquire(course.id)}
                    className="w-full py-2.5 rounded-xl bg-[#00507d] text-xs font-bold text-[#ffffff] hover:bg-[#0369a1] transition-colors cursor-pointer text-center"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Leadership & Managing Director Spotlight */}
      <ManagingDirectorSection onOpenEnquire={onOpenEnquire} />

      {/* Alumni Testimonials */}
      <section className="w-full py-12 md:py-16 px-4 md:px-10 bg-[#faf8ff]">
        <div className="max-w-[80rem] mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold tracking-widest text-[#00507d] uppercase">
              Proven Outcomes
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-[#131b2e] font-sans">
              What Our 20,000+ Alumni Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#ffffff] border border-[#c0c7d1]/50 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <Quote className="w-5 h-5 text-[#00507d]/40" />
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#131b2e] leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#c0c7d1]/30">
                  <div className="font-bold text-sm text-[#131b2e]">{t.name}</div>
                  <div className="text-xs text-[#00507d] font-semibold">{t.role}</div>
                  <div className="text-[11px] text-[#40474f]">{t.companyOrCollege}</div>
                  <div className="mt-1 text-[10px] font-mono px-2 py-0.5 rounded bg-[#f2f3ff] text-[#40474f] inline-block">
                    {t.courseCompleted} • {t.batchYear}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Miyapur Campus Facility Banner */}
      <section className="w-full py-12 px-4 md:px-10 bg-[#00507d] text-[#ffffff]">
        <div className="max-w-[80rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="text-xs font-bold text-[#cde5ff] tracking-widest uppercase">
              Walk In Monday to Friday • Weekends are Online Classes
            </span>
            <h3 className="text-2xl md:text-3xl font-bold font-sans">
              Visit Our Miyapur Campus & Computer Lab
            </h3>
            <p className="text-sm md:text-base text-[#ffffff]/80 max-w-2xl leading-relaxed">
              Experience the 1:1 computer setup yourself. Talk to our certified faculty, test the software versions (Tally Prime, MS Office, Python IDEs, Power BI), and pick the perfect batch schedule.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#ffffff]/90">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#cde5ff]" /> Near Miyapur Metro
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#cde5ff]" /> Below Union Bank (NH65)
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#cde5ff]" /> Zero Queue 1:1 Terminal
              </span>
            </div>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <button
              onClick={() => onOpenEnquire(undefined, 'lab_tour')}
              className="px-6 py-3 rounded-xl bg-[#ffffff] text-[#00507d] font-bold text-sm hover:bg-[#eaedff] transition-all shadow-md text-center cursor-pointer"
            >
              Schedule Campus Lab Visit
            </button>
            <a
              href="tel:+919849174718"
              className="px-6 py-3 rounded-xl border border-[#ffffff]/40 text-[#ffffff] font-bold text-sm hover:bg-[#ffffff]/10 transition-all text-center flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              Call: +91 98491 74718
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
