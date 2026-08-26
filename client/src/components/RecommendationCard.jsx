import React, { useState } from 'react';
import { AlertCircle, ArrowRight, Wand2, Check, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import Button from './Button';
import { useToast } from './Toast';

const RecommendationCard = ({ recommendation, onFixWithAi }) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const toast = useToast();

  const {
    category = 'Formatting & Impact',
    problem,
    whyItMatters,
    suggestedImprovement,
    type = 'warning', // 'critical' | 'warning' | 'tip'
    sampleOriginal,
    sampleImproved,
  } = recommendation;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copied suggestion to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const getBadgeStyle = () => {
    if (type === 'critical') return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
    if (type === 'warning') return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    return 'bg-sky-500/15 text-sky-300 border-sky-500/30';
  };

  return (
    <div className="rounded-2xl bg-dark-800/80 border border-slate-800 p-5 space-y-4 hover:border-slate-700 transition-all">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${getBadgeStyle()}`}>
              {category}
            </span>
          </div>
          <h4 className="text-sm font-semibold text-white mt-1.5 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            {problem}
          </h4>
        </div>

        {onFixWithAi && (
          <Button
            size="sm"
            variant="gradient"
            icon={Wand2}
            onClick={() => onFixWithAi(recommendation)}
          >
            Fix with AI
          </Button>
        )}
      </div>

      {/* Why it matters */}
      {whyItMatters && (
        <div className="text-xs text-slate-300 bg-slate-900/60 rounded-xl p-3 border border-slate-800/80">
          <span className="font-semibold text-slate-200">Why it matters: </span>
          <span className="text-slate-400">{whyItMatters}</span>
        </div>
      )}

      {/* Suggested Fix */}
      {suggestedImprovement && (
        <div className="text-xs text-slate-200 bg-brand-950/30 rounded-xl p-3.5 border border-brand-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-brand-300 flex items-center gap-1.5">
              <Wand2 className="w-3.5 h-3.5 text-brand-400" />
              Suggested Improvement:
            </span>
            <button
              onClick={() => handleCopy(suggestedImprovement)}
              className="text-slate-400 hover:text-white transition-colors p-1"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <p className="text-slate-300 leading-relaxed font-mono text-[11px] bg-dark-900/80 p-2.5 rounded-lg border border-slate-800">
            {suggestedImprovement}
          </p>
        </div>
      )}

      {/* Before / After comparison if present */}
      {(sampleOriginal || sampleImproved) && (
        <div className="pt-2 border-t border-slate-800/80">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-between w-full text-xs text-slate-400 hover:text-slate-200 font-medium"
          >
            <span>View Before vs. After Example</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {expanded && (
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-500/20 text-slate-300">
                <span className="text-[10px] font-bold text-rose-400 uppercase">Original (Weak)</span>
                <p className="mt-1 text-slate-400 line-through text-[11px]">{sampleOriginal || 'Worked on backend features.'}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-slate-300">
                <span className="text-[10px] font-bold text-emerald-400 uppercase">Optimized (Strong Impact)</span>
                <p className="mt-1 text-emerald-200 font-medium text-[11px]">
                  {sampleImproved || 'Architected 6 high-throughput Node.js microservices, decreasing API latency by 35%.'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecommendationCard;
