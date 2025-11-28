import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className="w-full">
      {label && <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 tracking-wide">{label}</label>}
      <input
        ref={ref}
        className={`
          w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 
          focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all
          disabled:bg-slate-50 disabled:text-slate-400
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});

export const TextArea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }>(({ label, className = '', ...props }, ref) => {
  return (
    <div className="w-full">
      {label && <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 tracking-wide">{label}</label>}
      <textarea
        ref={ref}
        className={`
          w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 
          focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all
          ${className}
        `}
        {...props}
      />
    </div>
  );
});