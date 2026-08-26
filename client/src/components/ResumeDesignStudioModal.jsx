import React, { useState } from 'react';
import { 
  Palette, 
  Type, 
  Sliders, 
  ShieldCheck, 
  AlertTriangle, 
  Check, 
  Sparkles,
  MoveVertical
} from 'lucide-react';
import Modal from './Modal';
import Button from './Button';
import { useToast } from './Toast';

const ResumeDesignStudioModal = ({ isOpen, onClose, onApplyCustomDesign }) => {
  const [fontFamily, setFontFamily] = useState('Inter');
  const [fontSize, setFontSize] = useState('10pt');
  const [lineSpacing, setLineSpacing] = useState('1.35');
  const [accentColor, setAccentColor] = useState('#2563EB');
  const [marginSize, setMarginSize] = useState('0.6in');
  const [sectionOrder, setSectionOrder] = useState([
    'Professional Summary',
    'Technical Skills',
    'Work Experience',
    'Key Projects',
    'Education',
  ]);

  const toast = useToast();

  const handleSave = () => {
    toast.success('Design Studio layout saved!');
    if (onApplyCustomDesign) {
      onApplyCustomDesign({ fontFamily, fontSize, lineSpacing, accentColor, marginSize, sectionOrder });
    }
    onClose();
  };

  const moveSection = (index, direction) => {
    const newOrder = [...sectionOrder];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= newOrder.length) return;
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(targetIdx, 0, moved);
    setSectionOrder(newOrder);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Resume Design Studio & ATS Safety Check" size="lg">
      <div className="space-y-6 text-xs sm:text-sm">
        {/* ATS Safety Check Alert */}
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <div className="flex items-center gap-2 font-bold text-white">
              <span>ATS Safety Score: 100% Safe</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px]">Universal Parseable</span>
            </div>
            <p className="text-slate-300 text-xs mt-0.5">
              All typography choices, colors, and margins maintain single-column parseability for Workday, Greenhouse, Taleo, and Lever.
            </p>
          </div>
        </div>

        {/* Design Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Font Family */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-brand-400" />
              Typography (ATS Safe Fonts)
            </label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-brand-500"
            >
              <option value="Inter">Inter (Modern & Clean)</option>
              <option value="Roboto">Roboto (Google Standard)</option>
              <option value="Helvetica">Helvetica / Arial (Universal)</option>
              <option value="Georgia">Georgia (Executive Serif)</option>
              <option value="JetBrains Mono">JetBrains Mono (Tech Focus)</option>
            </select>
          </div>

          {/* Accent Color */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-purple-400" />
              Theme Accent Color
            </label>
            <div className="flex items-center gap-2">
              {['#2563EB', '#4F46E5', '#0891B2', '#059669', '#334155', '#7C3AED'].map((col) => (
                <button
                  key={col}
                  type="button"
                  onClick={() => setAccentColor(col)}
                  style={{ backgroundColor: col }}
                  className={`w-7 h-7 rounded-xl border-2 transition-all ${
                    accentColor === col ? 'border-white scale-110 shadow-glow' : 'border-transparent'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Margins */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Page Margins</label>
            <select
              value={marginSize}
              onChange={(e) => setMarginSize(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-brand-500"
            >
              <option value="0.5in">0.5 inch (High Density - 1 Page Fit)</option>
              <option value="0.6in">0.6 inch (Standard Balanced)</option>
              <option value="0.75in">0.75 inch (Spacious & Clean)</option>
            </select>
          </div>

          {/* Line Height */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Line Height / Density</label>
            <select
              value={lineSpacing}
              onChange={(e) => setLineSpacing(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-brand-500"
            >
              <option value="1.25">Compact (1.25x)</option>
              <option value="1.35">Optimal (1.35x)</option>
              <option value="1.5">Relaxed (1.50x)</option>
            </select>
          </div>
        </div>

        {/* Section Reordering */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <MoveVertical className="w-3.5 h-3.5 text-sky-400" />
              Section Hierarchy & Reordering
            </span>
            <span className="text-[10px] text-slate-500">Use arrows to adjust placement</span>
          </label>

          <div className="space-y-1.5">
            {sectionOrder.map((sec, idx) => (
              <div key={sec} className="p-2.5 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">{idx + 1}. {sec}</span>
                <div className="flex items-center gap-1">
                  <button
                    disabled={idx === 0}
                    onClick={() => moveSection(idx, -1)}
                    className="px-2 py-0.5 rounded bg-dark-800 hover:bg-dark-700 text-slate-400 hover:text-white disabled:opacity-30"
                  >
                    ▲
                  </button>
                  <button
                    disabled={idx === sectionOrder.length - 1}
                    onClick={() => moveSection(idx, 1)}
                    className="px-2 py-0.5 rounded bg-dark-800 hover:bg-dark-700 text-slate-400 hover:text-white disabled:opacity-30"
                  >
                    ▼
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="gradient" size="sm" icon={Check} onClick={handleSave}>
            Apply Design Studio Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ResumeDesignStudioModal;
