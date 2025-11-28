
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Resume } from '../types';
import { getResumeById, saveResume } from '../services/storage';
import { EditorLayout } from '../components/EditorLayout';
import { ResumePreview } from '../components/resume/ResumePreview';
import { ATSViewer } from '../components/resume/ATSViewer';
import { AIAssistant } from '../components/resume/AIAssistant';
import { Button } from '../components/ui/Button';
import { 
  Palette, Layout, FileText, Eye, FileCode, Activity, PenTool, Sliders, Layers
} from '../components/ui/Icons';
import { THEME_COLORS, TEMPLATES, INITIAL_LAYOUT, INITIAL_SECTION_ORDER } from '../constants';
import { Loader2 } from '../components/ui/Icons';

// Modular Editors
import { PersonalInfoEditor } from '../components/editor/PersonalInfoEditor';
import { ExperienceEditor } from '../components/editor/ExperienceEditor';
import { EducationEditor } from '../components/editor/EducationEditor';
import { SkillsEditor } from '../components/editor/SkillsEditor';
import { ProjectsEditor } from '../components/editor/ProjectsEditor';
import { LayoutEditor } from '../components/editor/LayoutEditor';
import { SectionReorder } from '../components/editor/SectionReorder';
import { CustomSectionEditor } from '../components/editor/CustomSectionEditor';
import { CoverLetterGenerator } from '../components/features/CoverLetterGenerator';

const Editor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [resume, setResume] = useState<Resume | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isAIAnalysisOpen, setIsAIAnalysisOpen] = useState(false);
  const [isCoverLetterOpen, setIsCoverLetterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'design'>('content');
  const [viewMode, setViewMode] = useState<'visual' | 'ats'>('visual');
  
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    personal: true,
    experience: true,
    education: true,
    skills: true,
    projects: false,
    custom: false
  });

  // Calculate Score
  const calculateScore = (r: Resume) => {
    let score = 0;
    if (r.personalInfo.fullName) score += 10;
    if (r.personalInfo.email) score += 5;
    if (r.personalInfo.summary && r.personalInfo.summary.length > 50) score += 15;
    if (r.workExperience.length > 0) score += 20;
    if (r.workExperience.length > 1) score += 10;
    if (r.education.length > 0) score += 10;
    if (r.skills.length >= 5) score += 15;
    if (r.projects && r.projects.length > 0) score += 15;
    return Math.min(100, score);
  };
  
  const resumeScore = resume ? calculateScore(resume) : 0;

  useEffect(() => {
    if (id) {
      const data = getResumeById(id);
      if (data) {
        // Initialize defaults for new fields
        if (!data.themeColor) data.themeColor = '#2563eb';
        if (!data.template) data.template = 'titanium';
        if (!data.projects) data.projects = [];
        if (!data.layout) data.layout = INITIAL_LAYOUT;
        if (!data.sectionOrder) data.sectionOrder = INITIAL_SECTION_ORDER;
        if (!data.customSections) data.customSections = [];
        setResume(data);
      } else {
        navigate('/');
      }
    }
  }, [id, navigate]);

  const handleSave = useCallback(() => {
    if (resume) {
      setIsSaving(true);
      saveResume(resume);
      setTimeout(() => setIsSaving(false), 500);
    }
  }, [resume]);

  useEffect(() => {
    const interval = setInterval(handleSave, 30000);
    return () => clearInterval(interval);
  }, [handleSave]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleChange = (section: keyof Resume, value: any) => {
    if (!resume) return;
    setResume({ ...resume, [section]: value });
  };

  const handlePersonalInfoChange = (field: string, value: string) => {
    if (!resume) return;
    setResume({
      ...resume,
      personalInfo: { ...resume.personalInfo, [field]: value }
    });
  };

  if (!resume) return <div className="flex h-screen items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-blue-600" size={40}/></div>;

  return (
    <EditorLayout 
      title={resume.title} 
      isSaving={isSaving} 
      onSave={handleSave} 
      onExport={() => window.print()}
      onToggleAI={() => setIsAIAnalysisOpen(true)}
    >
      <div className="flex h-full flex-col lg:flex-row relative">
        
        {/* LEFT PANEL: Sidebar */}
        <div className="w-full lg:w-[480px] flex-shrink-0 h-full overflow-y-auto bg-slate-50 border-r border-slate-200 p-0 no-print flex flex-col z-20 shadow-xl">
          
          {/* Resume Score */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Activity size={100} />
             </div>
             <div className="flex justify-between items-end mb-3 relative z-10">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Resume Strength</div>
                <div className="text-2xl font-bold flex items-center gap-2">
                   <span className={resumeScore >= 90 ? "text-green-400" : "text-yellow-400"}>{resumeScore}%</span>
                </div>
             </div>
             <div className="w-full bg-slate-700/50 h-2 rounded-full overflow-hidden mb-4 relative z-10">
                <div 
                   className={`h-full transition-all duration-1000 ${resumeScore >= 90 ? 'bg-green-500' : 'bg-blue-500'}`} 
                   style={{ width: `${resumeScore}%` }}
                ></div>
             </div>
             <Button 
               size="sm" 
               className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
               onClick={() => setIsCoverLetterOpen(true)}
               leftIcon={<PenTool size={14} />}
             >
               Write Cover Letter
             </Button>
          </div>

          {/* Sidebar Tabs */}
          <div className="flex border-b border-slate-200 bg-white sticky top-0 z-20 shadow-sm">
            <button 
              onClick={() => setActiveTab('content')}
              className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all ${activeTab === 'content' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
            >
              <FileText size={16} /> Content
            </button>
            <button 
               onClick={() => setActiveTab('design')}
               className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all ${activeTab === 'design' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
            >
               <Layout size={16} /> Design
            </button>
          </div>

          <div className="p-6 pb-20 space-y-6 flex-1 overflow-y-auto bg-slate-50/50">
            {activeTab === 'design' && (
               <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                  
                  {/* Template Selector */}
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                      <Layout size={14} /> Templates
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                       {TEMPLATES.map(t => (
                         <button
                           key={t.id}
                           onClick={() => handleChange('template', t.id)}
                           className={`p-3 rounded-lg border-2 text-left transition-all relative overflow-hidden group ${resume.template === t.id ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'}`}
                         >
                            {t.id === 'titanium' && <div className="absolute top-0 right-0 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded-bl font-bold">ATS</div>}
                            <div className="font-bold text-sm text-slate-800">{t.name}</div>
                            <div className="text-xs text-slate-500 mt-1 opacity-70 group-hover:opacity-100">{t.desc}</div>
                         </button>
                       ))}
                    </div>
                  </div>

                  {/* Layout Controls */}
                  <LayoutEditor 
                    settings={resume.layout} 
                    onChange={(newLayout) => handleChange('layout', newLayout)} 
                  />

                  {/* Section Order */}
                  <SectionReorder 
                    order={resume.sectionOrder}
                    onChange={(newOrder) => handleChange('sectionOrder', newOrder)}
                  />

                  {/* Color Picker */}
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                       <Palette size={14} /> Color Theme
                    </h3>
                    <div className="flex flex-wrap gap-3">
                       {THEME_COLORS.map(color => (
                         <button
                           key={color.value}
                           onClick={() => handleChange('themeColor', color.value)}
                           className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none shadow-sm ${resume.themeColor === color.value ? 'border-slate-800 ring-2 ring-slate-200 scale-110' : 'border-white'}`}
                           style={{ background: color.value }}
                           title={color.name}
                         />
                       ))}
                    </div>
                  </div>
               </div>
            )}

            {activeTab === 'content' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <PersonalInfoEditor 
                  data={resume.personalInfo} 
                  onChange={handlePersonalInfoChange} 
                  fullResumeContext={{ ...resume, updateTitle: (t: string) => handleChange('title', t) }}
                  isOpen={expandedSections['personal']}
                  onToggle={() => toggleSection('personal')}
                />
                
                <ExperienceEditor 
                  items={resume.workExperience} 
                  onChange={(items) => handleChange('workExperience', items)} 
                  isOpen={expandedSections['experience']}
                  onToggle={() => toggleSection('experience')}
                />

                <ProjectsEditor 
                  items={resume.projects}
                  onChange={(items) => handleChange('projects', items)}
                  isOpen={expandedSections['projects']}
                  onToggle={() => toggleSection('projects')}
                />

                <EducationEditor 
                  items={resume.education} 
                  onChange={(items) => handleChange('education', items)} 
                  isOpen={expandedSections['education']}
                  onToggle={() => toggleSection('education')}
                />

                <SkillsEditor 
                  items={resume.skills} 
                  onChange={(items) => handleChange('skills', items)} 
                  isOpen={expandedSections['skills']}
                  onToggle={() => toggleSection('skills')}
                />

                <CustomSectionEditor 
                  sections={resume.customSections}
                  onChange={(items) => handleChange('customSections', items)}
                  isOpen={expandedSections['custom']}
                  onToggle={() => toggleSection('custom')}
                />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: Live Preview / ATS Viewer */}
        <div className="hidden lg:flex flex-1 h-full bg-slate-900/95 flex-col overflow-hidden relative">
           {/* View Toggle Bar */}
           <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-30 bg-black/40 backdrop-blur-md rounded-full p-1 shadow-2xl border border-white/10 flex gap-1">
              <button 
                onClick={() => setViewMode('visual')}
                className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold transition-all ${viewMode === 'visual' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                <Eye size={14} /> Visual
              </button>
              <button 
                onClick={() => setViewMode('ats')}
                className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold transition-all ${viewMode === 'ats' ? 'bg-green-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                <FileCode size={14} /> ATS X-Ray
              </button>
           </div>
           
           <div className="flex-1 overflow-hidden relative">
             {viewMode === 'visual' ? (
                <div className="w-full h-full flex items-center justify-center p-8">
                   <ResumePreview resume={resume} />
                </div>
             ) : (
                <div className="w-full h-full p-8 pt-24">
                  <div className="bg-slate-900 shadow-2xl h-full border border-green-900 rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                     <ATSViewer resume={resume} />
                  </div>
                </div>
             )}
           </div>
        </div>
      </div>
      
      {/* Modals */}
      <AIAssistant 
        resume={resume} 
        isOpen={isAIAnalysisOpen} 
        onClose={() => setIsAIAnalysisOpen(false)}
        onApplyChanges={(text) => handlePersonalInfoChange('summary', text)}
      />
      
      <CoverLetterGenerator
         isOpen={isCoverLetterOpen}
         onClose={() => setIsCoverLetterOpen(false)}
         resume={resume}
      />
    </EditorLayout>
  );
};

export default Editor;
