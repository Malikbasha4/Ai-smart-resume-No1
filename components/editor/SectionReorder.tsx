
import React from 'react';
import { Move, ArrowUp, ArrowDown } from '../ui/Icons';
import { Card, CardContent } from '../ui/Card';

interface Props {
  order: string[];
  onChange: (order: string[]) => void;
}

const SECTION_NAMES: Record<string, string> = {
  personal: 'Personal Info',
  summary: 'Professional Summary',
  experience: 'Work Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  custom: 'Custom Sections'
};

export const SectionReorder: React.FC<Props> = ({ order, onChange }) => {
  const move = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...order];
    if (direction === 'up' && index > 0) {
      [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
    } else if (direction === 'down' && index < newOrder.length - 1) {
      [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    }
    onChange(newOrder);
  };

  return (
    <Card>
      <div className="w-full px-6 py-4 flex items-center bg-slate-50 border-b border-slate-100">
         <div className="w-8 h-8 bg-slate-800 text-white rounded-lg flex items-center justify-center mr-3 shadow-md">
            <Move size={16} />
         </div>
         <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Rearrange Sections</h2>
      </div>
      <CardContent className="space-y-2">
        {order.filter(id => id !== 'personal').map((sectionId, index) => {
           // We need to adjust index because we filtered out 'personal' which should always be top (conceptually)
           // But actually, for this UI, let's just show all except Personal Info if it's fixed, or all if everything is moveable.
           // Usually Personal Info is fixed at top in most templates, but let's allow moving everything else.
           const actualIndex = order.indexOf(sectionId);
           
           return (
             <div key={sectionId} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg hover:border-blue-400 transition-colors">
               <span className="font-medium text-sm text-slate-700">{SECTION_NAMES[sectionId] || 'Custom Section'}</span>
               <div className="flex gap-1">
                 <button 
                   onClick={() => move(actualIndex, 'up')} 
                   disabled={actualIndex === 0}
                   className="p-1 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded disabled:opacity-20"
                 >
                   <ArrowUp size={14} />
                 </button>
                 <button 
                   onClick={() => move(actualIndex, 'down')} 
                   disabled={actualIndex === order.length - 1}
                   className="p-1 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded disabled:opacity-20"
                 >
                   <ArrowDown size={14} />
                 </button>
               </div>
             </div>
           );
        })}
        <p className="text-xs text-slate-400 mt-2 text-center">
          Note: Personal Info is usually fixed at the top for standard templates.
        </p>
      </CardContent>
    </Card>
  );
};
