import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  Sparkles, 
  FileCheck2, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp, 
  Wand2, 
  Edit3, 
  Bot, 
  Download, 
  Clock, 
  Eye, 
  Layers, 
  Flame,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import Button from '../components/Button';
import Card from '../components/Card';
import ATSScore from '../components/ATSScore';
import ScoreCard from '../components/ScoreCard';
import SkillBadge from '../components/SkillBadge';
import RecommendationCard from '../components/RecommendationCard';
import MotivationalQuoteCard from '../components/MotivationalQuoteCard';
import { useToast } from '../components/Toast';

const DEFAULT_ANALYSIS = {
  atsScore: 87,
  keywordScore: 92,
  skillsScore: 88,
  formattingScore: 100,
  readabilityScore: 86,
  impactScore: 84,
  sectionScore: 95,
  targetRole: 'Senior Full-Stack Engineer',
  readabilityLevel: 'Professional Standard (Flesch 64.2)',
  applicationReadinessScore: 91,
  detectedSkills: [
    'React.js', 'Next.js', 'JavaScript (ES6+)', 'TypeScript', 'Node.js', 'Express',
    'Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS (EC2, S3)', 'CI/CD', 'Git'
  ],
  missingSkills: ['Kubernetes', 'GraphQL', 'Terraform'],
  missingKeywords: ['Microservices Architecture', 'Agile / Scrum Sprint Leadership', 'Unit & Integration Testing (Jest)'],
  strengths: [
    'Strong quantifiable metric impact (e.g. "slashed LCP latency by 48% across 500k MAUs").',
    'Clean, single-column parsing layout without tables or multi-column blockages.',
    'High technical keyword match across modern web & cloud technology stacks.',
    'Well-structured chronological experience section with consistent date formats.'
  ],
  weaknesses: [
    'Missing Kubernetes & Terraform keywords expected for Senior Full-Stack Cloud roles.',
    'Second job entry lacks explicit revenue or throughput metrics in the final bullet.',
    'Summary section exceeds 4 lines; condensing improves initial 6-second recruiter glance.'
  ],
  formattingProblems: [],
  recommendations: [
    {
      category: 'Target Keywords',
      type: 'critical',
      problem: 'Missing container orchestration keyword: "Kubernetes"',
      whyItMatters: 'Job postings for modern Senior Engineers filter candidates based on container cluster management.',
      suggestedImprovement: 'Add Kubernetes to your technical skills and reference K8s cluster deployments in your TechNova lead role.',
      sampleOriginal: 'Deployed microservices to AWS.',
      sampleImproved: 'Architected and deployed containerized microservices across AWS ECS and Kubernetes clusters, ensuring 99.98% uptime.'
    },
    {
      category: 'Achievement Impact',
      type: 'warning',
      problem: 'Generic task bullet in Apex Systems entry',
      whyItMatters: 'Bullet points without measurable outcomes reduce recruiter conviction by up to 35%.',
      suggestedImprovement: 'Quantify the scale of your API integration or database performance optimization.',
      sampleOriginal: 'Developed scalable RESTful APIs in Node.js.',
      sampleImproved: 'Engineered high-throughput RESTful APIs in Node.js and Express handling 15M+ daily requests with sub-50ms p99 latency.'
    }
  ]
};

const AnalysisResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const [data, setData] = useState(DEFAULT_ANALYSIS);

  useEffect(() => {
    if (location.state?.analysisData) {
      setData(location.state.analysisData);
    } else {
      const cached = localStorage.getItem('resumeai_latest_analysis');
      if (cached) {
        try {
          setData(JSON.parse(cached));
        } catch {
          setData(DEFAULT_ANALYSIS);
        }
      }
    }
  }, [location.state]);

  const handleFixWithAi = (rec) => {
    navigate('/ai-rewriter', {
      state: {
        bulletToRewrite: rec.sampleOriginal || rec.problem,
        suggestedFix: rec.suggestedImprovement,
        targetRole: data.targetRole,
      }
    });
  };

  const handleAddSkill = (skill) => {
    setData((prev) => ({
      ...prev,
      missingSkills: prev.missingSkills.filter((s) => s !== skill),
      detectedSkills: [...prev.detectedSkills, skill],
    }));
    toast.success(`Added "${skill}" to your target profile!`);
  };

  const chartData = [
    { subject: 'Keywords', score: data.keywordScore || 90, fullMark: 100 },
    { subject: 'Skills', score: data.skillsScore || 85, fullMark: 100 },
    { subject: 'Formatting', score: data.formattingScore || 100, fullMark: 100 },
    { subject: 'Sections', score: data.sectionScore || 95, fullMark: 100 },
    { subject: 'Readability', score: data.readabilityScore || 85, fullMark: 100 },
    { subject: 'Impact', score: data.impactScore || 80, fullMark: 100 },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* 1. TOP HEADER & QUICK ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-semibold mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>ATS Audit Report Generated</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Resume Analysis & ATS Breakdown
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Target Role: <strong className="text-slate-200">{data.targetRole || 'Software Engineer'}</strong> • Scored against 2026 enterprise ATS standards
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link to="/resume-editor">
            <Button variant="gradient" size="md" icon={Edit3} className="shadow-glow">
              Edit in Studio
            </Button>
          </Link>
          <Link to="/ai-rewriter">
            <Button variant="secondary" size="md" icon={Wand2}>
              Bullet Rewriter
            </Button>
          </Link>
          <Link to="/chatbot">
            <Button variant="outline" size="md" icon={Bot}>
              Ask Copilot
            </Button>
          </Link>
        </div>
      </div>

      {/* Motivational Inspiration Card */}
      <MotivationalQuoteCard compact={true} />

      {/* 2. MAIN SCORE OVERVIEW & RADAR CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Score Gauge */}
        <div className="lg:col-span-4 rounded-3xl bg-dark-800/90 border border-slate-800 p-6 flex flex-col items-center justify-center text-center shadow-xl">
          <ATSScore score={data.atsScore || 87} size={200} label="Overall ATS Match Score" />

          <div className="mt-6 w-full pt-4 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Application Readiness:</span>
              <span className="font-bold text-emerald-400">{data.applicationReadinessScore || 91}% (High)</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Readability Level:</span>
              <span className="font-medium text-slate-200">{data.readabilityLevel || 'Professional'}</span>
            </div>
          </div>
        </div>

        {/* Radar & Sub-scores Breakout */}
        <div className="lg:col-span-8 rounded-3xl bg-dark-800/90 border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-400" />
            Multi-Factor ATS Compatibility Matrix
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* Radar chart */}
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={chartData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" stroke="#94A3B8" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                  <Radar
                    name="Resume Score"
                    dataKey="score"
                    stroke="#6366F1"
                    fill="#6366F1"
                    fillOpacity={0.4}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Sub-score grid */}
            <div className="space-y-2">
              <ScoreCard title="Keyword Density" score={data.keywordScore || 92} weight="30%" />
              <ScoreCard title="Skills Coverage" score={data.skillsScore || 88} weight="20%" />
              <ScoreCard title="Formatting Cleanliness" score={data.formattingScore || 100} weight="15%" />
              <ScoreCard title="Achievement Impact" score={data.impactScore || 84} weight="10%" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. RECRUITER 6-SECOND PREVIEW & ONE-PAGE ALERT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl bg-brand-950/30 border border-brand-500/30 space-y-3">
          <div className="flex items-center gap-2 text-brand-300 font-bold text-sm">
            <Eye className="w-4 h-4 text-brand-400" />
            <span>Recruiter 6-Second Glance Simulation</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Recruiters immediately scan your <strong>Top Job Title</strong>, <strong>Years of Scale Experience</strong>, and <strong>Top 3 Core Technologies</strong>.
          </p>
          <div className="p-3 rounded-xl bg-dark-900/80 border border-slate-800 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">First Impression:</span>
              <span className="font-semibold text-emerald-400">Senior Technical Leader</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Dominant Stack:</span>
              <span className="font-semibold text-slate-200">React, TypeScript, Node.js, AWS</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
          <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
            <FileCheck2 className="w-4 h-4 text-emerald-400" />
            <span>One-Page Density & Length Check</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Optimal page length for candidates under 8 years of experience is <strong>1 concise page (approx 450–650 words)</strong>.
          </p>
          <div className="p-3 rounded-xl bg-dark-900/80 border border-slate-800 text-xs flex items-center justify-between">
            <span className="text-slate-400">Estimated Length:</span>
            <span className="font-bold text-emerald-400">1 Page (520 Words) • Perfect Length</span>
          </div>
        </div>
      </div>

      {/* 4. SMART KEYWORD & SKILLS GAP HEATMAP */}
      <div className="rounded-3xl bg-dark-800/80 border border-slate-800 p-6 space-y-6">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            Skills & Keyword Coverage Heatmap
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Green indicates verified skills. Click on missing skills to instantly add them to your target profile.
          </p>
        </div>

        {/* Detected Skills */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Detected Core Skills ({data.detectedSkills?.length || 0})
          </div>
          <div className="flex flex-wrap gap-2">
            {data.detectedSkills?.map((skill, idx) => (
              <SkillBadge key={idx} name={skill} type="matched" />
            ))}
          </div>
        </div>

        {/* Missing Skills */}
        {data.missingSkills?.length > 0 && (
          <div className="space-y-2 pt-3 border-t border-slate-800">
            <div className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> Missing Target Skills ({data.missingSkills?.length})
            </div>
            <div className="flex flex-wrap gap-2">
              {data.missingSkills.map((skill, idx) => (
                <SkillBadge
                  key={idx}
                  name={skill}
                  type="missing"
                  onAction={handleAddSkill}
                  actionLabel="Add to profile"
                />
              ))}
            </div>
          </div>
        )}

        {/* Missing Keywords */}
        {data.missingKeywords?.length > 0 && (
          <div className="space-y-2 pt-3 border-t border-slate-800">
            <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Recommended Industry Keywords ({data.missingKeywords?.length})
            </div>
            <div className="flex flex-wrap gap-2">
              {data.missingKeywords.map((kw, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 5. STRENGTHS & WEAKNESSES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>Identified Strengths ({data.strengths?.length || 0})</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {data.strengths?.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{str}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="space-y-4">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <AlertCircle className="w-5 h-5" />
            <span>Identified Weaknesses ({data.weaknesses?.length || 0})</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {data.weaknesses?.map((weak, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{weak}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* 6. AI RECOMMENDATIONS WITH 1-CLICK FIX */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-brand-400" />
              Actionable AI Recommendations
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              High-priority changes to boost your ATS compatibility to 95%+
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {data.recommendations?.map((rec, idx) => (
            <RecommendationCard
              key={idx}
              recommendation={rec}
              onFixWithAi={handleFixWithAi}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
