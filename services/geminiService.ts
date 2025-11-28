import { GoogleGenAI } from "@google/genai";
import { Resume } from '../types';

const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }
  return new GoogleGenAI({ apiKey });
};

export const enhanceText = async (text: string, context: string = "resume"): Promise<string> => {
  try {
    const ai = getAIClient();
    const prompt = `
      You are an expert resume writer. 
      Rewrite the following ${context} text to be more professional, impactful, and concise. 
      Use active voice and strong action verbs.
      Return ONLY the rewritten text, no explanations.
      
      Original Text: "${text}"
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("AI Enhance Error:", error);
    throw error;
  }
};

export const generateBullets = async (position: string, company: string): Promise<string> => {
  try {
    const ai = getAIClient();
    const prompt = `
      Generate 3-4 professional, achievement-oriented resume bullet points for the position of "${position}" at "${company}".
      Focus on measurable impact, leadership, and technical skills appropriate for this role.
      Use active voice.
      Return only the bullet points as a single string, separated by newlines. Do not include dashes or bullets, just the text lines.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("AI Generate Bullets Error:", error);
    throw error;
  }
};

export const generateSummary = async (resume: Resume): Promise<string> => {
  try {
    const ai = getAIClient();
    const resumeContext = JSON.stringify({
      experience: resume.workExperience,
      skills: resume.skills,
      education: resume.education
    });

    const prompt = `
      Based on the following resume data, write a compelling, professional summary (max 3-4 sentences).
      Highlight key skills and years of experience if applicable.
      Return ONLY the summary text.
      
      Resume Data: ${resumeContext}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("AI Summary Error:", error);
    throw error;
  }
};

export const analyzeJobFit = async (resume: Resume, jobDescription: string): Promise<string> => {
  try {
    const ai = getAIClient();
    const resumeText = JSON.stringify(resume);

    const prompt = `
      You are an ATS (Applicant Tracking System) expert.
      Compare the Resume against the Job Description.
      
      1. Identify missing keywords.
      2. Suggest specific improvements for the "Work Experience" section to better align with the job.
      3. Give a match score (0-100%).
      
      Keep the response concise and formatted in Markdown.
      
      Resume: ${resumeText}
      
      Job Description: ${jobDescription}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw error;
  }
};

export const optimizeContent = async (text: string, jobDescription: string): Promise<string> => {
  try {
    const ai = getAIClient();
    const prompt = `
      Rewrite the following resume content to specifically target the provided Job Description.
      Incorporate relevant keywords from the job description naturally.
      Maintain truthfulness but phrase achievements to match the job requirements.
      Use active voice.
      
      Job Description Snippet: ${jobDescription.substring(0, 500)}...
      
      Original Content: "${text}"
      
      Return ONLY the rewritten content.
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("AI Optimize Error:", error);
    throw error;
  }
};

export const generateCoverLetter = async (resume: Resume, jobDescription: string): Promise<string> => {
  try {
    const ai = getAIClient();
    const resumeContext = JSON.stringify({
      name: resume.personalInfo.fullName,
      experience: resume.workExperience,
      skills: resume.skills
    });

    const prompt = `
      Write a professional, persuasive cover letter based on the candidate's resume and the job description.
      
      Candidate Info: ${resumeContext}
      
      Job Description: ${jobDescription}
      
      Rules:
      1. Use a professional tone.
      2. Highlight specific achievements from the resume that match the job description.
      3. Keep it under 300 words.
      4. Return ONLY the body of the letter (no date/address header).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("AI Cover Letter Error:", error);
    throw error;
  }
};
