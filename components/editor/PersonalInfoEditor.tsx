
import React, { useState, useRef } from 'react';
import { PersonalInfo } from '../../types';
import { Input, TextArea } from '../ui/Input';
import { Button } from '../ui/Button';
import { Wand2, Loader2, ChevronDown, ChevronUp, User, Image, Trash2 } from '../ui/Icons';
import { generateSummary } from '../../services/geminiService';
import { Card, CardContent } from '../ui/Card';

interface Props {
  data: PersonalInfo;
  onChange: (field: string, value: string) => void;
  fullResumeContext: any;
  isOpen: boolean;
  onToggle: () => void;
}

export const PersonalInfoEditor: React.FC<Props> = ({ data, onChange, fullResumeContext, isOpen, onToggle }) => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAutoSummary = async () => {
    setLoading(true);
    try {
      const summary = await generateSummary(fullResumeContext);
      onChange('summary', summary);
    } catch (e) {
      alert("Failed to generate summary");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange('photo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <div 
        onClick={onToggle}
        className="w-full px-6 py-4 flex justify-between items-center bg-slate-50 border-b border-slate-100 hover:bg-slate-100 transition-colors cursor-pointer"
      >
        <h2 className="text-sm font-bold text-slate-800 flex items-center uppercase tracking-wide">
          <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center mr-3 shadow-blue-200 shadow-md">
            <User size={16} />
          </span>
          Personal Details
        </h2>
        {isOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
      </div>
      
      {isOpen && (
        <CardContent className="space-y-6">
          {/* Photo Upload */}
          <div className="flex items-center gap-6 pb-4 border-b border-slate-100">
             <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden border-2 border-slate-200">
               {data.photo ? (
                 <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
               ) : (
                 <User size={32} className="text-slate-300" />
               )}
             </div>
             <div>
               <h3 className="text-sm font-bold text-slate-700 mb-1">Profile Photo</h3>
               <div className="flex gap-2">
                 <button 
                   onClick={() => fileInputRef.current?.click()}
                   className="text-xs bg-white border border-slate-300 px-3 py-1.5 rounded hover:bg-slate-50 font-medium transition-colors"
                 >
                   Upload Image
                 </button>
                 {data.photo && (
                   <button 
                     onClick={() => onChange('photo', '')}
                     className="text-xs text-red-500 hover:bg-red-50 px-2 py-1.5 rounded"
                   >
                     Remove
                   </button>
                 )}
               </div>
               <input 
                 type="file" 
                 ref={fileInputRef} 
                 className="hidden" 
                 accept="image/*"
                 onChange={handleImageUpload}
               />
               <p className="text-[10px] text-slate-400 mt-1">Recommended: Square JPG/PNG, Max 2MB</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Full Name" value={data.fullName} onChange={(e) => onChange('fullName', e.target.value)} />
            <Input label="Job Title" value={fullResumeContext.title} onChange={(e) => fullResumeContext.updateTitle(e.target.value)} placeholder="e.g. Senior Software Engineer" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Email" value={data.email} onChange={(e) => onChange('email', e.target.value)} />
            <Input label="Phone" value={data.phone} onChange={(e) => onChange('phone', e.target.value)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Location" value={data.location} onChange={(e) => onChange('location', e.target.value)} />
            <Input label="LinkedIn" value={data.linkedin} onChange={(e) => onChange('linkedin', e.target.value)} />
          </div>

          <div className="pt-2">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase text-slate-500 tracking-wide">Professional Summary</label>
              <Button size="sm" variant="ghost" onClick={handleAutoSummary} disabled={loading} className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                {loading ? <Loader2 size={12} className="animate-spin mr-1" /> : <Wand2 size={12} className="mr-1" />}
                Auto-Write with AI
              </Button>
            </div>
            <TextArea 
              className="h-32 resize-none" 
              placeholder="Brief summary of your career achievements..." 
              value={data.summary} 
              onChange={(e) => onChange('summary', e.target.value)}
            />
          </div>
        </CardContent>
      )}
    </Card>
  );
};
