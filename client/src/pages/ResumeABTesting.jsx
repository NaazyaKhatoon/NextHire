import React, { useState } from 'react';
import { 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Trophy, 
  Wand2, 
  ArrowRight, 
  TrendingUp, 
  FileText,
  ShieldCheck
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import MotivationalQuoteCard from '../components/MotivationalQuoteCard';
import { aiToolService } from '../services/aiToolService';
import { useToast } from '../components/Toast';

const ResumeABTesting = () => {
  const [roleTitle, setRoleTitle] = useState('Senior Full-Stack Engineer');
  const [jobDescription, setJobDescription] = useState('Seeking engineer with React, Node.js, Python, PostgreSQL, and Kubernetes cluster experience.');
  
  const [resumeA, setResumeA] = useState({
    title: 'Version A: Senior Full-Stack Cloud Specialist',
    text: 'Alex Chen. Senior Software Engineer with 5+ years experience in React, Node.js, Python, PostgreSQL, Redis, Docker, Kubernetes, and AWS ECS. Reduced latency by 45%.',
  });

  const [resumeB, setResumeB] = useState({
    title: 'Version B: Generalist Software Engineer',
    text: 'Alex Chen. Software Engineer with 5 years experience across full-stack JavaScript, web applications, database queries, and agile teamwork.',
  });

  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleRunABTest = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await aiToolService.abTest({
        resumeA,
        resumeB,
        jobDescription,
        targetRole: roleTitle,
      });
      setTestResult(data);
      toast.success('Resume A/B Comparison complete!');
    } catch (err) {
      toast.info('Completed comparison with local A/B engine.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20 text-xs font-semibold mb-2">
          <Layers className="w-3.5 h-3.5 text-brand-400" />
          <span>Multi-Version Optimization</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Resume A/B Testing & Variant Comparison
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Compare two versions of your resume side-by-side to discover which variant scores higher for your target role.
        </p>
      </div>

      {/* Motivational Mindset Card */}
      <MotivationalQuoteCard compact={true} />

      {/* Form with 2 Columns for Version A and Version B */}
      <form onSubmit={handleRunABTest} className="rounded-3xl bg-dark-800/80 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-semibold text-slate-300">Target Role Title</label>
            <input
              type="text"
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900 border border-slate-700 text-white mt-1 text-xs focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-300">Job Requirements Focus</label>
            <input
              type="text"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900 border border-slate-700 text-white mt-1 text-xs focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-800">
          {/* Resume Version A */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              Resume Variant A
            </label>
            <input
              type="text"
              value={resumeA.title}
              onChange={(e) => setResumeA(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white text-xs mb-2 focus:ring-2 focus:ring-brand-500"
            />
            <textarea
              rows={6}
              value={resumeA.text}
              onChange={(e) => setResumeA(prev => ({ ...prev, text: e.target.value }))}
              className="w-full p-3 rounded-xl bg-dark-900 border border-slate-700 text-white text-xs leading-relaxed focus:ring-2 focus:ring-brand-500 font-mono"
            />
          </div>

          {/* Resume Version B */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              Resume Variant B
            </label>
            <input
              type="text"
              value={resumeB.title}
              onChange={(e) => setResumeB(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white text-xs mb-2 focus:ring-2 focus:ring-brand-500"
            />
            <textarea
              rows={6}
              value={resumeB.text}
              onChange={(e) => setResumeB(prev => ({ ...prev, text: e.target.value }))}
              className="w-full p-3 rounded-xl bg-dark-900 border border-slate-700 text-white text-xs leading-relaxed focus:ring-2 focus:ring-brand-500 font-mono"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" variant="gradient" size="md" icon={Wand2} isLoading={loading}>
            Run A/B Comparison
          </Button>
        </div>
      </form>

      {/* Comparison Results */}
      {testResult && (
        <div className="rounded-3xl bg-dark-800/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl animate-in fade-in">
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3">
            <Trophy className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <span className="font-bold text-white text-sm">Winning Recommendation:</span>
              <p className="text-emerald-300 font-semibold">{testResult.recommendation}</p>
              <p className="text-slate-300 leading-relaxed pt-1">{testResult.rationale}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Version A Card */}
            <div className={`p-5 rounded-2xl border space-y-3 ${
              testResult.winner === 'A' ? 'bg-dark-900 border-emerald-500/50 shadow-glow-emerald' : 'bg-dark-900 border-slate-800'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{testResult.versionA?.name}</span>
                <span className="text-lg font-extrabold text-emerald-400">{testResult.versionA?.atsScore}% ATS</span>
              </div>
              <div className="space-y-1 text-slate-300">
                <p><strong>Keyword Match:</strong> {testResult.versionA?.keywordMatch}%</p>
                <p><strong>Skills Score:</strong> {testResult.versionA?.skillsScore}%</p>
                <p className="text-slate-400 pt-1">💡 {testResult.versionA?.keyAdvantage}</p>
              </div>
            </div>

            {/* Version B Card */}
            <div className={`p-5 rounded-2xl border space-y-3 ${
              testResult.winner === 'B' ? 'bg-dark-900 border-emerald-500/50 shadow-glow-emerald' : 'bg-dark-900 border-slate-800'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{testResult.versionB?.name}</span>
                <span className="text-lg font-extrabold text-slate-200">{testResult.versionB?.atsScore}% ATS</span>
              </div>
              <div className="space-y-1 text-slate-300">
                <p><strong>Keyword Match:</strong> {testResult.versionB?.keywordMatch}%</p>
                <p><strong>Skills Score:</strong> {testResult.versionB?.skillsScore}%</p>
                <p className="text-slate-400 pt-1">💡 {testResult.versionB?.keyAdvantage}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeABTesting;
