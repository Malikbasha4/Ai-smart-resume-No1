import React from 'react';
import { Skill } from '../../types';
import { Button } from '../ui/Button';
import { Trash2, ChevronDown, ChevronUp, Zap } from '../ui/Icons';
import { Card, CardContent } from '../ui/Card';

interface Props {
  items: Skill[];
  onChange: (items: Skill[]) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const SkillsEditor: React.FC<Props> = ({ items, onChange, isOpen, onToggle }) => {
  const addSkill = (name: string) => {
    if (!name.trim()) return;
    onChange([...items, { id: crypto.randomUUID(), name, level: 'Intermediate' }]);
  };

  const removeSkill = (id: string) => {
    onChange(items.filter(i => i.id !== id));
  };

  return (
    <Card>
      <div className="w-full px-6 py-4 flex justify-between items-center bg-slate-50 border-b border-slate-100">
        <button onClick={onToggle} className="flex items-center text-left flex-1">
          <h2 className="text-sm font-bold text-slate-800 flex items-center uppercase tracking-wide">
            <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center mr-3 shadow-blue-200 shadow-md">
              <Zap size={16} />
            </span>
            Skills & Expertise
          </h2>
          {isOpen ? <ChevronUp size={16} className="text-slate-400 ml-2" /> : <ChevronDown size={16} className="text-slate-400 ml-2" />}
        </button>
      </div>

      {isOpen && (
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {items.map(skill => (
              <span key={skill.id} className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-white border border-slate-200 text-slate-700 shadow-sm animate-in fade-in zoom-in duration-200">
                {skill.name}
                <button onClick={() => removeSkill(skill.id)} className="ml-2 text-slate-400 hover:text-red-500 transition-colors">
                  <Trash2 size={12} />
                </button>
              </span>
            ))}
            {items.length === 0 && <span className="text-slate-400 text-sm italic py-1">No skills added yet. Type below to add.</span>}
          </div>
          <input 
            type="text" 
            placeholder="Type a skill and press Enter (e.g. Python, Leadership)" 
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addSkill(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
          />
        </CardContent>
      )}
    </Card>
  );
};