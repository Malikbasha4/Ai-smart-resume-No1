import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Trash2, FileText, Wand2, Star, Clock } from '../components/ui/Icons';
import { Button } from '../components/ui/Button';
import { Resume } from '../types';
import { getResumes, createNewResume, deleteResume, saveResume } from '../services/storage';
import { RoleSelector } from '../components/features/RoleSelector';
import { RoleTemplate } from '../data/roleTemplates';

const Dashboard: React.FC = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isRoleSelectorOpen, setIsRoleSelectorOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setResumes(getResumes());
  }, []);

  const handleCreateClick = () => {
    setIsRoleSelectorOpen(true);
  };

  const handleTemplateSelect = (template: RoleTemplate | null) => {
    const newResume = createNewResume();
    
    if (template) {
      // Merge template data
      const mergedResume = {
        ...newResume,
        ...template.data,
        personalInfo: {
           ...newResume.personalInfo,
           ...template.data.personalInfo
        },
        id: newResume.id // Keep the new ID
      };
      saveResume(mergedResume as Resume);
    }
    
    setIsRoleSelectorOpen(false);
    navigate(`/editor/${newResume.id}`);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this resume?')) {
      deleteResume(id);
      setResumes(getResumes());
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-r from-blue-600 to-indigo-700 z-0"></div>
      
      <div className="relative z-10 p-6 sm:p-12 max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-4 text-white">
          <div>
            <h1 className="text-4xl font-bold mb-2 tracking-tight">My Resumes</h1>
            <p className="text-blue-100 text-lg opacity-90">Manage your career documents with AI-powered tools.</p>
          </div>
          <Button 
             onClick={handleCreateClick} 
             size="lg" 
             className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg border-none"
             leftIcon={<Plus size={20} />}
          >
            Create New Resume
          </Button>
        </header>

        {resumes.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-16 text-center max-w-2xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-8">
            <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <FileText size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">No resumes created yet</h3>
            <p className="text-slate-500 mb-8 max-w-md mx-auto text-lg leading-relaxed">
              Start building your professional resume with our industry-specific templates and AI assistance.
            </p>
            <Button onClick={handleCreateClick} variant="primary" size="lg" className="px-8 shadow-blue-300 shadow-lg">
              Create your first resume
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resumes.map((resume) => (
              <Link 
                to={`/editor/${resume.id}`} 
                key={resume.id}
                className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-[280px]"
              >
                <div className="h-32 bg-slate-100 flex items-center justify-center border-b border-slate-100 group-hover:bg-blue-50 transition-colors relative">
                  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                  <FileText className="text-slate-300 group-hover:text-blue-400 transition-colors transform group-hover:scale-110 duration-300" size={56} />
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-slate-500 shadow-sm border border-slate-100 uppercase tracking-wide">
                     {resume.template}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-lg text-slate-900 mb-1 truncate group-hover:text-blue-600 transition-colors">{resume.title || 'Untitled Resume'}</h3>
                  <div className="flex items-center text-xs text-slate-500 mb-4 font-medium">
                     <Clock size={12} className="mr-1"/>
                     Last edited: {new Date(resume.lastModified).toLocaleDateString()}
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <div className="flex -space-x-2">
                       {/* Mini avatars or indicators could go here */}
                    </div>
                    <button 
                      onClick={(e) => handleDelete(resume.id, e)}
                      className="text-slate-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                      title="Delete Resume"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <RoleSelector 
         isOpen={isRoleSelectorOpen} 
         onClose={() => setIsRoleSelectorOpen(false)} 
         onSelect={handleTemplateSelect} 
      />
    </div>
  );
};

export default Dashboard;