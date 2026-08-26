import React from 'react';
import { 
  Trophy, 
  Sparkles, 
  FileText, 
  Cpu, 
  FolderGit2, 
  BotMessageSquare, 
  UserCheck, 
  Briefcase,
  TrendingUp,
  Info
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';

const CareerReadinessScore = ({ score = 91, breakdown = {}, targetRole = 'Senior Full-Stack Engineer', className = '' }) => {
  const data = [
    { subject: 'Resume Quality', score: breakdown.resume || 88, fullMark: 100, icon: FileText },
    { subject: 'Skill Match', score: breakdown.skills || 84, fullMark: 100, icon: Cpu },
    { subject: 'Project Strength', score: breakdown.projects || 92, fullMark: 100, icon: FolderGit2 },
    { subject: 'Interview Prep', score: breakdown.interview || 76, fullMark: 100, icon: BotMessageSquare },
    { subject: 'Profile Health', score: breakdown.profile || 95, fullMark: 100, icon: UserCheck },
    { subject: 'Applications', score: breakdown.applications || 80, fullMark: 100, icon: Briefcase },
  ];

  // Circle SVG calculations
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`rounded-3xl bg-dark-800/90 border border-slate-800 p-6 sm:p-7 shadow-2xl backdrop-blur-xl space-y-6 ${className}`}>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
              <Trophy className="w-4 h-4" />
            </div>
            <h3 className="text-base font-extrabold text-white">Career Readiness Score</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
              Job Ready
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Overall holistic candidate readiness calibrated for <strong className="text-slate-200">{targetRole}</strong>
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-500/20">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Top 6% of Applicants</span>
        </div>
      </div>

      {/* Main Grid: Left Radial Gauge + Right Radar/Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Animated Radial Progress Circle */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-5 rounded-2xl bg-dark-900/80 border border-slate-800/80 text-center">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
              {/* Background Track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="text-slate-800"
                strokeWidth="12"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Active Gradient Meter */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="url(#readinessGradient)"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="readinessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="50%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner Stats */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-extrabold tracking-tight text-white">{score}%</span>
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mt-0.5">
                Ready to Apply
              </span>
            </div>
          </div>

          <div className="mt-4 text-[11px] text-slate-400 leading-relaxed max-w-xs">
            Reflects combined resume score, verified skill proofs, interview readiness, and application pipeline.
          </div>
        </div>

        {/* Right: 6-Factor Metric Cards */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {data.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-dark-900/60 border border-slate-800/80 space-y-1.5 hover:border-brand-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-400 truncate">{item.subject}</span>
                <span className="text-xs font-bold text-white">{item.score}%</span>
              </div>
              {/* Mini progress bar */}
              <div className="w-full h-1.5 bg-dark-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ${
                    item.score >= 85 ? 'bg-emerald-400' : item.score >= 70 ? 'bg-brand-400' : 'bg-amber-400'
                  }`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}

          {/* AI Readiness Note */}
          <div className="col-span-2 sm:col-span-3 p-3 rounded-xl bg-brand-950/40 border border-brand-500/25 flex items-start gap-2.5 text-[11px] text-slate-300">
            <Info className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
            <span>
              <strong>Readiness Tip:</strong> Completing 1 mock interview on behavioral STAR questions will raise your Interview Prep metric to <strong>88%</strong>.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerReadinessScore;
