import React, { useState } from 'react';
import { WorkExperience } from '../../types';
import { Input, TextArea } from '../ui/Input';
import { Button } from '../ui/Button';
import { Plus, Trash2, ChevronDown, ChevronUp, Briefcase, ListPlus, Wand2, Loader2, ArrowUp, ArrowDown } from '../ui/Icons';
import { enhanceText, generateBullets } from '../../services/geminiService';
import { Card, CardContent } from '../ui/Card';

interface Props {
  items: WorkExperience[];
  onChange: (items: WorkExperience[]) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const ExperienceEditor: React.FC<Props> = ({ items, onChange, isOpen, onToggle }) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const addItem = () => {
    const newItem: WorkExperience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    onChange([...items, newItem]);
  };

  const updateItem = (id: string, field: keyof WorkExperience, value: any) => {
    onChange(items.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const deleteItem = (id: string) => {
    onChange(items.filter(i => i.id !== id));
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...items];
    if (direction === 'up' && index > 0) {
      [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
    } else if (direction === 'down' && index < newItems.length - 1) {
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    }
    onChange(newItems);
  };

  const handleGenerateBullets = async (item: WorkExperience) => {
    if (!item.position || !item.company) return alert("Please fill in Position and Company");
    setLoadingId(item.id);
    try {
      const bullets = await generateBullets(item.position, item.company);
      const newDesc = item.description ? `${item.description}\n\n${bullets}` : bullets;
      updateItem(item.id, 'description', newDesc);
    } catch (e) {
      alert("Error generating bullets");
    } finally {
      setLoadingId(null);
    }
  };

  const handleEnhance = async (item: WorkExperience) => {
    if (!item.description) return;
    setLoadingId(item.id);
    try {
      const improved = await enhanceText(item.description);
      updateItem(item.id, 'description', improved);
    } catch (e) {
      alert("Error enhancing text");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <Card>
      <div className="w-full px-6 py-4 flex justify-between items-center bg-slate-50 border-b border-slate-100">
        <button onClick={onToggle} className="flex items-center text-left flex-1">
          <h2 className="text-sm font-bold text-slate-800 flex items-center uppercase tracking-wide">
            <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center mr-3 shadow-blue-200 shadow-md">
              <Briefcase size={16} />
            </span>
            Work Experience
          </h2>
          {isOpen ? <ChevronUp size={16} className="text-slate-400 ml-2" /> : <ChevronDown size={16} className="text-slate-400 ml-2" />}
        </button>
        <Button size="sm" variant="outline" onClick={addItem} leftIcon={<Plus size={14} />}>Add</Button>
      </div>

      {isOpen && (
        <CardContent className="space-y-6">
          {items.map((item, index) => (
            <div key={item.id} className="p-4 bg-slate-50/50 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
              <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
                 <span className="text-xs font-bold text-slate-400 uppercase">Role #{index + 1}</span>
                 <div className="flex gap-1">
                    <button onClick={() => moveItem(index, 'up')} disabled={index === 0} className="p-1.5 text-slate-400 hover:text-blue-600 disabled:opacity-30 rounded hover:bg-slate-100"><ArrowUp size={14} /></button>
                    <button onClick={() => moveItem(index, 'down')} disabled={index === items.length - 1} className="p-1.5 text-slate-400 hover:text-blue-600 disabled:opacity-30 rounded hover:bg-slate-100"><ArrowDown size={14} /></button>
                    <button onClick={() => deleteItem(item.id)} className="p-1.5 text-slate-400 hover:text-red-500 rounded hover:bg-red-50 ml-1"><Trash2 size={14} /></button>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input label="Job Title" value={item.position} onChange={(e) => updateItem(item.id, 'position', e.target.value)} />
                <Input label="Company" value={item.company} onChange={(e) => updateItem(item.id, 'company', e.target.value)} />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                 <Input label="Start Date" type="date" value={item.startDate} onChange={(e) => updateItem(item.id, 'startDate', e.target.value)} />
                 <Input label="End Date" type="date" value={item.endDate} onChange={(e) => updateItem(item.id, 'endDate', e.target.value)} disabled={item.current} />
              </div>
              <div className="mb-4">
                <label className="flex items-center space-x-2 text-sm text-slate-700 font-medium cursor-pointer">
                  <input type="checkbox" checked={item.current} onChange={(e) => updateItem(item.id, 'current', e.target.checked)} className="rounded text-blue-600 focus:ring-blue-500" />
                  <span>I currently work here</span>
                </label>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase text-slate-500 tracking-wide">Achievements</label>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" variant="ghost" className="text-purple-600 bg-purple-50 hover:bg-purple-100" 
                      onClick={() => handleGenerateBullets(item)} disabled={loadingId === item.id}
                    >
                      {loadingId === item.id ? <Loader2 size={12} className="animate-spin mr-1"/> : <ListPlus size={12} className="mr-1"/>}
                      Generate Bullets
                    </Button>
                    <Button 
                      size="sm" variant="ghost" className="text-blue-600 bg-blue-50 hover:bg-blue-100" 
                      onClick={() => handleEnhance(item)} disabled={loadingId === item.id || !item.description}
                    >
                      <Wand2 size={12} className="mr-1"/> Improve
                    </Button>
                  </div>
                </div>
                <TextArea 
                  className="h-32 font-mono text-sm leading-relaxed" 
                  value={item.description} 
                  onChange={(e) => updateItem(item.id, 'description', e.target.value)} 
                  placeholder="• Led a team of..."
                />
              </div>
            </div>
          ))}
          
          {items.length === 0 && (
            <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
               <Briefcase size={24} className="mx-auto text-slate-300 mb-2" />
               <p className="text-slate-500 text-sm">Add your work history to show your growth.</p>
               <Button size="sm" variant="outline" className="mt-4" onClick={addItem}>Add First Role</Button>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};