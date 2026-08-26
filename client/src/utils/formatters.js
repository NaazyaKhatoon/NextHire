export const formatDate = (dateString) => {
  if (!dateString) return 'Just now';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export const getScoreColor = (score) => {
  if (score >= 80) return 'text-emerald-400';
  if (score >= 60) return 'text-amber-400';
  return 'text-rose-400';
};

export const getScoreBg = (score) => {
  if (score >= 80) return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
  if (score >= 60) return 'bg-amber-500/10 border-amber-500/20 text-amber-400';
  return 'bg-rose-500/10 border-rose-500/20 text-rose-400';
};

export const getScoreGrade = (score) => {
  if (score >= 90) return { grade: 'A+', label: 'Exceptional ATS Match' };
  if (score >= 80) return { grade: 'A', label: 'Strong ATS Match' };
  if (score >= 70) return { grade: 'B', label: 'Good Compatibility' };
  if (score >= 60) return { grade: 'C', label: 'Needs Optimization' };
  return { grade: 'D', label: 'Critical ATS Gaps' };
};

export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};
