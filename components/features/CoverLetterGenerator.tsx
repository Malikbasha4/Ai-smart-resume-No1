import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { TextArea } from '../ui/Input';
import { Resume } from '../../types';
import { generateCoverLetter } from '../../services/geminiService';
import { Wand2, Loader2, Copy, Check } from '../ui/Icons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  resume: Resume;
}

export const CoverLetterGenerator: React.FC<Props> = ({ isOpen, onClose, resume }) => {
  const [jobDesc, setJobDesc] = useState('');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!jobDesc) return;
    setIsGenerating(true);
    try {
      const letter = await generateCoverLetter(resume, jobDesc);
      setGeneratedLetter(letter);
    } catch (error) {
      alert("Failed to generate cover letter");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Cover Letter Writer" size="lg">
      <div className="p-6 space-y-6">
        {!generatedLetter ? (
          <>
            <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 border border-blue-100">
               Paste the job description below, and our AI will write a tailored cover letter highlighting your matching skills and experience.
            </div>
            <TextArea 
              label="Job Description" 
              className="h-48"
              placeholder="Paste job posting here..."
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
            />
            <Button onClick={handleGenerate} disabled={!jobDesc || isGenerating} className="w-full">
               {isGenerating ? <Loader2 className="animate-spin mr-2"/> : <Wand2 className="mr-2"/>}
               Generate Cover Letter
            </Button>
          </>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4">
             <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-slate-800">Your Cover Letter</h3>
                <div className="flex gap-2">
                   <Button size="sm" variant="outline" onClick={() => setGeneratedLetter('')}>Rewrite</Button>
                   <Button size="sm" onClick={handleCopy}>
                      {copied ? <Check size={14} className="mr-1"/> : <Copy size={14} className="mr-1"/>}
                      {copied ? 'Copied' : 'Copy Text'}
                   </Button>
                </div>
             </div>
             <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 whitespace-pre-wrap text-sm leading-relaxed text-slate-800 font-serif shadow-inner h-96 overflow-y-auto">
                {generatedLetter}
             </div>
          </div>
        )}
      </div>
    </Modal>
  );
};