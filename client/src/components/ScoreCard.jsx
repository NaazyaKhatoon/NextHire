import React from 'react';
import { getScoreColor, getScoreBg } from '../utils/formatters';

const ScoreCard = ({ title, score, maxScore = 100, weight, icon: Icon, description }) => {
  const percentage = Math.round((score / maxScore) * 100);
  const colorClass = getScoreColor(percentage);

  const getProgressGradient = () => {
    if (percentage >= 80) return 'from-emerald-500 to-teal-400';
    if (percentage >= 60) return 'from-amber-500 to-yellow-400';
    return 'from-rose-500 to-pink-500';
  };

  return (
    <div className="p-4 rounded-xl bg-dark-800/70 border border-slate-800 hover:border-slate-700/80 transition-all">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <div>
            <h4 className="text-sm font-semibold text-white leading-snug">{title}</h4>
            {weight && (
              <span className="text-[11px] text-slate-400">Weight: {weight}</span>
            )}
          </div>
        </div>

        <div className="text-right">
          <span className={`text-base font-bold ${colorClass}`}>
            {percentage}%
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden my-2 border border-slate-800">
        <div
          className={`h-full bg-gradient-to-r ${getProgressGradient()} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {description && (
        <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">{description}</p>
      )}
    </div>
  );
};

export default ScoreCard;
