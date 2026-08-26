import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  ArrowRight, 
  Sparkles, 
  Target, 
  CheckCircle2, 
  TrendingUp,
  Compass,
  AlertTriangle
} from 'lucide-react';
import Button from './Button';

const NextBestActionCard = ({ action, targetRole, atsScore, className = '' }) => {
  const currentAction = action || {
    title: 'Master Kubernetes Fundamentals & Container Orchestration',
    description: 'Adding Kubernetes to your skills and experience bullets will immediately boost your ATS compatibility from 88% to 95%+ for Senior roles.',
    primaryButton: { label: 'Start Skill Roadmap', url: '/skill-gap' },
    secondaryButton: { label: 'Optimize Resume', url: '/resume-editor' },
    urgency: 'High Impact',
    impactScore: '+8 ATS Pts',
    category: 'Skill Gap & ATS Optimization',
  };

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-950/80 via-dark-800 to-indigo-950/70 border border-brand-500/40 p-6 sm:p-7 shadow-2xl backdrop-blur-xl ${className}`}>
      {/* Decorative ambient background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-brand-500/20 via-sky-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
              <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
              Next Best Action
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-[11px] font-semibold">
              {currentAction.urgency || 'High Impact'}
            </span>
            <span className="text-[11px] text-emerald-400 font-bold hidden sm:inline-block">
              {currentAction.impactScore || '+8 ATS Pts'}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
            {currentAction.title}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {currentAction.description}
          </p>

          <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400">
            <span>Target: <strong className="text-slate-200">{targetRole || 'Senior Full-Stack Engineer'}</strong></span>
            <span>•</span>
            <span>Current ATS: <strong className="text-emerald-400">{atsScore || 88}%</strong></span>
          </div>
        </div>

        {/* Action Button Group */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
          {currentAction.primaryButton && (
            <Link to={currentAction.primaryButton.url}>
              <Button variant="gradient" size="md" icon={ArrowRight} iconPosition="right" className="shadow-glow">
                {currentAction.primaryButton.label}
              </Button>
            </Link>
          )}
          {currentAction.secondaryButton && (
            <Link to={currentAction.secondaryButton.url}>
              <Button variant="secondary" size="md">
                {currentAction.secondaryButton.label}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NextBestActionCard;
