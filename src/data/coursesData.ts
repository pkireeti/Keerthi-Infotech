import { TimelineEra, CourseTrack, CourseItem, TestimonialItem, FAQItem, ManagingDirectorInfo } from '../types';

export const MANAGING_DIRECTOR_INFO: ManagingDirectorInfo = {
  title: 'Managing Director',
  role: 'Founder & Head of Institution',
  experience: '25+ Years of Educational Leadership & Student Mentorship',
  photoUrl: '/managing-director.png',
  quote:
    'Since founding Keerthi Infotech in 1999, our singular priority has been practical, job-ready competence. By uniting commerce discipline with cutting-edge IT applications, we empower every student with the technical mastery and confidence required to excel in modern industry.',
  visionPoints: [
    '25+ Years of Dedicated Educational Leadership since 1999',
    'Practical, job-oriented curriculum in Office Productivity, Accounting & Programming',
    '1:1 Personal mentorship approach for academic and employment success',
    'Continuous skill development aligned with evolving corporate hiring needs',
  ],
};

export const INSTITUTION_INFO = {
  name: 'Keerthi Infotech',
  tagline: 'Computer Education Since 1999',
  estd: '1999',
  yearsOfExcellence: '25+',
  studentsTrained: '20,000+',
  regNo: 'Reg. No: 1999/TN/IT-EDU',
  accreditationBadge: 'Vocational IT Training Institute',
  phone: '+91 98491 74718',
  whatsapp: '+91 98491 74718',
  whatsappUrl: 'https://wa.me/919849174718',
  email: 'info@keerthiinfotech.com',
  address: 'Mega Hills Complex, C1, NH65, Below Union Bank, Miyapur, Hyderabad, Telangana - 500049',
  landmark: 'Opposite Metro Pillar, Near Miyapur Bus Depot',
  officeHours: 'Monday – Friday (Weekends are Online Classes)',
  logoUrl: '/keerthi-logo.png',
  heroLabImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqRcBNDZqc1UGncaixGlvi2wwFQzH0EAawls9GhuEBsuVSsBu8nhdXsty1ECtIuBK3FGvK2-llCcE4P8uQV5rT1hgMh5k0k16lTcwYfgiELYQXX2_iln7YUzZs0s0eX64f9PVxq8AZjbpD7gBbZTMExJXpsH72nXpr_CZzGZ_HK-cyO75JF7LfzpYMDNmI_aEpJZUB0hIpiz_7VWofPNyCqgDGipjEYMQNjGSM2_sMaXdMmBjpF3_M',
  panoramicFacilityImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIGOtV5S1gnNnmIA-81b0SzlmNha_WeHabMarQ0MV3_jsHf48k4p4Gy3r7ls3jL2GQ0lNwT_n6Ono7KILJGwcm7xHaMeckTDSCLALN6dWyW1rOWJwsxNEBxFrSV5FbsnoB_u38mLdcK4hx5P6cFpsJb97i2nyEpja4hLw-3W3Yp5BZpXPe2l8XOxqp7J8Pz-9nOlnP4jUnc4Wjvhhr6_FkuzCXgxrQB6Qk2d4V6THVcv89N6n7hm4j',
  managingDirector: MANAGING_DIRECTOR_INFO,
};

export const TIMELINE_ERAS: TimelineEra[] = [
  {
    id: 'genesis-1999',
    tabLabel: '1999 • Genesis',
    eraBadge: 'ESTABLISHED: 1999',
    title: 'Core Computing & Vocational Digital Literacy',
    description: 'Keerthi Infotech established in Hyderabad — focused on core computer literacy and essential IT fundamentals. We opened our doors with state-of-the-art CRT monitors, training aspirants in disk operating systems, fast typing techniques, and introductory office applications to equip local youth with employment readiness.',
    bulletPoints: [
      'Introduction to Personal Computing & DOS',
      'Vocational High-Speed Typing and Document Formatting',
      'Foundational IT Certificates recognized by regional employers',
    ],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpHWDMJy8C4d-e1Q4UgSg2vEGy9KuNT04Pp530Bt2faR8MT6ix3F6rXWjj9f2xr57N9mAU8rVceNbhIKrCGqsz2Z5X0SwFGrewZggVXVmsniL2tYJZvRkkfxl-phQKojWxm96pJMRBqeDxkkhmaUp9x2AN3xEW5eOdMiE5nyssuZVD_1BAGblffCBelaP2Sohk026CUROVkX1yj3KWSozX6fEgXDVnQGgGaAD9cnpoVkKRjGrSYFOq',
    altText: 'Historical archive photograph representing late 1990s early desktop computing era with CRT monitors in an organized training classroom.'
  },
  {
    id: 'accounting-2000s',
    tabLabel: '2000s • Accounting Era',
    eraBadge: 'ERA: 2000 – 2009',
    title: 'Financial Accounting, Tally & Office Suites',
    description: 'Expansion into Financial Accounting (Tally), Office Suites & Advanced Spreadsheet Modeling. During this period of commercial boom, businesses shifted from physical balance books to computerized ledgers. Keerthi Infotech trained over 8,000 commerce students in GST, payroll, inventory, and automated reporting.',
    bulletPoints: [
      'Tally with Inventory, VAT, and Statutory Compliance',
      'Advanced Excel: VLOOKUP, Nested Formulas & Pivot Tables',
      'Structured Diploma in Computer Applications (DCA)',
    ],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLD3Us62fwRxBZzoH2sEdV_PTe0PvTkafF9xe_W4NxRMll8sU9cY6chHbD-hMAWf_XS7SPQLhY0GhQIll9MZjWSKZ2A7wxp9blVPq4arj0oI5LdS3NnZbCkp0vrdlWdk3u1JimQhqUXU-nf8W-0OKkzcxElZQqBFHuQeaRFS4w_8Ien4RNWHlsvqMl3DHFdcldqW8oABAURIkVBYwp1Gj6IjKyqM43I6QcMg-oufp_CBX7VgpmRoI2',
    altText: 'Financial accountant working on dual screens displaying spreadsheet tables and accounting software in a professional learning environment.'
  },
  {
    id: 'software-2010s',
    tabLabel: '2010s • Software Wave',
    eraBadge: 'ERA: 2010 – 2019',
    title: 'Software Development Tracks & Engineering Labs',
    description: 'Software development tracks: C, C++, Python, and relational database systems. As Hyderabad solidified its stature as Cyberabad, we instituted intensive coding labs to help undergraduate engineering candidates excel in programming coursework, technical challenges, and structural software architecture.',
    bulletPoints: [
      'Object-Oriented Programming principles with C++ and Core Java',
      'Relational Data Modeling & Complex Oracle database query optimization',
      'Python scripting and rapid application prototyping',
    ],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD90_iwgwiQHHbnl7qiMAcJNxneM3oaz-1kAZqFann276BYJbXs5qt7Zl11lDoT_pip-yfTw1aqKkow9BiC1p5RjuwVdU2n1xb7cruEldtck1bNycMi4MjLz3rFSDOrgTDYAiXxLuPe_BknPkVGtEiTtY3dreIPpzU59nWrHIa5hZ2KdYZh-MbA-_ovU2f5Y-IypLxcJx2qwkc1hEte2Au1gL5KXhYz3EC50ofs4HpS8Vz9KXHW6YpO',
    altText: 'Software engineering student reviewing source code on an ultra-wide monitor with highlighted syntax in a contemporary technical lab.'
  },
  {
    id: 'ai-present',
    tabLabel: 'Present • AI & Analytics',
    eraBadge: 'PRESENT ERA',
    title: 'Applied Workplace AI, Power BI & Business Analytics',
    description: 'Pioneering applied workplace technology: Power BI, Business Analytics, and Generative AI & Prompt Engineering. Today, we equip students to stand apart by integrating LLM workflows, automated data ingestion pipelines, and interactive executive reporting into their daily skill set.',
    bulletPoints: [
      'Microsoft Power BI for visual business intelligence',
      'Generative AI, ChatGPT prompts, and modern productivity workflows',
      'High-impact portfolio projects ready for resume inclusion',
    ],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKzLbLGuBmB9L14xKUxb-8C4Jq3TNqgFvKiDm8-IhVYXZY16JLzk8TxSTUodZtcU-Dscm3MkIrtESEV5xebr4bkN_mx7GeNORJ0dZBxdugZJ8x1I32CFbn-0XE8lbKFGpJLqFwhDRqcLeOhegd6Rdb5BRwkO2jz1B1hMNhg4ojlVuIL9P1LHBti6hsmnknkcDv8qLtmZ1h4plfMdyMpd1Degt9brF2jKhrj0vyD7zjoygXccefJXpR',
    altText: 'Modern business analytics dashboard displayed on a high-resolution display with sleek glowing data visualizations and AI prompt interface.'
  }
];

export const COURSE_TRACKS: CourseTrack[] = [
  {
    id: 'office-productivity',
    trackNumber: 'TRACK 01',
    title: 'Office Productivity',
    shortDesc: 'Complete workplace readiness covering computer fundamentals, Microsoft Word, PowerPoint, and advanced spreadsheet data management.',
    iconName: 'description',
    certName: 'Cert: DCA / MDCA',
    highlights: [
      'MS Office • Word • Excel',
      'Advanced Formulas & Pivots',
      'PowerPoint & Presentations'
    ],
    coursesCount: 3
  },
  {
    id: 'financial-accounting',
    trackNumber: 'TRACK 02',
    title: 'Financial Accounting',
    shortDesc: 'Professional accounting, ledger generation, inventory records, and statutory GST taxation processing utilizing industry-standard Tally Prime.',
    iconName: 'calculate',
    certName: 'Cert: Financial IT',
    highlights: [
      'Tally with GST',
      'Inventory & E-Way Billing',
      'Balance Sheet & P&L Analysis'
    ],
    coursesCount: 1
  },
  {
    id: 'programming-tech',
    trackNumber: 'TRACK 03',
    title: 'Programming & Tech',
    shortDesc: 'Logic building, control structures, and software engineering foundations tailored for academics and entry-level IT technical screenings.',
    iconName: 'code',
    certName: 'Cert: Dev Foundations',
    highlights: [
      'C & C++ Programming',
      'Core & Advanced Python',
      'Oracle & Database Architecture'
    ],
    coursesCount: 4
  },
  {
    id: 'ai-analytics',
    trackNumber: 'TRACK 04',
    title: 'AI & Business Intelligence',
    shortDesc: 'Transform raw metrics into actionable insight using Power BI visual modeling paired with workplace Generative AI techniques.',
    iconName: 'psychology',
    certName: 'Cert: AI & BI Pro',
    highlights: [
      'Power BI Interactive Dashboards',
      'Prompt Engineering Patterns',
      'AI-Assisted Document Synthesis'
    ],
    coursesCount: 3
  }
];

export const COURSES_CATALOG: CourseItem[] = [
  // Track 1
  {
    id: 'dca-diploma',
    trackId: 'office-productivity',
    trackName: 'Office Productivity',
    title: 'Diploma in Computer Applications (DCA)',
    code: 'KI-DCA-101',
    labHours: '70 Hours Lab Time',
    level: 'Comprehensive Diploma',
    description: 'Our most popular foundational course established in 1999. Covers complete digital computer fundamentals, operating systems, advanced MS Office suite, and English typing speed building.',
    modules: [
      'Computer Architecture, Windows OS & File Management',
      'High-Speed Typing Practice & Proofreading Standards',
      'Microsoft Word: Advanced Document Layout & Mail Merge',
      'Microsoft Excel: Data Formatting, Logical & Financial Formulas',
      'Microsoft PowerPoint: Professional Presentations & Slide Masters'
    ],
    prerequisites: 'None. Open to 10th/Inter students, graduates, and job seekers.',
    careerRoles: ['Office Administrator', 'Data Entry Executive', 'Front Desk Assistant', 'Government Examination Ready'],
    certBadge: 'Professional DCA Diploma Credential',
    schedules: ['Morning Batch', 'Evening Batch'],
    featured: true
  },
  {
    id: 'advanced-excel',
    trackId: 'office-productivity',
    trackName: 'Office Productivity',
    title: 'Advanced Excel & Business Spreadsheets',
    code: 'KI-EXCEL-102',
    labHours: '25 Hours Lab Time',
    level: 'Intermediate',
    description: 'Master lookup functions (XLOOKUP, VLOOKUP, INDEX-MATCH), nested IF logic, Pivot Tables, slicers, conditional formatting, and dashboard design for corporate reporting.',
    modules: [
      'Data Cleaning & Text Manipulation (TRIM, CONCAT, TEXTSPLIT)',
      'Modern Dynamic Arrays & Reference Lookups (XLOOKUP, FILTER)',
      'Pivot Tables, Calculated Fields & Interactive Slicers',
      'Financial Modeling & What-If Analysis (Goal Seek, Scenario Manager)',
      'Executive Summary Dashboard Construction'
    ],
    prerequisites: 'Basic familiarity with computer keyboard and mouse.',
    careerRoles: ['MIS Executive', 'Reporting Analyst', 'Operations Coordinator'],
    certBadge: 'Advanced Spreadsheet Credential',
    schedules: ['Morning Batch', 'Evening Batch']
  },
  {
    id: 'mdca-master-diploma',
    trackId: 'office-productivity',
    trackName: 'Office Productivity',
    title: 'Master Diploma in Computer Applications (MDCA)',
    code: 'KI-MDCA-103',
    labHours: '140 Hours Lab Time',
    level: 'Comprehensive Diploma',
    description: 'The complete umbrella program combining DCA office productivity and Tally Prime accounting with GST.',
    modules: [
      'Complete DCA Module (Windows, Office, Fast Typing)',
      'Financial Accounting in Tally with GST & Invoicing',
      'Photoshop & CorelDraw for Commercial Graphics',
      'Web Foundations: HTML5, CSS & Internet Applications',
      'Real-world Office Project & Comprehensive Portfolio'
    ],
    prerequisites: '10th standard or equivalent qualification.',
    careerRoles: ['Computer Center Operator', 'Senior Administrative Executive', 'Accounts Assistant'],
    certBadge: 'Master Diploma Credential',
    schedules: ['Morning Batch', 'Evening Batch']
  },

  // Track 2
  {
    id: 'tally-prime-gst',
    trackId: 'financial-accounting',
    trackName: 'Financial Accounting',
    title: 'Tally with GST',
    code: 'KI-TALLY-201',
    labHours: '40 Hours Lab Time',
    level: 'Intermediate',
    description: 'Practical training on Tally Prime, the gold standard for Indian business accounting. Covers company creation, multi-rate GST invoicing, inventory tracking, banking reconciliation, and statutory return filing.',
    modules: [
      'Accounting Principles & Ledger Master Creation',
      'Inventory Control: Units, Godowns, Batch Numbers & Expiry',
      'GST Architecture: CGST, SGST, IGST, HSN/SAC Codes',
      'E-Way Bill & E-Invoice Integration in Tally',
      'TDS Deductions, Challan Generation & Payroll Processing',
      'Final Accounts: Balance Sheet, Trial Balance, P&L Audit'
    ],
    prerequisites: 'B.Com / Commerce background preferred or basic accounting knowledge.',
    careerRoles: ['Tally Accountant', 'Billing Executive', 'Accounts Executive', 'Audit Assistant'],
    certBadge: 'Tally with GST Certificate',
    schedules: ['Morning Batch', 'Evening Batch'],
    featured: true
  },

  // Track 3
  {
    id: 'c-cpp-programming',
    trackId: 'programming-tech',
    trackName: 'Programming & Tech',
    title: 'C & C++ Programming',
    code: 'KI-CPP-301',
    labHours: '45 Hours Lab Time',
    level: 'Beginner',
    description: 'Master core logic, procedural design, and object-oriented programming with C and C++. Gain deep hands-on proficiency in pointers, memory management, functions, file operations, and C++ OOP architecture.',
    modules: [
      'Algorithm Design, Flowcharts & Conditional Control (if/else, switch, loops)',
      'Functions, Variable Scope, Header Files, Storage Classes & Arrays',
      'Pointers, Pointer Arithmetic, Dynamic Memory Allocation (malloc, calloc, free)',
      'Structures, Unions, Typedef & File I/O Operations in C',
      'C++ Fundamentals: cin/cout Streams, References, Function Overloading & Inline Functions',
      'C++ Object-Oriented Programming: Classes, Encapsulation, Inheritance, Polymorphism & Constructors'
    ],
    prerequisites: 'Open to B.Tech, BCA, BSc (Computers), and aspiring software engineers.',
    careerRoles: ['Junior Software Developer', 'C/C++ Programmer', 'Technical Associate'],
    certBadge: 'Certified C & C++ Programmer',
    schedules: ['Morning Batch', 'Evening Batch'],
    featured: true
  },
  {
    id: 'python-core-advanced',
    trackId: 'programming-tech',
    trackName: 'Programming & Tech',
    title: 'Python Programming',
    code: 'KI-PY-302',
    labHours: '48 Hours Lab Time',
    level: 'Intermediate',
    description: 'Learn Python from syntax basics to object-oriented programming, custom functions, and modular application development. The ideal entry door for software engineering.',
    modules: [
      'Python Environment, Data Types, Collections (Lists, Tuples, Dicts, Sets)',
      'Control Flow, List Comprehensions & Custom Functions',
      'Object-Oriented Design in Python, Exceptions & Modules',
      'Capstone Project: Real-World Application & Desktop Utility'
    ],
    prerequisites: 'Basic logical thinking; no prior coding required.',
    careerRoles: ['Python Developer', 'Software Engineer Trainee', 'Data Engineering Aspirant'],
    certBadge: 'Certified Python Programmer',
    schedules: ['Morning Batch', 'Evening Batch']
  },
  {
    id: 'oracle-database-architecture',
    trackId: 'programming-tech',
    trackName: 'Programming & Tech',
    title: 'Relational Database Design & Oracle Mastery',
    code: 'KI-ORA-303',
    labHours: '25 Hours Lab Time',
    level: 'Intermediate',
    description: 'Build robust database querying and management skills with Oracle Database. Learn joins, subqueries, aggregate grouping, stored procedures, indexing, and normalization.',
    modules: [
      'Relational Database Concepts, Primary/Foreign Keys, Normalization',
      'Oracle SQL: DDL & DML Commands (CREATE, ALTER, INSERT, UPDATE, DELETE)',
      'Advanced Joins: INNER, LEFT, RIGHT, FULL OUTER & Self Joins',
      'Aggregate Functions, GROUP BY, HAVING & Analytical Functions',
      'PL/SQL & Stored Procedures, Triggers & Query Performance Tuning'
    ],
    prerequisites: 'Basic computer understanding.',
    careerRoles: ['Oracle Developer', 'Database Support Executive', 'Junior Data Analyst'],
    certBadge: 'Oracle Database Foundations Certificate',
    schedules: ['Morning Batch', 'Evening Batch']
  },

  // Track 4
  {
    id: 'power-bi-analytics',
    trackId: 'ai-analytics',
    trackName: 'AI & Business Intelligence',
    title: 'Microsoft Power BI & Data Visualization',
    code: 'KI-BI-401',
    labHours: '35 Hours Lab Time',
    level: 'Intermediate',
    description: 'Turn messy business data into interactive visual executive dashboards. Learn Power Query ETL transformations, text functions, date functions, number functions, and appending in Power Query M language.',
    modules: [
      'Power BI Desktop Setup & Ingesting Multi-Source Data',
      'Power Query: Data Cleaning, Pivoting & Column Transformations',
      'Power Query M Language: Text, Date & Number Functions, and Table Appending',
      'Calculated Measures & Analytical Business Metrics',
      'Visual Canvas Layout: Cards, KPIs, Drill-Throughs & Bookmarks',
      'Publishing to Power BI Service & Scheduled Auto-Refreshes'
    ],
    prerequisites: 'Familiarity with Excel is helpful.',
    careerRoles: ['Power BI Developer', 'Business Intelligence Analyst', 'Data Visualization Specialist'],
    certBadge: 'Power BI Business Analyst Credential',
    schedules: ['Morning Batch', 'Evening Batch'],
    featured: true
  },
  {
    id: 'generative-ai-prompting',
    trackId: 'ai-analytics',
    trackName: 'AI & Business Intelligence',
    title: 'Generative AI & Workplace Prompt Engineering',
    code: 'KI-AI-402',
    labHours: '22 Hours Lab Time',
    level: 'Beginner',
    description: 'Multiply your everyday productivity 5x with modern AI tools. Learn structured prompt design, document summarization, code generation assistance, data formatting, and practical workplace workflows.',
    modules: [
      'Foundations of Large Language Models (LLMs) & Token Mechanics',
      'System Prompts, Few-Shot Prompting, and Chain-of-Thought Patterns',
      'AI for Document Synthesis: Contracts, Emails, Reports, and Presentations',
      'Using AI for Data Analysis, Regex Generation, and Excel Formula Building',
      'AI Image Generation, Multimodal Inputs & Ethical Workflows'
    ],
    prerequisites: 'Open to anyone seeking modern workplace superpower.',
    careerRoles: ['AI-Augmented Professional', 'Executive Assistant', 'Modern Knowledge Worker'],
    certBadge: 'Applied Generative AI Specialist',
    schedules: ['Morning Batch', 'Evening Batch']
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    name: 'Venkat Paari',
    batchYear: '3 years ago',
    role: 'Fast Track Student',
    companyOrCollege: 'Google Verified Review',
    courseCompleted: 'MS Office & Tally',
    quote: 'I recently completed My course at Keerthi Infotech, I learned Ms office,and Tally in fast track mode... actually Veena mam teaching was awesome...so understanding mode... really if u learn at short term or long term...period visit here ...'
  },
  {
    name: 'Shaik Dawood',
    batchYear: 'Verified Review',
    role: 'Exceptional Experience!',
    companyOrCollege: 'Google Verified Review',
    courseCompleted: 'Tally Course',
    quote: 'It was an exceptional learning experience here at Keerthi Infotech. I learnt Tally from Venkat sir, and his explanations are truly mind-blowing. Highly recommended for anyone looking to master Tally!'
  },
  {
    name: 'Kalpana (art world)',
    batchYear: 'Verified Review',
    role: 'MS Office Student',
    companyOrCollege: 'Google Verified Review',
    courseCompleted: 'MS Office Course',
    quote: 'Hi sir and mam this is Kalpana. "Thank you so much for teaching the MS Office course so clearly and effectively. The way you explained each topic made it very easy to understand. Your patience and support helped me gain confidence in using MS Office. I truly appreciate your dedication and effort. Highly recommended!" 😊'
  },
  {
    name: 'Mitali Sahoo',
    batchYear: 'Verified Review',
    role: 'Macro & VBA Student',
    companyOrCollege: 'Google Verified Review',
    courseCompleted: 'Macro & VBA Course',
    quote: "This institute provides various courses. I took macro and vba course in this institute and special thanks to Venkat Sir and Veena Ma'am. Who made this journey very simple for me. Had a wonderful experience with this institute. Fees are also reasonable."
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'Where is Keerthi Infotech located in Miyapur, Hyderabad?',
    answer: 'We are conveniently located at Mega Hills Complex, C1, NH65, Below Union Bank, Miyapur, Hyderabad. Our center is easily accessible via Miyapur Metro Station (within walking distance) and all RTC bus routes along NH65.',
    category: 'General'
  },
  {
    question: 'Are computers assigned on a 1:1 individual basis?',
    answer: 'Yes, absolutely. We strictly maintain a 1:1 terminal policy. Every enrolled student gets their own independent machine for the full duration of their lab hour. There is zero crowd-sharing or queueing.',
    category: 'Lab & Facilities'
  },
  {
    question: 'Can I visit the institute and computer lab before enrolling?',
    answer: 'Yes! We encourage every student and parent to walk into our Miyapur center, speak with our instructors, inspect the 1:1 computer workstations, and review course syllabuses before enrolling. You can click "Book Lab Visit" or WhatsApp us to schedule a visit.',
    category: 'Admissions'
  },
  {
    question: 'What batches are available for students and working professionals?',
    answer: 'We offer Morning Batch and Evening Batch options from Monday to Friday. Weekends are online classes.',
    category: 'Schedule'
  }
];
