import React from 'react';
import { Check, Plus, AlertCircle, Sparkles } from 'lucide-react';

const SkillBadge = ({ name, type = 'matched', onAction, actionLabel, icon }) => {
  const styles = {
    matched: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25',
    missing: 'bg-rose-500/15 text-rose-300 border-rose-500/30 hover:bg-rose-500/25',
    recommended: 'bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25',
    brand: 'bg-brand-500/15 text-brand-300 border-brand-500/30 hover:bg-brand-500/25',
    neutral: 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750',
  };

  const getIcon = () => {
    if (icon) return icon;
    if (type === 'matched') return <Check className="w-3 h-3 text-emerald-400" />;
    if (type === 'missing') return <AlertCircle className="w-3 h-3 text-rose-400" />;
    if (type === 'recommended') return <Sparkles className="w-3 h-3 text-amber-400" />;
    return null;
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all duration-150 select-none
        ${styles[type] || styles.neutral}
      `}
    >
      {getIcon()}
      <span>{name}</span>

      {onAction && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAction(name);
          }}
          className="ml-1 p-0.5 rounded hover:bg-white/10 transition-colors"
          title={actionLabel || 'Add to resume'}
        >
          <Plus className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};

export default SkillBadge;
