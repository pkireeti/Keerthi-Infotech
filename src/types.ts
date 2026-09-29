export type ScreenType = 'about' | 'courses' | 'home' | 'contact' | 'admin';

export interface TimelineEra {
  id: string;
  tabLabel: string;
  eraBadge: string;
  title: string;
  description: string;
  bulletPoints: string[];
  imageUrl: string;
  altText: string;
}

export interface CourseTrack {
  id: string;
  trackNumber: string;
  title: string;
  shortDesc: string;
  iconName: string;
  certName: string;
  highlights: string[];
  coursesCount: number;
}

export interface CourseItem {
  id: string;
  trackId: string;
  trackName: string;
  title: string;
  code: string;
  duration?: string;
  labHours: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Comprehensive Diploma';
  description: string;
  modules: string[];
  prerequisites: string;
  careerRoles: string[];
  certBadge: string;
  schedules: string[];
  featured?: boolean;
}

export interface TestimonialItem {
  name: string;
  batchYear: string;
  role: string;
  companyOrCollege: string;
  courseCompleted: string;
  quote: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface ManagingDirectorInfo {
  title: string;
  role: string;
  qualifications?: string[];
  qualificationDetails?: {
    code: string;
    title: string;
    description: string;
  }[];
  experience: string;
  photoUrl?: string;
  quote?: string;
  visionPoints: string[];
}

