import React from 'react';
import { 
  Eye, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Wand2, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  X 
} from 'lucide-react';
import Modal from './Modal';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const RecruiterGlanceModal = ({ isOpen, onClose, candidateName = 'Alex Chen', targetRole = 'Senior Full-Stack Engineer' }) => {
  const navigate = useNavigate();

  const standouts = [
    'Strong title match: Senior Full-Stack Engineer with 5+ years scale experience.',
    'Modern technical stack prominence: React, Node.js, Python, AWS, Docker.',
    'Prominent quantifiable outcomes (e.g. "slashed LCP query latency by 48%").',
    'Single-column structure is clear and quickly scan-friendly in under 6 seconds.'
  ];

  const overlookedOrWeak = [
    {
      problem: 'Summary paragraph is 5 lines long; recruiters typically read the first 2 lines.',
      fixUrl: '/resume-editor',
      fixLabel: 'Condense Summary'
    },
    {
      problem: 'Kubernetes container management is missing from core keywords.',
      fixUrl: '/skill-gap',
      fixLabel: 'Add Missing Skill'
    }
  ];

  const potentialQuestions = [
    'How did you manage database connection pool exhaustion during peak traffic?',
    'What was your exact leadership role in migrating legacy monoliths to microservices?',
    'Why did you choose PostgreSQL over MongoDB for transactional state?'
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Recruiter 6-Second First-Glance Simulation" size="lg">
      <div className="space-y-6 text-xs sm:text-sm">
        {/* Intro banner */}
        <div className="p-4 rounded-2xl bg-brand-950/40 border border-brand-500/30 flex items-start gap-3">
          <Eye className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-white">AI First-Glance Scan Telemetry</span>
            <p className="text-slate-300 text-xs leading-relaxed">
              Recruiters spend an average of <strong>6 to 7.4 seconds</strong> scanning candidate resumes. Here is how your profile scans in the initial review.
            </p>
          </div>
        </div>

        {/* 1. What Stands Out (Positives) */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            What Stands Out (High Impact)
          </h4>
          <div className="space-y-2">
            {standouts.map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-dark-900 border border-emerald-500/20 flex items-start gap-2.5 text-xs text-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. What May Be Overlooked & [Fix This] */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            Potential Recruiter Hesitations
          </h4>
          <div className="space-y-2">
            {overlookedOrWeak.map((item, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-dark-900 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <span className="text-slate-300">{item.problem}</span>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-amber-500/40 text-amber-300 hover:bg-amber-500/10 shrink-0"
                  onClick={() => {
                    onClose();
                    navigate(item.fixUrl);
                  }}
                  icon={Wand2}
                >
                  {item.fixLabel}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Potential Interview Questions Recruiters Will Ask */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4" />
            Likely Interview Drill-Down Questions
          </h4>
          <div className="p-4 rounded-2xl bg-dark-900 border border-slate-800 space-y-2 text-xs text-slate-300">
            {potentialQuestions.map((q, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-sky-400 font-bold">Q{i + 1}:</span>
                <span className="italic">"{q}"</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info note */}
        <div className="text-[11px] text-slate-500 italic pt-2 border-t border-slate-800 text-center">
          * This is an AI recruiter attention simulation based on eye-tracking studies and standard enterprise ATS heuristics.
        </div>
      </div>
    </Modal>
  );
};

export default RecruiterGlanceModal;
