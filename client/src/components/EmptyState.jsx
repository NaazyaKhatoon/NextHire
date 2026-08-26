import React from 'react';
import { FileQuestion } from 'lucide-react';
import Button from './Button';

const EmptyState = ({
  icon: Icon = FileQuestion,
  title = 'No records found',
  description = 'Get started by creating or analyzing your first item.',
  actionLabel,
  onAction,
  actionIcon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-dark-800/40 border border-dashed border-slate-800 max-w-md mx-auto my-8 space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-dark-800 border border-slate-700/80 flex items-center justify-center text-brand-400 shadow-inner">
        <Icon className="w-8 h-8 opacity-80" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <p className="text-xs text-slate-400 max-w-sm leading-relaxed">{description}</p>
      </div>

      {actionLabel && onAction && (
        <Button
          variant="gradient"
          size="sm"
          onClick={onAction}
          icon={actionIcon}
          className="mt-2"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
