
import React from 'react';
import { CustomSection, CustomSectionItem } from '../../types';
import { Input, TextArea } from '../ui/Input';
import { Button } from '../ui/Button';
import { Plus, Trash2, ChevronDown, ChevronUp, Star } from '../ui/Icons';
import { Card, CardContent } from '../ui/Card';

interface Props {
  sections: CustomSection[];
  onChange: (sections: CustomSection[]) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const CustomSectionEditor: React.FC<Props> = ({ sections, onChange, isOpen, onToggle }) => {
  const addSection = () => {
    const title = prompt("Enter section name (e.g. 'Languages', 'Awards', 'Volunteering'):");
    if (!title) return;
    
    onChange([...sections, {
      id: crypto.randomUUID(),
      title,
      items: []
    }]);
  };

  const removeSection = (id: string) => {
    if (confirm("Delete this entire section?")) {
       onChange(sections.filter(s => s.id !== id));
    }
  };

  const addItem = (sectionId: string) => {
    const newSections = sections.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          items: [...s.items, {
            id: crypto.randomUUID(),
            title: '',
            description: ''
          }]
        };
      }
      return s;
    });
    onChange(newSections);
  };

  const updateItem = (sectionId: string, itemId: string, field: keyof CustomSectionItem, value: string) => {
    const newSections = sections.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          items: s.items.map(i => i.id === itemId ? { ...i, [field]: value } : i)
        };
      }
      return s;
    });
    onChange(newSections);
  };

  const deleteItem = (sectionId: string, itemId: string) => {
    const newSections = sections.map(s => {
      if (s.id === sectionId) {
        return { ...s, items: s.items.filter(i => i.id !== itemId) };
      }
      return s;
    });
    onChange(newSections);
  };

  return (
    <Card>
      <div className="w-full px-6 py-4 flex justify-between items-center bg-slate-50 border-b border-slate-100">
        <button onClick={onToggle} className="flex items-center text-left flex-1">
          <h2 className="text-sm font-bold text-slate-800 flex items-center uppercase tracking-wide">
            <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center mr-3 shadow-blue-200 shadow-md">
              <Star size={16} />
            </span>
            Custom Sections
          </h2>
          {isOpen ? <ChevronUp size={16} className="text-slate-400 ml-2" /> : <ChevronDown size={16} className="text-slate-400 ml-2" />}
        </button>
        <Button size="sm" variant="outline" onClick={addSection} leftIcon={<Plus size={14} />}>New Section</Button>
      </div>

      {isOpen && (
        <CardContent className="space-y-6">
          {sections.map(section => (
            <div key={section.id} className="border border-slate-200 rounded-xl overflow-hidden">
               <div className="bg-slate-100 px-4 py-2 flex justify-between items-center border-b border-slate-200">
                  <span className="font-bold text-sm">{section.title}</span>
                  <div className="flex gap-2">
                     <button onClick={() => addItem(section.id)} className="text-xs text-blue-600 hover:underline">+ Add Item</button>
                     <button onClick={() => removeSection(section.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={12}/></button>
                  </div>
               </div>
               <div className="p-4 space-y-4 bg-slate-50/50">
                  {section.items.map(item => (
                    <div key={item.id} className="grid grid-cols-1 gap-2 border-b border-slate-200 pb-4 last:border-0 last:pb-0 relative">
                       <button onClick={() => deleteItem(section.id, item.id)} className="absolute top-0 right-0 text-slate-300 hover:text-red-400"><Trash2 size={12}/></button>
                       <Input 
                         placeholder="Title (e.g. 'Spanish', 'Employee of the Month')" 
                         value={item.title} 
                         onChange={(e) => updateItem(section.id, item.id, 'title', e.target.value)} 
                       />
                       <div className="grid grid-cols-2 gap-2">
                          <Input 
                            placeholder="Subtitle (Optional)" 
                            value={item.subtitle || ''} 
                            onChange={(e) => updateItem(section.id, item.id, 'subtitle', e.target.value)} 
                          />
                          <Input 
                            placeholder="Date (Optional)" 
                            value={item.date || ''} 
                            onChange={(e) => updateItem(section.id, item.id, 'date', e.target.value)} 
                          />
                       </div>
                       <TextArea 
                          placeholder="Description (Optional)"
                          value={item.description}
                          onChange={(e) => updateItem(section.id, item.id, 'description', e.target.value)}
                          className="h-16"
                       />
                    </div>
                  ))}
                  {section.items.length === 0 && <p className="text-xs text-slate-400 italic text-center">No items. Click Add Item.</p>}
               </div>
            </div>
          ))}
          {sections.length === 0 && (
            <div className="text-center py-6 text-slate-400 text-sm">
               Add sections like Languages, Awards, or Volunteering.
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};
