import React, { useState } from 'react';
import { Wand2, X, Check, Loader2, Target, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { Resume } from '../../types';
import { analyzeJobFit, optimizeContent } from '../../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface AIAssistantProps {
  resume: Resume;
  onApplyChanges: (text: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ resume, isOpen, onClose, onApplyChanges }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [optimizedSummary, setOptimizedSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'analyze' | 'optimize'>('analyze');

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;
    
    setIsLoading(true);
    try {
      const result = await analyzeJobFit(resume, jobDescription);
      setAnalysis(result);
    } catch (error) {
      setAnalysis("Error analyzing job description. Please check your API key.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptimizeSummary = async () => {
     if (!jobDescription.trim() || !resume.personalInfo.summary) return;
     setIsLoading(true);
     try {
        const result = await optimizeContent(resume.personalInfo.summary, jobDescription);
        setOptimizedSummary(result);
     } catch (error) {
        setOptimizedSummary("Error optimizing content.");
     } finally {
        setIsLoading(false);
     }
  };

  const applySummary = () => {
     if (optimizedSummary) {
        onApplyChanges(optimizedSummary);
        setOptimizedSummary(null);
        alert("Summary updated!");
     }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[500px] bg-white shadow-2xl transform transition-transform duration-300 z-50 flex flex-col border-l border-slate-200">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-blue-600 text-white">
        <h2 className="font-bold flex items-center text-lg">
          <Wand2 className="w-5 h-5 mr-2" />
          AI Job Architect
        </h2>
        <button onClick={onClose} className="text-blue-100 hover:text-white">
          <X size={24} />
        </button>
      </div>
      
      <div className="flex border-b border-slate-200">
         <button 
           onClick={() => setActiveTab('analyze')}
           className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider ${activeTab === 'analyze' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-slate-500'}`}
         >
           Match Analysis
         </button>
         <button 
           onClick={() => setActiveTab('optimize')}
           className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider ${activeTab === 'optimize' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-slate-500'}`}
         >
           Target & Rewrite
         </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center">
            <Target size={16} className="mr-2 text-blue-600"/>
            Target Job Description
          </label>
          <textarea
            className="w-full h-40 p-4 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
            placeholder="Paste the full job posting here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        {activeTab === 'analyze' && (
           <div className="space-y-4">
              <Button 
                onClick={handleAnalyze} 
                isLoading={isLoading} 
                disabled={!jobDescription.trim()}
                className="w-full py-3 text-base"
              >
                Scan Match Score
              </Button>

              {analysis && (
                <div className="mt-4 p-5 bg-slate-50 rounded-xl border border-slate-200 shadow-inner">
                  <div className="prose prose-sm prose-slate max-w-none">
                     <ReactMarkdown>{analysis}</ReactMarkdown>
                  </div>
                </div>
              )}
           </div>
        )}

        {activeTab === 'optimize' && (
           <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                 <h3 className="text-purple-900 font-bold mb-2 flex items-center">
                    <Sparkles size={16} className="mr-2"/>
                    Smart Rewriter
                 </h3>
                 <p className="text-sm text-purple-700 mb-4">
                    AI will rewrite your Professional Summary to perfectly align with the keywords in the job description above.
                 </p>
                 <Button 
                   onClick={handleOptimizeSummary} 
                   isLoading={isLoading} 
                   disabled={!jobDescription.trim()}
                   className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                 >
                   Rewrite Summary for This Job
                 </Button>
              </div>

              {optimizedSummary && (
                <div className="p-4 bg-white rounded-xl border-2 border-green-400 shadow-lg">
                  <h3 className="font-bold text-green-700 mb-2 flex items-center">
                     <Check size={16} className="mr-2"/>
                     Optimized Version
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed mb-4">{optimizedSummary}</p>
                  <Button onClick={applySummary} variant="primary" size="sm" className="w-full">
                     Use This Version
                  </Button>
                </div>
              )}
           </div>
        )}
      </div>
    </div>
  );
};