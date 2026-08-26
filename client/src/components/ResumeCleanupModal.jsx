import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Trash2, 
  Wand2, 
  Layers, 
  ShieldCheck, 
  Check,
  RotateCcw
} from 'lucide-react';
import Modal from './Modal';
import Button from './Button';
import { aiToolService } from '../services/aiToolService';
import { useToast } from './Toast';

const ResumeCleanupModal = ({ isOpen, onClose, onApplyCleanup }) => {
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);
  const toast = useToast();

  const cleanupItems = [
    { id: '1', title: 'Duplicate Skills Deduping', desc: 'Consolidates "React" and "React.js" into a single canonical tag.' },
    { id: '2', title: 'Standardize Date Formats', desc: 'Normalizes varied dates (e.g. 05/2023, May 23) into clean "MMM YYYY".' },
    { id: '3', title: 'Passive Verb Upgrades', desc: 'Upgrades 3 passive duty phrases ("Assisted with", "Handled") into active verbs ("Spearheaded").' },
    { id: '4', title: 'Bullet Punctuation Consistency', desc: 'Ensures all experience bullet points end with uniform trailing periods.' },
    { id: '5', title: 'Whitespace & Linebreak Trimming', desc: 'Eliminates redundant double line-breaks to recover 15% vertical page height.' },
  ];

  const handleApply = () => {
    setLoading(true);
    setTimeout(() => {
      setApplied(true);
      setLoading(false);
      toast.success('Applied all 5 Resume Cleanups!');
      if (onApplyCleanup) onApplyCleanup();
    }, 600);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="1-Click Automated Resume Cleanup" size="md">
      <div className="space-y-6 text-xs sm:text-sm">
        <div className="p-4 rounded-2xl bg-brand-950/40 border border-brand-500/30 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white">5 Non-Destructive Formatting Optimizations Found</span>
            <p className="text-slate-300 text-xs leading-relaxed mt-0.5">
              NextHire scanned your resume structure for duplicate skills, irregular date formats, passive phrases, and spacing flaws.
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          {cleanupItems.map((item) => (
            <div key={item.id} className="p-3 rounded-xl bg-dark-900 border border-slate-800 flex items-start gap-3 text-xs">
              <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${applied ? 'text-emerald-400' : 'text-brand-400'}`} />
              <div className="space-y-0.5">
                <span className="font-bold text-white">{item.title}</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>

          <Button
            variant="gradient"
            size="sm"
            icon={applied ? Check : Wand2}
            isLoading={loading}
            onClick={handleApply}
            disabled={applied}
          >
            {applied ? 'All Cleanups Applied' : 'Apply All Cleanups'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ResumeCleanupModal;
