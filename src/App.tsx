import React, { useState } from 'react';
import { ScreenType, CourseItem } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { EnquiryModal } from './components/EnquiryModal';
import { SyllabusModal } from './components/SyllabusModal';
import { AboutScreen } from './screens/AboutScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CoursesScreen } from './screens/CoursesScreen';
import { ContactScreen } from './screens/ContactScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryCourseId, setEnquiryCourseId] = useState<string | undefined>(undefined);
  const [enquiryMode, setEnquiryMode] = useState<'enquiry' | 'counseling' | 'lab_tour'>('enquiry');
  const [selectedCourseForSyllabus, setSelectedCourseForSyllabus] = useState<CourseItem | null>(null);

  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEnquire = (
    courseId?: string,
    mode: 'enquiry' | 'counseling' | 'lab_tour' = 'enquiry'
  ) => {
    setEnquiryCourseId(courseId);
    setEnquiryMode(mode);
    setEnquiryModalOpen(true);
  };

  const handleSelectCourseSyllabus = (course: CourseItem) => {
    setSelectedCourseForSyllabus(course);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8ff] text-[#131b2e] font-sans antialiased selection:bg-[#cde5ff] selection:text-[#001d32]">
      {/* Top Fixed Navigation */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenEnquire={() => handleOpenEnquire()}
      />

      {/* Main Content View with padding for fixed header */}
      <main className="flex-1 pt-20 md:pt-28">
        {currentScreen === 'about' && (
          <AboutScreen
            onNavigate={handleNavigate}
            onOpenEnquire={handleOpenEnquire}
          />
        )}

        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={handleNavigate}
            onOpenEnquire={handleOpenEnquire}
            onSelectCourseSyllabus={handleSelectCourseSyllabus}
          />
        )}

        {currentScreen === 'courses' && (
          <CoursesScreen
            onNavigate={handleNavigate}
            onOpenEnquire={handleOpenEnquire}
            onSelectCourseSyllabus={handleSelectCourseSyllabus}
          />
        )}

        {currentScreen === 'contact' && (
          <ContactScreen onOpenEnquire={handleOpenEnquire} />
        )}
      </main>

      {/* Global Institution Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenEnquire={() => handleOpenEnquire()}
      />

      {/* Floating WhatsApp Quick Action Widget */}
      <WhatsAppWidget />

      {/* Modal: Admissions & Course Enquiry */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        defaultCourseId={enquiryCourseId}
        defaultMode={enquiryMode}
      />

      {/* Modal: Detailed Course Syllabus & Module Checklist */}
      <SyllabusModal
        course={selectedCourseForSyllabus}
        onClose={() => setSelectedCourseForSyllabus(null)}
        onEnquireCourse={(courseId) => {
          handleOpenEnquire(courseId, 'enquiry');
        }}
      />
    </div>
  );
}
