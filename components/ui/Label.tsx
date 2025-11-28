import React from 'react';

export const Label: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <label className={`block text-xs font-bold uppercase text-slate-500 mb-1.5 tracking-wide ${className}`}>
    {children}
  </label>
);