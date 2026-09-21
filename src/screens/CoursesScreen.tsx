import React, { useState, useMemo } from 'react';
import { CourseItem, ScreenType } from '../types';
import { COURSES_CATALOG, COURSE_TRACKS, INSTITUTION_INFO } from '../data/coursesData';
import {
  Search,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

interface CoursesScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenEnquire: (courseId?: string, mode?: 'enquiry' | 'lab_tour' | 'counseling') => void;
  onSelectCourseSyllabus?: (course: CourseItem) => void;
}

export const CoursesScreen: React.FC<CoursesScreenProps> = ({
  onNavigate,
  onOpenEnquire,
}) => {
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = useMemo(() => {
    return COURSES_CATALOG.filter((course) => {
      const matchesTrack = selectedTrack === 'all' || course.trackId === selectedTrack;
      const matchesSearch =
        searchQuery.trim() === '' ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.modules.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
        course.trackName.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTrack && matchesSearch;
    });
  }, [selectedTrack, searchQuery]);

  return (
    <div className="w-full flex flex-col bg-[#faf8ff]">
      {/* Page Header Banner */}
      <section className="bg-[#f2f3ff] px-4 md:px-10 py-10 md:py-14 border-b border-[#c0c7d1]/50">
        <div className="max-w-[80rem] mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dae2fd] text-[#00507d] text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#00507d]"></span>
            CURRICULUM 2026 • 100% PRACTICAL LAB SESSIONS
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-[#131b2e] tracking-tight font-sans">
                Courses & Programs
              </h1>
              <p className="text-[17px] text-[#40474f] max-w-2xl mt-1">
                Explore our accredited vocational IT programs. Every course features independent 1:1 computer terminals, step-by-step modular milestones, and authorized course completion credentials.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onOpenEnquire(undefined, 'enquiry')}
                className="px-4 py-2.5 rounded-xl bg-[#00507d] text-[#ffffff] text-xs font-bold hover:bg-[#0369a1] shadow-xs cursor-pointer"
              >
                Enquire for Admission
              </button>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="pt-4 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#40474f] absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by course name, topic (Excel, Tally, Python, C++, Power BI)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#c0c7d1] bg-[#ffffff] text-sm text-[#131b2e] focus:outline-hidden focus:border-[#00507d] focus:ring-2 focus:ring-[#cde5ff]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-[#40474f] hover:text-[#131b2e]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Track Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedTrack('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedTrack === 'all'
                  ? 'bg-[#00507d] text-[#ffffff] shadow-xs'
                  : 'bg-[#ffffff] text-[#40474f] hover:bg-[#eaedff] border border-[#c0c7d1]/50'
              }`}
            >
              All Programs ({COURSES_CATALOG.length})
            </button>
            {COURSE_TRACKS.map((track) => {
              const isSelected = selectedTrack === track.id;
              return (
                <button
                  key={track.id}
                  onClick={() => setSelectedTrack(track.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#00507d] text-[#ffffff] shadow-xs'
                      : 'bg-[#ffffff] text-[#40474f] hover:bg-[#eaedff] border border-[#c0c7d1]/50'
                  }`}
                >
                  {track.trackNumber}: {track.title}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Course Cards Grid */}
      <section className="w-full py-12 px-4 md:px-10">
        <div className="max-w-[80rem] mx-auto">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-16 bg-[#ffffff] rounded-2xl border border-[#c0c7d1]/50 p-8 space-y-3">
              <BookOpen className="w-12 h-12 text-[#40474f] mx-auto opacity-50" />
              <h3 className="text-lg font-bold text-[#131b2e]">
                No courses matched your query
              </h3>
              <p className="text-sm text-[#40474f]">
                Try adjusting your search terms or view all programs across our four disciplines.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTrack('all');
                }}
                className="px-4 py-2 rounded-xl bg-[#00507d] text-[#ffffff] text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="p-6 rounded-2xl bg-[#ffffff] border border-[#c0c7d1]/60 shadow-xs hover:shadow-md transition-all flex flex-col justify-between hover:-translate-y-0.5"
                >
                  <div className="space-y-3">
                    {/* Header tags */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#cde5ff] text-[#001d32] text-xs font-bold font-mono">
                        {course.code}
                      </span>
                      <span className="text-[11px] font-semibold text-[#00507d] uppercase tracking-wide">
                        {course.trackName}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#131b2e] leading-snug">
                      {course.title}
                    </h3>

                    <p className="text-xs text-[#40474f] line-clamp-3 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Card bottom actions */}
                  <div className="pt-5 border-t border-[#c0c7d1]/30 mt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#40474f]">
                      <span className="font-semibold text-[#00507d]">
                        {course.certBadge}
                      </span>
                      <span>Miyapur Lab</span>
                    </div>
                    <div className="pt-1">
                      <button
                        onClick={() => onOpenEnquire(course.id)}
                        className="w-full py-2.5 px-3 rounded-xl bg-[#00507d] hover:bg-[#0369a1] text-xs font-bold text-[#ffffff] transition-colors cursor-pointer text-center shadow-xs flex items-center justify-center gap-1.5"
                      >
                        <span>Enroll Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Counseling Banner */}
      <section className="w-full py-10 px-4 md:px-10 bg-[#eaedff]/60 border-t border-[#c0c7d1]/50">
        <div className="max-w-[80rem] mx-auto bg-[#ffffff] rounded-2xl p-6 md:p-8 shadow-sm border border-[#c0c7d1]/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#00507d] uppercase tracking-wider">
              Confused which course fits your educational background?
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-[#131b2e]">
              Speak With Our Miyapur Senior Academic Counselor
            </h3>
            <p className="text-sm text-[#40474f] max-w-xl">
              We guide students based on their goals—whether you are preparing for government exams (DCA), banking/accounting careers (Tally Prime), university programming & coding (C++, Python), or corporate analytics (Power BI).
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:+919849174718"
              className="px-5 py-3 rounded-xl bg-[#00507d] text-[#ffffff] font-bold text-xs hover:bg-[#0369a1] shadow-xs cursor-pointer text-center w-full sm:w-auto"
            >
              Call: +91 98491 74718
            </a>
            <button
              onClick={() => onOpenEnquire()}
              className="px-5 py-3 rounded-xl border border-[#00507d] text-[#00507d] font-bold text-xs hover:bg-[#f2f3ff] cursor-pointer text-center w-full sm:w-auto"
            >
              Enquire for Admissions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
