
export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link?: string;
  technologies?: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description: string;
}

export interface CustomSection {
  id: string;
  title: string; // e.g., "Languages", "Awards"
  items: CustomSectionItem[];
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedin?: string;
  website?: string;
  location: string;
  summary: string;
  photo?: string; // Base64 string
}

export interface LayoutSettings {
  margin: number; // 0 to 100
  fontSize: number; // 0.8 to 1.2
  lineHeight: number; // 1 to 2
  sectionGap: number; // 0 to 100
}

export interface Resume {
  id: string;
  title: string;
  lastModified: number;
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  customSections: CustomSection[];
  
  // Design Settings
  template: string;
  themeColor: string;
  fontFamily: string;
  layout: LayoutSettings;
  sectionOrder: string[]; // Array of section IDs e.g. ['experience', 'education', 'skills']
}

export interface AIResponse {
  text: string;
  error?: string;
}
