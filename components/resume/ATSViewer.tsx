import React from 'react';
import { Resume } from '../../types';
import { ShieldCheck, FileCode, Check, AlertTriangle } from 'lucide-react';

interface ATSViewerProps {
  resume: Resume;
}

export const ATSViewer: React.FC<ATSViewerProps> = ({ resume }) => {
  // Simulate ATS Parsing logic
  const isGoodForATS = resume.template === 'titanium' || resume.template === 'new-york' || resume.template === 'san-francisco';
  
  const score = isGoodForATS ? 98 : 75;

  return (
    <div className="bg-slate-900 text-green-400 font-mono p-8 h-full overflow-y-auto text-sm w-full">
      <div className="border-b border-green-800 pb-4 mb-6 flex justify-between items-center">
        <div>
           <h2 className="text-xl font-bold flex items-center gap-2">
             <FileCode size={20} />
             ATS PARSING SIMULATION
           </h2>
           <p className="text-green-600 text-xs mt-1">Simulating automated extraction process...</p>
        </div>
        <div className="flex items-center gap-2">
           <ShieldCheck size={24} className={isGoodForATS ? "text-green-400" : "text-yellow-500"} />
           <span className="text-2xl font-bold">{score}%</span>
        </div>
      </div>

      {!isGoodForATS && (
        <div className="bg-yellow-900/30 border border-yellow-700 text-yellow-500 p-4 mb-6 rounded">
          <div className="font-bold flex items-center gap-2 mb-1"><AlertTriangle size={16}/> Warning: Complex Layout Detected</div>
          <p className="opacity-80">This template uses columns or complex formatting which may confuse older ATS software. For maximum safety, switch to the "Titanium" template.</p>
        </div>
      )}

      <div className="space-y-6 opacity-90">
        <div>
          <div className="text-green-700 font-bold mb-1 border-b border-green-900">-- CANDIDATE IDENTITY --</div>
          <div><span className="text-green-600">NAME_EXTRACTED:</span> {resume.personalInfo.fullName}</div>
          <div><span className="text-green-600">EMAIL_EXTRACTED:</span> {resume.personalInfo.email}</div>
          <div><span className="text-green-600">LOC_EXTRACTED:</span> {resume.personalInfo.location}</div>
        </div>

        <div>
           <div className="text-green-700 font-bold mb-1 border-b border-green-900">-- PROFESSIONAL_SUMMARY --</div>
           <div className="whitespace-pre-wrap">{resume.personalInfo.summary || 'NULL'}</div>
        </div>

        <div>
           <div className="text-green-700 font-bold mb-1 border-b border-green-900">-- WORK_HISTORY_ENTITIES --</div>
           {resume.workExperience.map((exp, i) => (
             <div key={exp.id} className="mb-4 ml-2 border-l-2 border-green-900 pl-3">
               <div><span className="text-green-600">ROLE:</span> {exp.position}</div>
               <div><span className="text-green-600">ORG:</span> {exp.company}</div>
               <div><span className="text-green-600">DATES:</span> {exp.startDate} to {exp.current ? 'PRESENT' : exp.endDate}</div>
               <div className="mt-1 text-green-300/70">{exp.description.substring(0, 100)}... <span className="text-green-800">[TEXT_BLOCK_DETECTED]</span></div>
             </div>
           ))}
        </div>

        <div>
           <div className="text-green-700 font-bold mb-1 border-b border-green-900">-- EDUCATIONAL_BACKGROUND --</div>
           {resume.education.map((edu, i) => (
             <div key={edu.id} className="mb-2 ml-2">
               <span>[DEGREE: {edu.degree}] [FIELD: {edu.field}] [INSTITUTION: {edu.school}]</span>
             </div>
           ))}
        </div>

        <div>
           <div className="text-green-700 font-bold mb-1 border-b border-green-900">-- KEYWORD_CLOUD --</div>
           <div className="flex flex-wrap gap-2">
             {resume.skills.map(s => (
               <span key={s.id} className="bg-green-900/40 px-2 py-0.5 rounded text-xs text-green-300">
                 {s.name}
               </span>
             ))}
             {resume.skills.length === 0 && <span className="text-red-500">NO_SKILLS_DETECTED</span>}
           </div>
        </div>
      </div>
      
      <div className="mt-8 pt-4 border-t border-green-800 text-center text-xs text-green-700 animate-pulse">
        SCANNING COMPLETE - READY FOR HUMAN REVIEW
      </div>
    </div>
  );
};