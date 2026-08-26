import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Circle, 
  Sparkles, 
  FolderGit2, 
  BookOpen, 
  ChevronRight,
  Zap,
  ArrowRight
} from 'lucide-react';
import { careerService } from '../services/careerService';
import { useToast } from './Toast';

const SkillRoadmapCard = ({ skill, onStatusChange }) => {
  const [status, setStatus] = useState(skill.status || 'Not Started');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleToggle = async (newStatus) => {
    if (newStatus === status || loading) return;
    setStatus(newStatus);
    setLoading(true);
    try {
      await careerService.updateSkillStatus(skill.id, newStatus);
      toast.success(`"${skill.name}" marked as ${newStatus}!`);
      if (onStatusChange) onStatusChange(skill.id, newStatus);
    } catch (err) {
      toast.info(`Updated "${skill.name}" status`);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Learning':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/30';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="p-5 rounded-3xl bg-dark-800/80 border border-slate-800 hover:border-brand-500/40 transition-all space-y-3.5 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">{skill.name}</h4>
            <span className="text-[10px] text-brand-400 font-semibold uppercase tracking-wider">
              {skill.category || 'Essential'} Priority
            </span>
          </div>
        </div>

        {/* Status Selector Switcher */}
        <div className="flex items-center gap-1 bg-dark-900 p-1 rounded-xl border border-slate-800 text-xs">
          {['Not Started', 'Learning', 'Completed'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => handleToggle(st)}
              className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] transition-all ${
                status === st
                  ? st === 'Completed'
                    ? 'bg-emerald-500 text-dark-900 font-bold'
                    : st === 'Learning'
                    ? 'bg-sky-500 text-dark-900 font-bold'
                    : 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed">
        <strong>Why it matters:</strong> {skill.whyItMatters}
      </p>

      {/* Learning Goal & Project Idea */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
        <div className="p-3 rounded-xl bg-dark-900/80 border border-slate-800/80 space-y-1">
          <span className="text-[11px] font-bold text-sky-400 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            Learning Goal
          </span>
          <p className="text-slate-400 text-[11px] leading-relaxed">{skill.learningGoal}</p>
        </div>

        <div className="p-3 rounded-xl bg-dark-900/80 border border-slate-800/80 space-y-1">
          <span className="text-[11px] font-bold text-purple-400 flex items-center gap-1.5">
            <FolderGit2 className="w-3.5 h-3.5" />
            Portfolio Project Idea
          </span>
          <p className="text-slate-400 text-[11px] leading-relaxed">{skill.projectIdea}</p>
        </div>
      </div>
    </div>
  );
};

export default SkillRoadmapCard;
