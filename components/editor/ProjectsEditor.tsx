import React from 'react';
import { Project } from '../../types';
import { Input, TextArea } from '../ui/Input';
import { Button } from '../ui/Button';
import { Plus, Trash2, ChevronDown, ChevronUp, Layers, Github } from '../ui/Icons';
import { Card, CardContent } from '../ui/Card';

interface Props {
  items: Project[];
  onChange: (items: Project[]) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const ProjectsEditor: React.FC<Props> = ({ items, onChange, isOpen, onToggle }) => {
  const addItem = () => {
    onChange([...items, {
      id: crypto.randomUUID(),
      name: '', description: '', link: '', technologies: ''
    }]);
  };

  const updateItem = (id: string, field: keyof Project, value: any) => {
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
              <Layers size={16} />
            </span>
            Projects
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
              
              <div className="space-y-4">
                <Input label="Project Name" value={item.name} onChange={(e) => updateItem(item.id, 'name', e.target.value)} />
                <div className="grid grid-cols-2 gap-4">
                   <Input label="Technologies" value={item.technologies} onChange={(e) => updateItem(item.id, 'technologies', e.target.value)} placeholder="React, Node.js..." />
                   <Input label="Link / URL" value={item.link} onChange={(e) => updateItem(item.id, 'link', e.target.value)} />
                </div>
                <TextArea label="Description" value={item.description} onChange={(e) => updateItem(item.id, 'description', e.target.value)} className="h-20" />
              </div>
            </div>
          ))}
          
          {items.length === 0 && (
            <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-xl">
               <p className="text-slate-500 text-sm mb-2">Showcase your side projects.</p>
               <Button size="sm" variant="ghost" onClick={addItem}>Add Project</Button>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};