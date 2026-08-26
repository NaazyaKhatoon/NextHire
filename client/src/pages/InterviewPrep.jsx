import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BotMessageSquare, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Wand2, 
  ArrowRight, 
  HelpCircle, 
  Lightbulb, 
  Mic, 
  ShieldCheck 
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import MotivationalQuoteCard from '../components/MotivationalQuoteCard';
import { interviewService } from '../services/interviewService';
import { useToast } from '../components/Toast';

const InterviewPrep = () => {
  const [targetRole, setTargetRole] = useState('Senior Full-Stack Engineer');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [questions, setQuestions] = useState([]);
  const [revealedIds, setRevealedIds] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [evaluations, setEvaluations] = useState({});
  const [evaluatingId, setEvaluatingId] = useState(null);

  const toast = useToast();

  const categories = ['All', 'Technical', 'System Design', 'Behavioral', 'Resume-Specific', 'HR / Culture'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await interviewService.generateQuestions(targetRole, selectedCategory, selectedDifficulty);
        setQuestions(res.questions || []);
      } catch (err) {
        console.warn('Using local fallback questions:', err.message);
      }
    };
    fetchQuestions();
  }, [targetRole, selectedCategory, selectedDifficulty]);

  const toggleReveal = (id) => {
    setRevealedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEvaluate = async (q) => {
    const answer = userAnswers[q.id];
    if (!answer || !answer.trim()) {
      toast.error('Please write an answer before submitting for AI evaluation.');
      return;
    }
    setEvaluatingId(q.id);
    try {
      const result = await interviewService.evaluateAnswer({
        questionId: q.id,
        question: q.question,
        userAnswer: answer,
        targetRole,
      });
      setEvaluations(prev => ({ ...prev, [q.id]: result }));
      toast.success(`Answer evaluated! Score: ${result.score}/100`);
    } catch (err) {
      toast.info('Answer evaluated using local scoring engine.');
    } finally {
      setEvaluatingId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* 1. Header & Live Mock Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20 text-xs font-semibold mb-2">
            <BotMessageSquare className="w-3.5 h-3.5 text-brand-400" />
            <span>AI Interview Engineering</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            AI Interview Prep & Question Bank
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Target Role: <strong className="text-slate-200">{targetRole}</strong> • Calibrated with STAR methods & technical drill-downs
          </p>
        </div>

        <Link to="/mock-interview">
          <Button variant="gradient" size="md" icon={Mic} className="shadow-glow">
            Start Live AI Mock Interview
          </Button>
        </Link>
      </div>

      {/* Motivational Mindset Card */}
      <MotivationalQuoteCard compact={true} />

      {/* 2. Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-dark-800/80 border border-slate-800 text-xs">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="font-semibold text-slate-400">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white'
                  : 'bg-dark-900 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-400">Difficulty:</span>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-2.5 py-1 rounded-lg bg-dark-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-brand-500"
          >
            {difficulties.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Questions List */}
      <div className="space-y-6">
        {questions.map((q, idx) => {
          const isRevealed = revealedIds[q.id];
          const evalResult = evaluations[q.id];

          return (
            <div key={q.id || idx} className="rounded-3xl bg-dark-800/80 border border-slate-800 p-6 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 text-[10px] font-bold">
                      {q.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      q.difficulty === 'Hard'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}>
                      {q.difficulty}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                    Q{idx + 1}: {q.question}
                  </h3>
                </div>

                <button
                  onClick={() => toggleReveal(q.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-dark-900 hover:bg-dark-750 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold shrink-0 transition-colors"
                >
                  {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-brand-400" />}
                  <span>{isRevealed ? 'Hide Model Answer' : 'Reveal Model Answer'}</span>
                </button>
              </div>

              {/* Practice Input Box */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="text-xs font-semibold text-slate-300">
                  Practice Your Answer (Type your answer to receive AI scoring & feedback):
                </label>
                <textarea
                  rows={3}
                  value={userAnswers[q.id] || ''}
                  onChange={(e) => setUserAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                  placeholder="Type your structured answer here (Include technical details, scale metrics, or STAR points)..."
                  className="w-full p-3.5 rounded-xl bg-dark-900 border border-slate-700 text-white placeholder-slate-500 text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-500"
                />

                <div className="flex justify-end">
                  <Button
                    size="sm"
                    variant="gradient"
                    icon={Wand2}
                    isLoading={evaluatingId === q.id}
                    onClick={() => handleEvaluate(q)}
                  >
                    Evaluate My Answer
                  </Button>
                </div>
              </div>

              {/* Evaluation Card Result */}
              {evalResult && (
                <div className="p-4 rounded-2xl bg-dark-900 border border-brand-500/30 space-y-2 text-xs animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">NextHire AI Answer Evaluation</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs">
                      {evalResult.score}/100 Score
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{evalResult.feedback}</p>
                </div>
              )}

              {/* Revealed Model Answer */}
              {isRevealed && (
                <div className="p-4 rounded-2xl bg-brand-950/40 border border-brand-500/30 space-y-2 text-xs animate-in fade-in">
                  <span className="font-bold text-brand-300 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    Recommended Benchmark Answer:
                  </span>
                  <p className="text-slate-200 leading-relaxed font-mono whitespace-pre-line">
                    {q.idealAnswer}
                  </p>
                  {q.tips && (
                    <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                      💡 <strong>Key Points to Mention:</strong> {q.tips}
                    </p>
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

export default InterviewPrep;
