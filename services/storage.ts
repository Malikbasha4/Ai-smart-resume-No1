import { Resume } from '../types';
import { INITIAL_RESUME } from '../constants';

const STORAGE_KEY = 'resumai_data';

export const getResumes = (): Resume[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getResumeById = (id: string): Resume | undefined => {
  const resumes = getResumes();
  return resumes.find(r => r.id === id);
};

export const saveResume = (resume: Resume): void => {
  const resumes = getResumes();
  const index = resumes.findIndex(r => r.id === resume.id);
  
  if (index >= 0) {
    resumes[index] = { ...resume, lastModified: Date.now() };
  } else {
    resumes.push({ ...resume, lastModified: Date.now() });
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
};

export const deleteResume = (id: string): void => {
  const resumes = getResumes().filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
};

export const createNewResume = (): Resume => {
  const newResume: Resume = {
    ...INITIAL_RESUME,
    id: crypto.randomUUID(),
    lastModified: Date.now(),
  };
  saveResume(newResume);
  return newResume;
};
