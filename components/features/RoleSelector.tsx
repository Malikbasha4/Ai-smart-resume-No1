import React from 'react';
import { Modal } from '../ui/Modal';
import { Card } from '../ui/Card';
import { ROLE_TEMPLATES, RoleTemplate } from '../../data/roleTemplates';
import { Briefcase, Code, Stethoscope, Database, Headphones, BarChart, FileText } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: RoleTemplate | null) => void;
}

const getIcon = (category: string) => {
  switch(category) {
    case 'Technology': return <Code className="text-blue-500" />;
    case 'Healthcare': return <Stethoscope className="text-red-500" />;
    case 'Data': return <Database className="text-purple-500" />;
    case 'Service': return <Headphones className="text-orange-500" />;
    case 'Business': return <BarChart className="text-green-500" />;
    default: return <Briefcase className="text-slate-500" />;
  }
};

export const RoleSelector: React.FC<Props> = ({ isOpen, onClose, onSelect }) => {
  const categories = Array.from(new Set(ROLE_TEMPLATES.map(t => t.category)));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Choose a Starting Point" size="xl">
      <div className="p-6 bg-slate-50 min-h-[500px]">
        <div className="mb-6">
           <Card 
             hoverable 
             className="bg-white border-2 border-dashed border-slate-300 flex items-center justify-center p-6 group hover:border-blue-500"
             onClick={() => onSelect(null)}
           >
              <div className="text-center">
                 <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <FileText size={24} />
                 </div>
                 <h3 className="font-bold text-slate-800">Start from Scratch</h3>
                 <p className="text-sm text-slate-500">Build a blank resume</p>
              </div>
           </Card>
        </div>

        <div className="space-y-8">
           {categories.map(category => (
             <div key={category}>
               <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 ml-1">{category} Roles</h4>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {ROLE_TEMPLATES.filter(t => t.category === category).map(template => (
                   <Card 
                     key={template.id} 
                     hoverable 
                     onClick={() => onSelect(template)}
                     className="p-4 flex items-start gap-4"
                   >
                     <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                       {getIcon(template.category)}
                     </div>
                     <div>
                       <h3 className="font-bold text-slate-800 text-sm">{template.name}</h3>
                       <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                         {template.data.personalInfo?.summary?.substring(0, 60)}...
                       </p>
                     </div>
                   </Card>
                 ))}
               </div>
             </div>
           ))}
        </div>
      </div>
    </Modal>
  );
};