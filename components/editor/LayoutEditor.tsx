
import React from 'react';
import { LayoutSettings } from '../../types';
import { Slider } from '../ui/Slider';
import { Card, CardContent } from '../ui/Card';
import { Sliders } from '../ui/Icons';

interface Props {
  settings: LayoutSettings;
  onChange: (settings: LayoutSettings) => void;
}

export const LayoutEditor: React.FC<Props> = ({ settings, onChange }) => {
  const handleChange = (key: keyof LayoutSettings, value: number) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <Card className="border-blue-100 shadow-md">
       <div className="w-full px-6 py-4 flex items-center bg-blue-50/50 border-b border-blue-100">
         <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center mr-3 shadow-md">
            <Sliders size={16} />
         </div>
         <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Layout & Typography</h2>
       </div>
       <CardContent className="space-y-6">
         <Slider 
           label="Page Margins" 
           value={settings.margin} 
           min={0} 
           max={60} 
           onChange={(v) => handleChange('margin', v)}
           formatValue={(v) => `${v}px`}
         />
         <Slider 
           label="Section Spacing" 
           value={settings.sectionGap} 
           min={10} 
           max={50} 
           onChange={(v) => handleChange('sectionGap', v)}
           formatValue={(v) => `${v}px`}
         />
         <Slider 
           label="Font Size Scale" 
           value={settings.fontSize} 
           min={0.8} 
           max={1.3} 
           step={0.05}
           onChange={(v) => handleChange('fontSize', v)}
           formatValue={(v) => `${Math.round(v * 100)}%`}
         />
         <Slider 
           label="Line Height" 
           value={settings.lineHeight} 
           min={1.0} 
           max={2.0} 
           step={0.1}
           onChange={(v) => handleChange('lineHeight', v)}
           formatValue={(v) => v.toFixed(1)}
         />
       </CardContent>
    </Card>
  );
};
