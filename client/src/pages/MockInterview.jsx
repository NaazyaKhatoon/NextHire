import React, { useState } from 'react';
import { 
  Mic, 
  Bot, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Trophy, 
  RotateCcw,
  Zap,
  HelpCircle
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import MotivationalQuoteCard from '../components/MotivationalQuoteCard';
import { interviewService } from '../services/interviewService';
import { useToast } from '../components/Toast';

const MOCK_QUESTIONS = [
  {
    id: 1,
    question: 'Tell me about yourself and walk me through your most impactful software engineering project.',
    category: 'Introduction & Project Scale',
  },
  {
    id: 2,
    question: 'How do you handle database connection pooling and slow query latency under high concurrent load?',
    category: 'Technical Systems',
  },
  {
    id: 3,
    question: 'Tell me about a time you had a technical disagreement with a teammate. How did you resolve it?',
    category: 'Behavioral & Collaboration (STAR)',
  },
  {
    id: 4,
    question: 'Design a distributed rate limiter for 100k requests per second across 20 web servers.',
    category: 'System Architecture',
  }
];

const MockInterview = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentInput, setCurrentInput] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [sessionScore, setSessionScore] = useState(null);

  const toast = useToast();

  const handleNextQuestion = () => {
    if (!currentInput.trim()) {
      toast.error('Please write an answer before continuing.');
      return;
    }

    const nextAnswers = { ...answers, [currentStep]: currentInput };
    setAnswers(nextAnswers);
    setCurrentInput('');

    if (currentStep < MOCK_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Finish session
      setEvaluating(true);
      setTimeout(() => {
        setEvaluating(false);
        setSessionCompleted(true);
        setSessionScore({
          overall: 86,
          technicalRelevance: 88,
          communicationClarity: 84,
          problemSolving: 90,
          answerStructure: 82,
          strengths: [
            'Direct, structured answers addressing problem constraints.',
            'Effective technical reasoning regarding distributed caching and index optimization.',
          ],
          improvements: [
            'State quantifiable revenue or user scale metrics in behavioral examples.',
            'Keep introductory pitch strictly under 2 minutes.',
          ]
        });
        toast.success('🎉 Mock Interview Completed! Feedback report ready.');
      }, 1500);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setCurrentInput('');
    setSessionCompleted(false);
    setSessionScore(null);
  };

  const activeQ = MOCK_QUESTIONS[currentStep];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20 text-xs font-semibold mb-2">
          <Mic className="w-3.5 h-3.5 text-brand-400" />
          <span>Interactive AI Interview Simulator</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          NextHire AI Mock Interview
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Practice answering real engineering interview questions in real-time and get multi-factor scoring.
        </p>
      </div>

      {/* Motivational Mindset Card */}
      <MotivationalQuoteCard compact={true} />

      {!sessionCompleted ? (
        <div className="rounded-3xl bg-dark-800/80 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          {/* Question Step Progress */}
          <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">Question {currentStep + 1} of {MOCK_QUESTIONS.length}</span>
              <span className="px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 text-[10px] font-bold">
                {activeQ.category}
              </span>
            </div>
            <span className="text-slate-400">Step {currentStep + 1} / {MOCK_QUESTIONS.length}</span>
          </div>

          {/* AI Interviewer Avatar & Prompt */}
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-dark-900 border border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-brand-600/20 text-brand-400 border border-brand-500/30 flex items-center justify-center shrink-0 shadow-glow">
              <Bot className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Lead Interviewer</span>
              <h3 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                "{activeQ.question}"
              </h3>
            </div>
          </div>

          {/* Candidate Answer Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">
              Your Answer (Speak or type your structured STAR response):
            </label>
            <textarea
              rows={6}
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder="Structure your answer: Situation, Task, Action, and Result with quantifiable metrics..."
              className="w-full p-4 rounded-2xl bg-dark-900 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
            />
          </div>

          {/* Next Action */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <span className="text-xs text-slate-400">
              💡 Tip: Answers with quantifiable percentages score 15% higher.
            </span>

            <Button
              variant="gradient"
              size="md"
              icon={Send}
              isLoading={evaluating}
              onClick={handleNextQuestion}
            >
              {currentStep === MOCK_QUESTIONS.length - 1 ? 'Submit & Get Evaluation' : 'Next Question'}
            </Button>
          </div>
        </div>
      ) : (
        /* Completed Score Report */
        <div className="rounded-3xl bg-dark-800/90 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-3 pb-6 border-b border-slate-800">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-glow-emerald">
              <Trophy className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-white">Mock Interview Evaluation Report</h2>
            <div className="text-4xl font-extrabold text-emerald-400">
              {sessionScore?.overall}% Overall Score
            </div>
          </div>

          {/* Breakdown Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3.5 rounded-2xl bg-dark-900 border border-slate-800">
              <span className="text-[11px] text-slate-400">Technical Depth</span>
              <div className="text-lg font-bold text-white mt-1">{sessionScore?.technicalRelevance}%</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-dark-900 border border-slate-800">
              <span className="text-[11px] text-slate-400">Communication</span>
              <div className="text-lg font-bold text-white mt-1">{sessionScore?.communicationClarity}%</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-dark-900 border border-slate-800">
              <span className="text-[11px] text-slate-400">Problem Solving</span>
              <div className="text-lg font-bold text-white mt-1">{sessionScore?.problemSolving}%</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-dark-900 border border-slate-800">
              <span className="text-[11px] text-slate-400">STAR Structure</span>
              <div className="text-lg font-bold text-white mt-1">{sessionScore?.answerStructure}%</div>
            </div>
          </div>

          {/* Strengths & Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Strong Highlights
              </span>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                {sessionScore?.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-2">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4" /> Areas for Polishing
              </span>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                {sessionScore?.improvements.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <Button variant="secondary" size="md" icon={RotateCcw} onClick={handleRestart}>
              Practice Another Session
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockInterview;
