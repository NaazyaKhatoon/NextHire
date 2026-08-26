import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Minimize2, 
  Layers,
  Check
} from 'lucide-react';
import Modal from './Modal';
import Button from './Button';
import { useToast } from './Toast';

const OnePageOptimizerModal = ({ isOpen, onClose, onApplyOnePage }) => {
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const rules = [
    { title: 'Margins to 0.5"', detail: 'Expands printable horizontal area by 22% without breaking ATS rules.' },
    { title: 'Trim Executive Summary', detail: 'Condenses from 5 narrative lines to 3 punchy, high-density lines.' },
    { title: 'Limit Older Roles to 2 Bullets', detail: 'Prioritizes recent senior scale impact over legacy maintenance tasks.' },
    { title: 'Single-Line Skill Grouping', detail: 'Formats tech stack into comma-separated categories rather than vertical blocks.' },
    { title: 'Line-Height Calibration (1.35x)', detail: 'Perfect A4 typographical density used by top tech recruiters.' },
  ];

  const handleApply = () => {
    setLoading(true);
    setTimeout(() => {
      setApplied(true);
      setLoading(false);
      toast.success('Resume optimized to fit exactly 1 A4 Page!');
      if (onApplyOnePage) onApplyOnePage();
    }, 600);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Fit My Resume to Exactly 1 Page" size="md">
      <div className="space-y-6 text-xs sm:text-sm">
        {/* Before / After Preview Pill */}
        <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-dark-900 border border-slate-800 text-center">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Current Length</span>
            <div className="text-xl font-extrabold text-rose-400">2 Pages</div>
            <span className="text-[10px] text-slate-400">Excess spacing & trailing lines</span>
          </div>

          <div className="space-y-1 border-l border-slate-800 pl-3">
            <span className="text-[10px] text-emerald-400 uppercase font-bold">NextHire Optimized</span>
            <div className="text-xl font-extrabold text-emerald-400">1 Page (A4)</div>
            <span className="text-[10px] text-emerald-400 font-semibold">100% Recruiter Dense</span>
          </div>
        </div>

        {/* Optimizations Checklist */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300">Smart Condensing Rules:</label>
          <div className="space-y-2">
            {rules.map((rule, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-dark-900 border border-slate-800/80 flex items-start gap-2.5 text-xs">
                <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${applied ? 'text-emerald-400' : 'text-brand-400'}`} />
                <div>
                  <span className="font-bold text-white">{rule.title}</span>
                  <p className="text-slate-400 text-[11px] mt-0.5">{rule.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>

          <Button
            variant="gradient"
            size="sm"
            icon={applied ? Check : Minimize2}
            isLoading={loading}
            onClick={handleApply}
            disabled={applied}
          >
            {applied ? '1-Page Layout Active' : 'Apply 1-Page Optimization'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default OnePageOptimizerModal;
