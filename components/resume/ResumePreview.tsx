
import React, { useState } from 'react';
import { Resume } from '../../types';
import { Mail, Phone, MapPin, Linkedin, ZoomIn, ZoomOut, Maximize2 } from '../ui/Icons';
import { INITIAL_LAYOUT, INITIAL_SECTION_ORDER } from '../../constants';

interface ResumePreviewProps {
  resume: Resume;
}

// ---------------------------
// DYNAMIC RENDERER HELPERS
// ---------------------------

// Helper to resolve CSS variables based on layout settings
const getStyleVars = (resume: Resume) => {
  const layout = resume.layout || INITIAL_LAYOUT;
  return {
    '--margin': `${layout.margin}px`,
    '--font-scale': layout.fontSize,
    '--line-height': layout.lineHeight,
    '--gap': `${layout.sectionGap}px`,
    '--primary': resume.themeColor,
    '--font-family': resume.fontFamily,
  } as React.CSSProperties;
};

// Common Components for Reuse across Templates
const SectionHeader: React.FC<{ title: string; className?: string }> = ({ title, className = '' }) => (
  <h2 className={`text-[1.1em] font-bold uppercase mb-[0.5em] tracking-wider ${className}`} style={{ color: 'var(--primary)' }}>
    {title}
  </h2>
);

const DateBadge: React.FC<{ start: string; end: string; current: boolean; className?: string }> = ({ start, end, current, className = '' }) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  return (
    <span className={`text-[0.85em] font-medium whitespace-nowrap ${className}`}>
      {formatDate(start)} – {current ? 'Present' : formatDate(end)}
    </span>
  );
};

// ---------------------------
// SECTION RENDERERS
// ---------------------------
const renderSection = (type: string, resume: Resume) => {
  switch (type) {
    case 'summary':
      return resume.personalInfo.summary ? (
        <section key="summary" className="mb-[var(--gap)]">
           <h2 className="text-[0.9em] font-bold uppercase tracking-widest text-slate-400 mb-[0.5em] border-b border-slate-200 pb-1">Profile</h2>
           <p className="text-[0.95em] leading-[var(--line-height)] text-slate-700">{resume.personalInfo.summary}</p>
        </section>
      ) : null;
      
    case 'experience':
      return resume.workExperience.length > 0 ? (
        <section key="experience" className="mb-[var(--gap)]">
           <h2 className="text-[0.9em] font-bold uppercase tracking-widest text-slate-400 mb-[0.8em] border-b border-slate-200 pb-1">Experience</h2>
           <div className="space-y-[1em]">
             {resume.workExperience.map((exp) => (
               <div key={exp.id}>
                 <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-[1.1em] text-slate-900">{exp.position}</h3>
                    <DateBadge start={exp.startDate} end={exp.endDate} current={exp.current} className="text-slate-500"/>
                 </div>
                 <div className="text-[1em] font-semibold mb-[0.3em]" style={{ color: 'var(--primary)' }}>{exp.company}</div>
                 <p className="text-[0.9em] text-slate-700 whitespace-pre-wrap leading-[var(--line-height)]">{exp.description}</p>
               </div>
             ))}
           </div>
        </section>
      ) : null;

    case 'education':
      return resume.education.length > 0 ? (
        <section key="education" className="mb-[var(--gap)]">
           <h2 className="text-[0.9em] font-bold uppercase tracking-widest text-slate-400 mb-[0.8em] border-b border-slate-200 pb-1">Education</h2>
           <div className="space-y-[0.8em]">
             {resume.education.map((edu) => (
               <div key={edu.id} className="flex justify-between items-start">
                 <div>
                   <h3 className="font-bold text-[1em] text-slate-900">{edu.school}</h3>
                   <div className="text-[0.9em] text-slate-700">{edu.degree}, {edu.field}</div>
                 </div>
                 <DateBadge start={edu.startDate} end={edu.endDate} current={edu.current} className="text-slate-500"/>
               </div>
             ))}
           </div>
        </section>
      ) : null;

    case 'skills':
      return resume.skills.length > 0 ? (
        <section key="skills" className="mb-[var(--gap)]">
          <h2 className="text-[0.9em] font-bold uppercase tracking-widest text-slate-400 mb-[0.5em] border-b border-slate-200 pb-1">Skills</h2>
          <div className="flex flex-wrap gap-[0.5em]">
            {resume.skills.map((skill) => (
              <span key={skill.id} className="px-[0.8em] py-[0.3em] bg-slate-100 text-slate-800 rounded text-[0.85em] font-medium">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      ) : null;

    case 'projects':
      return resume.projects.length > 0 ? (
        <section key="projects" className="mb-[var(--gap)]">
           <h2 className="text-[0.9em] font-bold uppercase tracking-widest text-slate-400 mb-[0.8em] border-b border-slate-200 pb-1">Projects</h2>
           <div className="space-y-[1em]">
             {resume.projects.map((proj) => (
               <div key={proj.id}>
                 <div className="flex justify-between items-baseline mb-[0.2em]">
                    <h3 className="font-bold text-[1em] text-slate-900">{proj.name}</h3>
                    {proj.link && <span className="text-[0.8em] text-blue-500">{proj.link}</span>}
                 </div>
                 {proj.technologies && <div className="text-[0.85em] text-slate-500 mb-[0.3em] font-mono">{proj.technologies}</div>}
                 <p className="text-[0.9em] text-slate-700 leading-[var(--line-height)]">{proj.description}</p>
               </div>
             ))}
           </div>
        </section>
      ) : null;
    
    case 'custom':
      return resume.customSections?.map(section => (
         <section key={section.id} className="mb-[var(--gap)]">
            <h2 className="text-[0.9em] font-bold uppercase tracking-widest text-slate-400 mb-[0.8em] border-b border-slate-200 pb-1">{section.title}</h2>
            <div className="space-y-[0.8em]">
               {section.items.map(item => (
                  <div key={item.id}>
                     <div className="flex justify-between font-bold text-[1em]">
                        <span>{item.title}</span>
                        {item.date && <span className="text-[0.9em] font-normal text-slate-500">{item.date}</span>}
                     </div>
                     {item.subtitle && <div className="text-[0.9em] italic text-slate-600 mb-[0.2em]">{item.subtitle}</div>}
                     {item.description && <p className="text-[0.9em] text-slate-700 leading-[var(--line-height)]">{item.description}</p>}
                  </div>
               ))}
            </div>
         </section>
      ));

    default: return null;
  }
};

// ---------------------------
// TEMPLATE COMPOSERS
// ---------------------------

const TitaniumTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
  const order = resume.sectionOrder || INITIAL_SECTION_ORDER;
  return (
    <div className="h-full w-full bg-white text-black p-[var(--margin)]" style={{ fontFamily: 'var(--font-family)' }}>
      {/* Titanium has a specific header layout */}
      <header className="border-b-2 border-black pb-[1em] mb-[var(--gap)] flex items-center gap-[2em]">
        {resume.personalInfo.photo && (
           <img src={resume.personalInfo.photo} className="w-[100px] h-[100px] object-cover rounded-full border border-slate-200" alt="Profile" />
        )}
        <div className="flex-1">
          <h1 className="text-[2.5em] font-bold uppercase tracking-wide leading-tight mb-[0.2em]">{resume.personalInfo.fullName}</h1>
          <p className="text-[1.2em] text-slate-600 mb-[0.5em]">{resume.title}</p>
          <div className="text-[0.9em] font-medium flex flex-wrap gap-[1em]">
            {resume.personalInfo.location && <span>{resume.personalInfo.location}</span>}
            {resume.personalInfo.email && <span>| {resume.personalInfo.email}</span>}
            {resume.personalInfo.phone && <span>| {resume.personalInfo.phone}</span>}
            {resume.personalInfo.linkedin && <span>| LinkedIn</span>}
          </div>
        </div>
      </header>
      {order.filter(id => id !== 'personal').map(sectionId => renderSection(sectionId, resume))}
    </div>
  );
};

const SanFranciscoTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
  const order = resume.sectionOrder || INITIAL_SECTION_ORDER;
  return (
    <div className="h-full w-full bg-white text-slate-800 p-[var(--margin)]" style={{ fontFamily: 'var(--font-family)' }}>
      <header className="mb-[var(--gap)] flex items-start justify-between border-b pb-[1.5em]" style={{ borderColor: 'var(--primary)' }}>
         <div>
            <h1 className="text-[2.8em] font-bold uppercase tracking-tight leading-none mb-[0.2em]" style={{ color: 'var(--primary)' }}>
              {resume.personalInfo.fullName}
            </h1>
            <p className="text-[1.2em] text-slate-500 font-medium mb-[0.8em]">{resume.title}</p>
            <div className="flex flex-wrap gap-[1em] text-[0.9em] text-slate-600">
              {resume.personalInfo.email && <div className="flex items-center gap-1"><Mail size={12} /> {resume.personalInfo.email}</div>}
              {resume.personalInfo.phone && <div className="flex items-center gap-1"><Phone size={12} /> {resume.personalInfo.phone}</div>}
              {resume.personalInfo.location && <div className="flex items-center gap-1"><MapPin size={12} /> {resume.personalInfo.location}</div>}
            </div>
         </div>
         {resume.personalInfo.photo && (
            <img src={resume.personalInfo.photo} className="w-[120px] h-[120px] object-cover rounded-xl shadow-sm" alt="Profile" />
         )}
      </header>
      {order.filter(id => id !== 'personal').map(sectionId => renderSection(sectionId, resume))}
    </div>
  );
};

const DubaiTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
  // Sidebar style layout
  return (
    <div className="h-full w-full bg-white text-slate-900 flex" style={{ fontFamily: 'var(--font-family)' }}>
       <div className="w-[35%] bg-slate-50 p-[var(--margin)] border-r border-slate-200 h-full">
          {resume.personalInfo.photo && (
             <div className="mb-[2em]">
                <img src={resume.personalInfo.photo} className="w-[150px] h-[150px] object-cover rounded-full mx-auto border-4 border-white shadow-lg" alt="Profile" />
             </div>
          )}
          <h1 className="text-[2em] font-black uppercase tracking-tighter leading-none mb-[0.2em] text-center">{resume.personalInfo.fullName}</h1>
          <p className="text-[1em] text-center text-slate-500 mb-[2em] font-bold">{resume.title}</p>
          
          <div className="space-y-[0.5em] text-[0.9em] mb-[3em] text-center">
             <div>{resume.personalInfo.email}</div>
             <div>{resume.personalInfo.phone}</div>
             <div>{resume.personalInfo.location}</div>
          </div>

          {/* Render Skills and Education in sidebar usually, but dynamic order makes this tricky. 
              For "Dubai", we force Skills/Education to sidebar if they exist. 
          */}
          <div className="text-left">
             {renderSection('education', resume)}
             {renderSection('skills', resume)}
          </div>
       </div>
       <div className="flex-1 p-[var(--margin)]">
          {renderSection('summary', resume)}
          {renderSection('experience', resume)}
          {renderSection('projects', resume)}
          {renderSection('custom', resume)}
       </div>
    </div>
  );
};

// ---------------------------
// MAIN WRAPPER
// ---------------------------

export const ResumePreview: React.FC<ResumePreviewProps> = ({ resume }) => {
  const [zoom, setZoom] = useState(1);
  const styles = getStyleVars(resume);
  
  // Font Size scaling is applied to the root font-size of the container
  const containerStyle = {
    ...styles,
    fontSize: `${resume.layout?.fontSize || 1}rem`
  };

  const getTemplate = () => {
    switch(resume.template) {
      case 'titanium': return <TitaniumTemplate resume={resume} />;
      case 'dubai': return <DubaiTemplate resume={resume} />;
      default: return <SanFranciscoTemplate resume={resume} />;
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center bg-slate-800/50 backdrop-blur-sm p-8 overflow-hidden rounded-xl">
       {/* Toolbar */}
       <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-900/90 text-white rounded-full px-4 py-2 flex items-center gap-4 shadow-xl z-50 border border-slate-700">
          <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} className="hover:text-blue-400"><ZoomOut size={18}/></button>
          <span className="text-xs font-mono w-12 text-center">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(z => Math.min(1.5, z + 0.1))} className="hover:text-blue-400"><ZoomIn size={18}/></button>
          <div className="w-px h-4 bg-slate-700"></div>
          <button onClick={() => setZoom(1)} className="hover:text-blue-400" title="Reset"><Maximize2 size={16}/></button>
       </div>

       {/* Scalable Container */}
       <div 
         className="bg-white shadow-2xl transition-transform duration-200 ease-out origin-top print:transform-none print:shadow-none print:w-full print:absolute print:top-0 print:left-0"
         style={{
           width: '210mm', // A4 Width
           minHeight: '297mm', // A4 Height
           transform: `scale(${zoom})`,
           ...containerStyle
         }}
       >
         {getTemplate()}
       </div>
    </div>
  );
};
