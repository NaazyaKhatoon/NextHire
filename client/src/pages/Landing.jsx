import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  FileSearch, 
  FileCheck2, 
  Wand2, 
  Briefcase, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  TrendingUp, 
  Cpu, 
  Bot, 
  LayoutTemplate,
  Zap,
  Flame,
  Heart,
  Trophy
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import ATSScore from '../components/ATSScore';
import MotivationalQuoteCard from '../components/MotivationalQuoteCard';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
  const { user, demoLogin } = useAuth();
  const navigate = useNavigate();

  const handleQuickDemo = async () => {
    await demoLogin();
    navigate('/dashboard');
  };

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-brand-600/30 via-indigo-500/20 to-sky-400/20 blur-[130px] pointer-events-none -z-10 rounded-full" />

        {/* Top Tag Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-800/90 border border-brand-500/30 text-xs font-semibold text-brand-300 shadow-glow mb-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-pulse" />
          <span>NextHire — Next-Gen AI Career & ATS Architecture</span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span>
          <span className="text-slate-400 font-normal">v2.5 Live</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          Build a resume that <br />
          <span className="gradient-text">gets noticed.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          AI-powered resume analysis, ATS optimization, ChatGPT career copilot, and interview acceleration — <span className="text-white font-medium">all in one place.</span>
        </p>

        {/* Hero CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/ats-scanner">
            <Button variant="gradient" size="lg" icon={FileSearch} className="shadow-glow">
              Analyze My Resume Free
            </Button>
          </Link>
          <Link to="/resume-generator">
            <Button variant="secondary" size="lg" icon={Wand2}>
              Create Resume with AI
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            icon={Zap}
            onClick={handleQuickDemo}
            className="border-brand-500/40 text-brand-300 hover:bg-brand-500/10"
          >
            1-Click Live Demo
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Deterministic ATS Scoring
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Zero Hallucination Guarantee
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 6 ATS-Tested Templates
          </span>
        </div>

        {/* Motivational Compact Quote Bar */}
        <div className="mt-10 max-w-3xl mx-auto">
          <MotivationalQuoteCard compact={true} />
        </div>

        {/* Interactive Live Teaser Card */}
        <div className="mt-12 relative max-w-5xl mx-auto rounded-3xl bg-gradient-to-b from-dark-800/90 to-dark-900 border border-slate-700/80 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="absolute -top-3 right-8 px-3 py-1 bg-gradient-to-r from-brand-600 to-sky-500 rounded-full text-[10px] uppercase font-bold tracking-wider text-white shadow-md">
            NextHire Live Engine Teaser
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            {/* Left: Score Meter */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-dark-900/80 rounded-2xl border border-slate-800">
              <ATSScore score={88} size={170} label="Resume Compatibility Match" />
              <div className="mt-4 text-center">
                <span className="text-xs font-semibold text-emerald-400">Top 5% of Applicant Pool</span>
                <p className="text-[11px] text-slate-400 mt-0.5">Target: Senior Software Engineer</p>
              </div>
            </div>

            {/* Right: Metrics & AI Advice */}
            <div className="lg:col-span-8 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-dark-900/60 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Keyword Density</div>
                  <div className="text-lg font-bold text-white mt-0.5">92% Match</div>
                  <div className="text-[10px] text-emerald-400 mt-1">18 of 20 keywords found</div>
                </div>
                <div className="p-3.5 rounded-xl bg-dark-900/60 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Action Verb Impact</div>
                  <div className="text-lg font-bold text-white mt-0.5">86% Score</div>
                  <div className="text-[10px] text-emerald-400 mt-1">High metric usage</div>
                </div>
                <div className="p-3.5 rounded-xl bg-dark-900/60 border border-slate-800 col-span-2 sm:col-span-1">
                  <div className="text-[11px] text-slate-400">Formatting Check</div>
                  <div className="text-lg font-bold text-emerald-400 mt-0.5">100% Clean</div>
                  <div className="text-[10px] text-slate-400 mt-1">No parsing blockers</div>
                </div>
              </div>

              {/* Sample AI Recommendation */}
              <div className="p-4 rounded-xl bg-brand-950/40 border border-brand-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-brand-300 flex items-center gap-1.5">
                    <Wand2 className="w-3.5 h-3.5 text-brand-400" />
                    NextHire XYZ Bullet Recommendation
                  </span>
                  <span className="text-[10px] bg-brand-500/20 text-brand-300 px-2 py-0.5 rounded font-mono">+12 PTS IMPACT</span>
                </div>
                <div className="text-xs text-slate-300">
                  <p className="line-through text-slate-500">"Helped improve application load speeds for users."</p>
                  <p className="mt-1 text-emerald-300 font-medium">"Refactored React bundle architecture and configured Redis caching, slashing LCP latency by 42% across 250k MAUs."</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-400">Ready to audit your own resume in 5 seconds?</span>
                <Link to="/ats-scanner">
                  <Button size="sm" variant="gradient" icon={ArrowRight} iconPosition="right">
                    Start Scan
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY NEXTHIRE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-xs uppercase font-bold tracking-widest text-brand-400">Why NextHire?</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">
            75% of resumes are rejected by ATS before a human ever sees them.
          </p>
          <p className="text-slate-400 text-sm sm:text-base">
            Modern hiring runs on automated Applicant Tracking Systems. NextHire deconstructs ATS screening algorithms to give you the exact formula recruiters search for.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card hover className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Deterministic ATS Parser</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transparent multi-factor scoring covering Keyword Density, Skills, Formatting, Readability, and Metric Impact.
            </p>
          </Card>

          <Card hover className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Wand2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">AI Bullet Point Enhancer</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transform passive duty descriptions into high-impact, quantifiable achievements using our XYZ formula without fabricating fake numbers.
            </p>
          </Card>

          <Card hover className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">ChatGPT-Class Career Copilot</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your 24/7 personal career advisor trained on STAR interview methods, salary negotiation, and hiring benchmarks for 150+ roles.
            </p>
          </Card>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-dark-850/50 py-16 rounded-3xl border border-slate-800">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-xs uppercase font-bold tracking-widest text-sky-400">Simple 3-Step Flow</h2>
          <p className="text-3xl font-extrabold text-white">How NextHire Gets You Hired</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-3 p-6">
            <div className="w-12 h-12 rounded-2xl bg-brand-600/20 text-brand-400 font-extrabold text-xl flex items-center justify-center mx-auto border border-brand-500/30">
              1
            </div>
            <h3 className="text-base font-bold text-white">Scan & Parse</h3>
            <p className="text-xs text-slate-400">
              Upload your PDF/DOCX resume or paste text alongside your target job description.
            </p>
          </div>

          <div className="text-center space-y-3 p-6">
            <div className="w-12 h-12 rounded-2xl bg-sky-600/20 text-sky-400 font-extrabold text-xl flex items-center justify-center mx-auto border border-sky-500/30">
              2
            </div>
            <h3 className="text-base font-bold text-white">Optimize & Rewrite</h3>
            <p className="text-xs text-slate-400">
              Review instant ATS score breakdown, missing skills, keyword heatmaps, and 1-click AI suggestions.
            </p>
          </div>

          <div className="text-center space-y-3 p-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 font-extrabold text-xl flex items-center justify-center mx-auto border border-emerald-500/30">
              3
            </div>
            <h3 className="text-base font-bold text-white">Generate & Download</h3>
            <p className="text-xs text-slate-400">
              Export pixel-perfect ATS-compliant A4 PDF resumes ready for submission to top tech & enterprise portals.
            </p>
          </div>
        </div>
      </section>

      {/* 4. INSPIRING MINDSET HERO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotivationalQuoteCard />
      </section>

      {/* 5. TEMPLATES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xs uppercase font-bold tracking-widest text-brand-400">ATS Tested Layouts</h2>
          <p className="text-3xl font-extrabold text-white">Built to Pass Every ATS Scanner</p>
          <p className="text-xs sm:text-sm text-slate-400">
            Engineered with strict semantic hierarchies, optimal font pairings, and parser-friendly layouts.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-left">
          {[
            { name: 'Modern Pro', tag: 'Best for Tech', icon: LayoutTemplate },
            { name: 'Minimalist', tag: 'High Readability', icon: FileCheck2 },
            { name: 'Corporate', tag: 'Executive Tier', icon: Briefcase },
            { name: 'Software Dev', tag: 'Tech Stack Focused', icon: Cpu },
            { name: 'Creative', tag: 'Design & Marketing', icon: Sparkles },
            { name: 'ATS Classic', tag: 'Universal 100%', icon: ShieldCheck },
          ].map((item, i) => (
            <Link key={i} to="/templates" className="block group">
              <div className="p-4 rounded-2xl bg-dark-800/80 border border-slate-800 hover:border-brand-500/50 transition-all group-hover:-translate-y-1">
                <item.icon className="w-6 h-6 text-brand-400 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                <span className="text-[10px] text-slate-400 mt-1 block">{item.tag}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. FINAL CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-brand-900/70 via-indigo-900/60 to-dark-900 border border-brand-500/40 p-8 sm:p-14 text-center space-y-6 overflow-hidden shadow-2xl">
          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Ready to secure your Next Hire?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Scan your resume in seconds or build an ATS-optimized version with our guided AI wizard.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link to="/ats-scanner">
              <Button variant="gradient" size="lg" icon={FileSearch}>
                Analyze Resume Free
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="secondary" size="lg">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 pt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-400" />
          <span className="font-bold text-slate-300">NextHire Platform</span>
          <span>© 2026. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/about" className="hover:text-slate-300 transition-colors">About</Link>
          <Link to="/pricing" className="hover:text-slate-300 transition-colors">Pricing</Link>
          <Link to="/ats-scanner" className="hover:text-slate-300 transition-colors">ATS Scanner</Link>
          <Link to="/templates" className="hover:text-slate-300 transition-colors">Templates</Link>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
