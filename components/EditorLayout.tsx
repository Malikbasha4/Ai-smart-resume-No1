import React, { ReactNode } from 'react';
import { ArrowLeft, Save, Download, Wand2 } from './ui/Icons';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

interface EditorLayoutProps {
  children: ReactNode;
  title: string;
  isSaving?: boolean;
  onSave: () => void;
  onExport: () => void;
  onToggleAI: () => void;
}

export const EditorLayout: React.FC<EditorLayoutProps> = ({ 
  children, title, isSaving, onSave, onExport, onToggleAI 
}) => {
  return (
    <div className="flex flex-col h-screen bg-slate-100 no-print">
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-slate-500 hover:text-slate-700">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-semibold text-slate-800 text-lg hidden sm:block">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-2">
           <Button 
            variant="outline" 
            size="sm" 
            onClick={onToggleAI}
            leftIcon={<Wand2 size={16} />}
            className="hidden sm:inline-flex"
          >
            AI Assistant
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onSave}
            isLoading={isSaving}
            leftIcon={<Save size={16} />}
          >
            Save
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={onExport}
            leftIcon={<Download size={16} />}
          >
            Export PDF
          </Button>
        </div>
      </header>
      
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
};