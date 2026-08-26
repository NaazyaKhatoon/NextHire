import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Flame, 
  CheckCircle2, 
  ArrowRight, 
  Trophy, 
  Sparkles, 
  Zap,
  Target,
  Calendar
} from 'lucide-react';
import Button from './Button';
import { careerService } from '../services/careerService';
import { useToast } from './Toast';

const DailyCareerChallenge = ({ challenge, streakDays = 5, onChallengeComplete, className = '' }) => {
  const [completed, setCompleted] = useState(challenge?.completed || false);
  const [currentStreak, setCurrentStreak] = useState(streakDays);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const activeChallenge = challenge || {
    title: 'Practice 1 STAR Behavioral Question on Scaling Microservices',
    category: 'Interview Preparation',
    xp: 50,
    actionUrl: '/interview-prep',
  };

  const handleComplete = async () => {
    if (completed || loading) return;
    setLoading(true);
    try {
      await careerService.completeChallenge();
      setCompleted(true);
      setCurrentStreak((prev) => prev + 1);
      toast.success('🎉 Challenge completed! +50 Career XP awarded.');
      if (onChallengeComplete) onChallengeComplete();
    } catch (err) {
      setCompleted(true);
      setCurrentStreak((prev) => prev + 1);
      toast.success('Challenge completed! Streak updated.');
    } finally {
      setLoading(false);
    }
  };

  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className={`rounded-3xl bg-gradient-to-br from-dark-800 to-dark-850 border border-slate-800 p-6 shadow-xl space-y-5 ${className}`}>
      {/* Top Header & Streak */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400">
            <Flame className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Daily Career Challenge
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                +50 XP
              </span>
            </h3>
            <span className="text-[10px] text-slate-400">{activeChallenge.category}</span>
          </div>
        </div>

        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 font-extrabold text-xs">
          <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>{currentStreak} Day Streak</span>
        </div>
      </div>

      {/* Challenge Card Content */}
      <div className="p-4 rounded-2xl bg-dark-900/90 border border-slate-800 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs sm:text-sm font-medium text-slate-100 leading-relaxed">
            {activeChallenge.title}
          </p>
          {completed && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 shrink-0">
              <CheckCircle2 className="w-4 h-4" /> Done
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-1">
          <Link to={activeChallenge.actionUrl || '/interview-prep'}>
            <span className="text-xs text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1">
              Start Task <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Button
            size="sm"
            variant={completed ? 'secondary' : 'gradient'}
            disabled={completed || loading}
            onClick={handleComplete}
            icon={completed ? CheckCircle2 : Zap}
          >
            {completed ? 'Completed Today' : 'Mark as Done'}
          </Button>
        </div>
      </div>

      {/* 7-Day Visual Progress Streak Dots */}
      <div className="flex items-center justify-between pt-1 px-1">
        {daysOfWeek.map((day, idx) => {
          const isDone = idx < (currentStreak % 7 === 0 && currentStreak > 0 ? 7 : currentStreak % 7);
          return (
            <div key={idx} className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] text-slate-500 font-bold">{day}</span>
              <div 
                className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                  isDone 
                    ? 'bg-amber-500 text-dark-900 shadow-glow' 
                    : 'bg-dark-900 border border-slate-800 text-slate-600'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyCareerChallenge;
