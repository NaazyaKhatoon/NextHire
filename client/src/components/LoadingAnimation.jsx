import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, Loader2, Cpu, ShieldCheck } from 'lucide-react';

const STAGES = [
  { label: 'Parsing document & extracting text...', duration: 600 },
  { label: 'Extracting technical & domain skills...', duration: 700 },
  { label: 'Matching role keywords & density...', duration: 700 },
  { label: 'Analyzing structural ATS formatting...', duration: 600 },
  { label: 'Calculating multi-factor ATS compatibility score...', duration: 700 },
  { label: 'Generating AI improvements & recruiter preview...', duration: 600 },
];

const LoadingAnimation = ({ onComplete, active = true }) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    if (!active) return;
    let timer;
    if (currentStageIndex < STAGES.length - 1) {
      timer = setTimeout(() => {
        setCurrentStageIndex((prev) => prev + 1);
      }, STAGES[currentStageIndex].duration);
    } else if (onComplete) {
      timer = setTimeout(() => {
        onComplete();
      }, 600);
    }
    return () => clearTimeout(timer);
  }, [currentStageIndex, active, onComplete]);

  const progressPercent = Math.min(
    100,
    Math.round(((currentStageIndex + 1) / STAGES.length) * 100)
  );

  return (
    <div className="w-full max-w-lg mx-auto p-8 rounded-3xl bg-dark-800/90 border border-brand-500/30 shadow-2xl backdrop-blur-xl text-center space-y-6">
      {/* Scanner Radar Icon */}
      <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-brand-500/20 animate-ping opacity-60" />
        <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-brand-600 to-sky-500 animate-pulse-subtle opacity-80" />
        <div className="relative w-16 h-16 rounded-2xl bg-dark-900 border border-brand-400/40 flex items-center justify-center text-brand-300 shadow-glow">
          <Cpu className="w-8 h-8 animate-pulse text-sky-400" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-400" />
          ATS Engine Scanning Resume
        </h3>
        <p className="text-xs text-slate-400">
          Running deep structural, semantic, and keyword compatibility algorithms
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-brand-300">{STAGES[currentStageIndex].label}</span>
          <span className="text-sky-400">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-700/60">
          <div
            className="h-full bg-gradient-to-r from-brand-500 via-indigo-500 to-sky-400 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Step checklist */}
      <div className="space-y-2 text-left bg-dark-900/60 p-4 rounded-2xl border border-slate-800 text-xs">
        {STAGES.map((stage, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-2.5 transition-colors ${
              idx < currentStageIndex
                ? 'text-emerald-400 font-medium'
                : idx === currentStageIndex
                ? 'text-brand-300 font-semibold'
                : 'text-slate-500'
            }`}
          >
            {idx < currentStageIndex ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : idx === currentStageIndex ? (
              <Loader2 className="w-4 h-4 animate-spin text-brand-400 shrink-0" />
            ) : (
              <div className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[9px] text-slate-500 shrink-0">
                {idx + 1}
              </div>
            )}
            <span className="truncate">{stage.label}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
        <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
        <span>Enterprise 256-bit encryption • Zero data leakage</span>
      </div>
    </div>
  );
};

export default LoadingAnimation;
