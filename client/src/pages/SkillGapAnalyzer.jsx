import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  BookOpen, 
  FolderGit2, 
  Zap,
  TrendingUp,
  Layers
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import SkillRoadmapCard from '../components/SkillRoadmapCard';
import MotivationalQuoteCard from '../components/MotivationalQuoteCard';
import { careerService } from '../services/careerService';
import { useToast } from '../components/Toast';

const SkillGapAnalyzer = () => {
  const [targetRole, setTargetRole] = useState('Senior Full-Stack Engineer');
  const [loading, setLoading] = useState(true);
  const [gapData, setGapData] = useState(null);
  const [skillRoadmap, setSkillRoadmap] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [gapRes, progRes] = await Promise.all([
          careerService.getSkillGap(targetRole),
          careerService.getCareerProgress()
        ]);
        setGapData(gapRes);
        setSkillRoadmap(progRes.skillRoadmap || []);
      } catch (err) {
        console.warn('Using local fallback for skill gap:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [targetRole]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20 text-xs font-semibold mb-2">
            <Cpu className="w-3.5 h-3.5 text-brand-400" />
            <span>Target Role Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Skill Gap Analyzer & Personalized Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Compare your verified skillset against 2026 hiring benchmarks for <strong className="text-slate-200">{targetRole}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-dark-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-brand-500"
          >
            <option value="Senior Full-Stack Engineer">Senior Full-Stack Engineer</option>
            <option value="Frontend Platform Engineer">Frontend Platform Engineer</option>
            <option value="Cloud & DevOps Engineer">Cloud & DevOps Engineer</option>
            <option value="AI / LLM Systems Engineer">AI / LLM Systems Engineer</option>
            <option value="Senior Product Manager">Senior Product Manager</option>
          </select>
        </div>
      </div>

      {/* Motivational Mindset Card */}
      <MotivationalQuoteCard compact={true} />

      {/* 2. Three Categorization Cards: Essential / Recommended / Bonus */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Essential */}
        <div className="p-5 rounded-3xl bg-dark-800/80 border border-rose-500/30 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              Essential Skills
            </span>
            <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full font-bold">Mandatory</span>
          </div>
          <p className="text-[11px] text-slate-400">Required by 85%+ of job descriptions for this role.</p>
          <div className="space-y-1.5 pt-1">
            {(gapData?.categories?.essential?.skills || ['Kubernetes (K8s)', 'CI/CD Pipelines']).map((sk, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-dark-900 border border-rose-500/20 text-xs text-slate-200 font-semibold flex items-center justify-between">
                <span>{sk}</span>
                <span className="text-[10px] text-rose-400 font-mono">+12 PTS</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended */}
        <div className="p-5 rounded-3xl bg-dark-800/80 border border-sky-500/30 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
              Recommended
            </span>
            <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full font-bold">Differentiator</span>
          </div>
          <p className="text-[11px] text-slate-400">Distinguishes senior and lead candidates from mid-level.</p>
          <div className="space-y-1.5 pt-1">
            {(gapData?.categories?.recommended?.skills || ['GraphQL / Apollo', 'System Observability (Datadog)']).map((sk, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-dark-900 border border-sky-500/20 text-xs text-slate-200 font-semibold flex items-center justify-between">
                <span>{sk}</span>
                <span className="text-[10px] text-sky-400 font-mono">+8 PTS</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bonus */}
        <div className="p-5 rounded-3xl bg-dark-800/80 border border-purple-500/30 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              Bonus & High ROI
            </span>
            <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-bold">+15% Salary</span>
          </div>
          <p className="text-[11px] text-slate-400">Commands higher compensation bands in senior engineering.</p>
          <div className="space-y-1.5 pt-1">
            {(gapData?.categories?.bonus?.skills || ['Terraform (IaC)', 'Kafka Message Streams']).map((sk, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-dark-900 border border-purple-500/20 text-xs text-slate-200 font-semibold flex items-center justify-between">
                <span>{sk}</span>
                <span className="text-[10px] text-purple-400 font-mono">+6 PTS</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. "What Should I Learn First?" AI Priority Ranking */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-brand-950/60 via-dark-800 to-indigo-950/50 border border-brand-500/30 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 font-bold text-white text-sm">
          <Sparkles className="w-4 h-4 text-brand-400" />
          <span>AI Learning Priority Ranking: What Should I Learn First?</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(gapData?.aiRanking || [
            { rank: 1, skill: 'Kubernetes', why: 'Top requested container orchestrator across modern cloud microservices.', recommendedHours: '8 hours', projectIdea: 'Deploy 3-node Minikube cluster with Ingress.' },
            { rank: 2, skill: 'CI/CD Pipelines', why: 'Demonstrates enterprise production readiness and automated quality control.', recommendedHours: '4 hours', projectIdea: 'Set up GitHub Actions to run tests and build Docker images.' },
            { rank: 3, skill: 'System Observability', why: 'Proves capability to manage production SLA and track distributed latency.', recommendedHours: '6 hours', projectIdea: 'Instrument Prometheus metrics & Grafana dashboards.' },
          ]).map((item) => (
            <div key={item.rank} className="p-4 rounded-2xl bg-dark-900/90 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-extrabold text-[10px]">
                  #{item.rank} Priority
                </span>
                <span className="text-slate-400 text-[10px]">{item.recommendedHours}</span>
              </div>
              <h4 className="text-sm font-bold text-white">{item.skill}</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">{item.why}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Interactive Personalized Skill Roadmap */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            My Personalized Skill Roadmap
          </h3>
          <span className="text-xs text-slate-400">
            Track your progress across learning milestones
          </span>
        </div>

        <div className="space-y-3">
          {skillRoadmap.map((sk) => (
            <SkillRoadmapCard key={sk.id} skill={sk} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillGapAnalyzer;
