import React from 'react';
import { Education } from '../../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Plus, Trash2, ChevronDown, ChevronUp, GraduationCap } from '../ui/Icons';
import { Card, CardContent } from '../ui/Card';

interface Props {
  items: Education[];
  onChange: (items: Education[]) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const EducationEditor: React.FC<Props> = ({ items, onChange, isOpen, onToggle }) => {
  const addItem = () => {
    onChange([...items, {
      id: crypto.randomUUID(),
      school: '', degree: '', field: '', startDate: '', endDate: '', current: false
    }]);
  };

  const updateItem = (id: string, field: keyof Education, value: any) => {
    onChange(items.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const deleteItem = (id: string) => {
    onChange(items.filter(i => i.id !== id));
  };

  return (
    <Card>
      <div className="w-full px-6 py-4 flex justify-between items-center bg-slate-50 border-b border-slate-100">
        <button onClick={onToggle} className="flex items-center text-left flex-1">
          <h2 className="text-sm font-bold text-slate-800 flex items-center uppercase tracking-wide">
            <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center mr-3 shadow-blue-200 shadow-md">
              <GraduationCap size={16} />
            </span>
            Education
          </h2>
          {isOpen ? <ChevronUp size={16} className="text-slate-400 ml-2" /> : <ChevronDown size={16} className="text-slate-400 ml-2" />}
        </button>
        <Button size="sm" variant="outline" onClick={addItem} leftIcon={<Plus size={14} />}>Add</Button>
      </div>

      {isOpen && (
        <CardContent className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id} className="p-4 bg-slate-50/50 rounded-xl border border-slate-200 relative">
              <button onClick={() => deleteItem(item.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
              
              <div className="grid grid-cols-1 gap-4 mb-4">
                <Input label="School / University" value={item.school} onChange={(e) => updateItem(item.id, 'school', e.target.value)} />
                <div className="grid grid-cols-2 gap-4">
                   <Input label="Degree" value={item.degree} onChange={(e) => updateItem(item.id, 'degree', e.target.value)} placeholder="e.g. BS, MA" />
                   <Input label="Field of Study" value={item.field} onChange={(e) => updateItem(item.id, 'field', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <Input label="Start Date" type="date" value={item.startDate} onChange={(e) => updateItem(item.id, 'startDate', e.target.value)} />
                   <Input label="End Date" type="date" value={item.endDate} onChange={(e) => updateItem(item.id, 'endDate', e.target.value)} />
                </div>
              </div>
            </div>
          ))}
          
          {items.length === 0 && (
            <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-xl">
               <p className="text-slate-500 text-sm mb-2">No education listed.</p>
               <Button size="sm" variant="ghost" onClick={addItem}>Add Education</Button>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};