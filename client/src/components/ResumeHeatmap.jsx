import React, { useState } from 'react';
import { 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Wand2,
  Layers,
  Info
} from 'lucide-react';

const ResumeHeatmap = ({ resumeText, onFixBullet }) => {
  const [selectedHighlight, setSelectedHighlight] = useState(null);

  // Heatmap sample analysis items
  const heatmapData = [
    {
      text: 'Architected and deployed distributed full-stack solutions in React, TypeScript, and Node.js REST APIs.',
      type: 'green',
      tag: 'Strong Action Verb & Modern Tech Stack',
      explanation: 'Starts with high-impact verb "Architected" and clearly lists modern high-demand languages.',
    },
    {
      text: 'slashed p99 database query latency by 48% across 500k monthly active users.',
      type: 'green',
      tag: 'High-Impact Quantifiable Metric',
      explanation: 'Quantified using verifiable XYZ outcome metrics (48% latency, 500k MAUs).',
    },
    {
      text: 'Responsible for backend features and helped fix database performance.',
      type: 'red',
      tag: 'Weak Passive Verb & Missing Numbers',
      explanation: 'Passive phrase "Responsible for" creates weak recruiter impression. Replace with "Spearheaded" and add throughput metrics.',
      suggestedFix: 'Spearheaded backend microservices optimization in Node.js, cutting API latency by 35% across 1M+ daily queries.'
    },
    {
      text: 'Worked on real-time telemetry dashboard in React and FastAPI.',
      type: 'yellow',
      tag: 'Moderate Impact (Needs Scale Context)',
      explanation: 'Tech stack is strong, but adding user count or event frequency will push this into the top 5% tier.',
      suggestedFix: 'Architected real-time telemetry dashboard in React and FastAPI, processing 15M+ daily events with sub-50ms latency.'
    }
  ];

  return (
    <div className="rounded-3xl bg-dark-800/90 border border-slate-800 p-6 space-y-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            Smart Resume Heatmap & Impact Visualizer
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Click on any highlighted section below to view AI telemetry and optimization fixes.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] font-semibold">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-3 h-3 rounded-full bg-emerald-500/30 border border-emerald-400" /> Strong
          </span>
          <span className="flex items-center gap-1.5 text-amber-400">
            <span className="w-3 h-3 rounded-full bg-amber-500/30 border border-amber-400" /> Medium
          </span>
          <span className="flex items-center gap-1.5 text-rose-400">
            <span className="w-3 h-3 rounded-full bg-rose-500/30 border border-rose-400" /> Weak / Passive
          </span>
        </div>
      </div>

      {/* Heatmap Interactive Content Blocks */}
      <div className="space-y-3">
        {heatmapData.map((item, idx) => {
          const isSelected = selectedHighlight === idx;
          const bgBorder =
            item.type === 'green'
              ? 'bg-emerald-950/25 border-emerald-500/40 hover:border-emerald-400 text-emerald-100'
              : item.type === 'yellow'
              ? 'bg-amber-950/25 border-amber-500/40 hover:border-amber-400 text-amber-100'
              : 'bg-rose-950/25 border-rose-500/40 hover:border-rose-400 text-rose-100';

          return (
            <div
              key={idx}
              onClick={() => setSelectedHighlight(isSelected ? null : idx)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${bgBorder} ${
                isSelected ? 'ring-2 ring-brand-500 shadow-xl' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-3 text-xs sm:text-sm">
                <p className="leading-relaxed font-medium">{item.text}</p>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full shrink-0 border bg-dark-900/80">
                  {item.tag}
                </span>
              </div>

              {/* Expanded Explanatory Drawer */}
              {isSelected && (
                <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs space-y-2 animate-in fade-in">
                  <p className="text-slate-300 leading-relaxed">
                    <strong>AI Analysis:</strong> {item.explanation}
                  </p>
                  {item.suggestedFix && (
                    <div className="p-3 rounded-xl bg-dark-900 border border-brand-500/30 space-y-1">
                      <span className="text-[11px] font-bold text-brand-300">Recommended NextHire Rewrite:</span>
                      <p className="text-emerald-300 font-medium italic">"{item.suggestedFix}"</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResumeHeatmap;
