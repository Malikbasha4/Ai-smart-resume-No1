
import { Resume } from './types';

export const INITIAL_LAYOUT = {
  margin: 24, // px
  fontSize: 1, // rem scale
  lineHeight: 1.5,
  sectionGap: 24, // px
};

export const INITIAL_SECTION_ORDER = [
  'personal',
  'summary',
  'experience',
  'education',
  'projects',
  'skills',
  'custom'
];

export const INITIAL_RESUME: Resume = {
  id: '',
  title: 'Untitled Resume',
  lastModified: Date.now(),
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    linkedin: '',
    website: '',
    photo: ''
  },
  workExperience: [],
  education: [],
  skills: [],
  projects: [],
  customSections: [],
  template: 'titanium',
  themeColor: '#2563eb',
  fontFamily: 'Inter',
  layout: INITIAL_LAYOUT,
  sectionOrder: INITIAL_SECTION_ORDER
};

export const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export const THEME_COLORS = [
  { name: 'Royal Blue', value: '#2563eb' },
  { name: 'Obsidian', value: '#1e293b' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Crimson', value: '#dc2626' },
  { name: 'Amethyst', value: '#7c3aed' },
  { name: 'Gold', value: '#d97706' },
  { name: 'Midnight', value: '#0f172a' },
  { name: 'Teal', value: '#0d9488' },
  { name: 'Rose', value: '#e11d48' },
  { name: 'Indigo', value: '#4f46e5' },
  { name: 'Fuchsia', value: '#c026d3' },
  { name: 'Cyan', value: '#0891b2' },
  { name: 'Orange', value: '#ea580c' },
];

export const FONTS = [
  { name: 'Inter (Modern)', value: 'Inter', type: 'sans' },
  { name: 'Roboto (Clean)', value: 'Roboto', type: 'sans' },
  { name: 'Open Sans (Neutral)', value: 'Open Sans', type: 'sans' },
  { name: 'Montserrat (Bold)', value: 'Montserrat', type: 'sans' },
  { name: 'Lato (Friendly)', value: 'Lato', type: 'sans' },
  { name: 'Merriweather (Read)', value: 'Merriweather', type: 'serif' },
  { name: 'Playfair (Elegant)', value: 'Playfair Display', type: 'serif' },
  { name: 'Lora (Classic)', value: 'Lora', type: 'serif' },
  { name: 'Roboto Slab (Strong)', value: 'Roboto Slab', type: 'serif' },
  { name: 'JetBrains (Tech)', value: 'JetBrains Mono', type: 'mono' },
];

export const TEMPLATES = [
  { id: 'titanium', name: 'Titanium (ATS)', desc: '100% Robot Readable' },
  { id: 'san-francisco', name: 'San Francisco', desc: 'Modern & Clean' },
  { id: 'new-york', name: 'New York', desc: 'Classic Professional' },
  { id: 'london', name: 'London', desc: 'Executive Serif' },
  { id: 'berlin', name: 'Berlin', desc: 'Bold Minimalist' },
  { id: 'paris', name: 'Paris', desc: 'Luxury Editorial' },
  { id: 'dubai', name: 'Dubai', desc: 'High Impact' },
];
