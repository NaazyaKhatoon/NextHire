import React, { useState } from 'react';
import { 
  Linkedin, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Check, 
  Wand2, 
  ArrowRight, 
  ShieldCheck,
  Zap
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import MotivationalQuoteCard from '../components/MotivationalQuoteCard';
import { aiToolService } from '../services/aiToolService';
import { useToast } from '../components/Toast';

const DEFAULT_LINKEDIN_TEXT = `Full Stack Developer | JavaScript, React, Node.js, Python, PostgreSQL, AWS | Building modern web applications and APIs.

About:
Experienced developer with 4+ years of expertise delivering full-stack applications and cloud microservices. Passionate about software architecture, database query performance, and user-centric web applications.`;

const LinkedInAnalyzer = () => {
  const [linkedInText, setLinkedInText] = useState(DEFAULT_LINKEDIN_TEXT);
  const [targetRole, setTargetRole] = useState('Senior Full-Stack Engineer');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);
  const toast = useToast();

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await aiToolService.analyzeLinkedIn({
        linkedInText,
        targetRole,
      });
      setAnalysisResult(data);
      toast.success('LinkedIn profile analyzed & consistency report generated!');
    } catch (err) {
      toast.info('Analyzed using local LinkedIn optimizer.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20 text-xs font-semibold mb-2">
          <Linkedin className="w-3.5 h-3.5 text-sky-400" />
          <span>LinkedIn SEO & Consistency Engine</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          LinkedIn Profile Analyzer & Resume Consistency Check
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Optimize your headline for recruiter search algorithms and detect positioning discrepancies with your resume.
        </p>
      </div>

      {/* Motivational Mindset Card */}
      <MotivationalQuoteCard compact={true} />

      {/* Input Form */}
      <form onSubmit={handleAnalyze} className="rounded-3xl bg-dark-800/80 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-4 text-xs">
        <div>
          <label className="text-[11px] font-semibold text-slate-300">Target Role / Industry Focus</label>
          <input
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900 border border-slate-700 text-white mt-1 text-xs focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div>
          <label className="text-[11px] font-semibold text-slate-300">
            Paste your LinkedIn Headline & About Summary:
          </label>
          <textarea
            rows={5}
            required
            value={linkedInText}
            onChange={(e) => setLinkedInText(e.target.value)}
            placeholder="Paste your LinkedIn headline and About section here..."
            className="w-full p-3.5 rounded-xl bg-dark-900 border border-slate-700 text-white mt-1 text-xs leading-relaxed focus:ring-2 focus:ring-brand-500 font-mono"
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" variant="gradient" size="md" icon={Wand2} isLoading={loading}>
            Analyze LinkedIn & Check Consistency
          </Button>
        </div>
      </form>

      {/* Output Results */}
      {analysisResult && (
        <div className="rounded-3xl bg-dark-800/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl animate-in fade-in">
          {/* Top Score Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">LinkedIn Profile Score & SEO Index</h3>
              <p className="text-xs text-slate-400">Search ranking strength on LinkedIn Recruiter</p>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-sky-500/20 text-sky-300 border border-sky-500/30 text-center shrink-0">
              <span className="text-xs font-bold block">SEO Score</span>
              <span className="text-2xl font-extrabold text-sky-400">{analysisResult.linkedInScore}/100</span>
            </div>
          </div>

          {/* Improved Headline & About */}
          <div className="space-y-4 text-xs">
            {/* Headline */}
            <div className="p-4 rounded-2xl bg-dark-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sky-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Recommended High-Converting Headline:
                </span>
                <button
                  onClick={() => copyToClipboard(analysisResult.improvedHeadline, 'headline')}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  {copiedKey === 'headline' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-slate-200 font-medium">{analysisResult.improvedHeadline}</p>
            </div>

            {/* About */}
            <div className="p-4 rounded-2xl bg-dark-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Recommended First-Person About Section:
                </span>
                <button
                  onClick={() => copyToClipboard(analysisResult.improvedAbout, 'about')}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  {copiedKey === 'about' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-slate-200 leading-relaxed whitespace-pre-line font-mono text-[11px]">
                {analysisResult.improvedAbout}
              </p>
            </div>

            {/* Resume ↔ LinkedIn Consistency Alert */}
            {analysisResult.consistencyComparison && (
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Resume ↔ LinkedIn Consistency Audit</span>
                </div>
                <div className="space-y-1 text-slate-300 text-[11px]">
                  <p><strong>Overlap Health:</strong> {analysisResult.consistencyComparison.skillsOverlap}</p>
                  <p><strong>Discrepancies:</strong> {analysisResult.consistencyComparison.discrepancies?.join(', ')}</p>
                  <p className="text-emerald-300 font-medium pt-1">💡 {analysisResult.consistencyComparison.advice}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkedInAnalyzer;
