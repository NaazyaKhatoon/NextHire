import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  Award, 
  Users, 
  Zap,
  ArrowRight
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          <span>Our Mission</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Democratizing ATS Optimization for Every Job Seeker
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          Over 75% of qualified resumes never reach human recruiters due to algorithmic ATS filters. NextHire was built to level the playing field.
        </p>
      </div>

      {/* Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Deterministic Scoring</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We don't guess or rely solely on black-box LLM output. Our algorithms analyze keyword density, formatting, and action verbs mathematically.
          </p>
        </Card>

        <Card className="space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Zero Hallucinations</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We never invent qualifications, metrics, or company tenures. Our AI strictly enhances existing candidate truths into high-impact phrasing.
          </p>
        </Card>

        <Card className="space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">ATS-Tested Templates</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            All 6 templates have been audited against major enterprise systems (Workday, Taleo, Greenhouse, Lever, and iCIMS).
          </p>
        </Card>
      </div>

      {/* CTA */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-brand-900/60 to-dark-800 border border-brand-500/30 text-center space-y-4 shadow-xl">
        <h2 className="text-xl font-bold text-white">Ready to elevate your career?</h2>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          Scan your resume today and get actionable improvements in under 10 seconds.
        </p>
        <Link to="/ats-scanner" className="inline-block">
          <Button variant="gradient" size="md" icon={ArrowRight} iconPosition="right">
            Get Started Free
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default About;
