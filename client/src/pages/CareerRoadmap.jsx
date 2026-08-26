import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Check, 
  Cpu, 
  Layers, 
  ShieldCheck,
  TrendingUp,
  Briefcase
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import MotivationalQuoteCard from '../components/MotivationalQuoteCard';
import { careerService } from '../services/careerService';

const CareerRoadmap = () => {
  const [selectedRole, setSelectedRole] = useState('Software Engineer');
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(false);

  const availableRoles = [
    'Software Engineer',
    'Frontend Developer',
    'Full Stack Developer',
    'Data Scientist',
    'AI Engineer',
    'DevOps Engineer',
    'Product Manager',
  ];

  useEffect(() => {
    const fetchRoadmap = async () => {
      setLoading(true);
      try {
        const res = await careerService.getRoleRoadmap(selectedRole);
        setRoadmapData(res.roadmap);
      } catch (err) {
        console.warn('Using local roadmap fallback:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRoadmap();
  }, [selectedRole]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* 1. Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20 text-xs font-semibold mb-2">
          <Compass className="w-3.5 h-3.5 text-brand-400" />
          <span>Role Progression Architecture</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Career Roadmap & Milestone Tracker
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Step-by-step career blueprints from entry fundamentals to senior executive scale.
        </p>
      </div>

      {/* Motivational Bar */}
      <MotivationalQuoteCard compact={true} />

      {/* Role Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {availableRoles.map((role) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedRole === role
                ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-glow'
                : 'bg-dark-800 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Roadmap Timeline */}
      <div className="rounded-3xl bg-dark-800/80 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-white">{roadmapData?.title || `${selectedRole} Roadmap`}</h2>
          <p className="text-xs text-slate-400 mt-1">{roadmapData?.description}</p>
        </div>

        {/* Milestone Steps */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8">
          {(roadmapData?.levels || [
            { step: 1, title: 'Core Computer Science', status: 'completed', skills: ['Data Structures', 'Algorithms', 'Git', 'Clean Code'], desc: 'Master foundational DSA, memory management, and version control.' },
            { step: 2, title: 'Web Architecture & APIs', status: 'completed', skills: ['RESTful APIs', 'TypeScript', 'Node.js', 'PostgreSQL'], desc: 'Build scalable backend services, schema models, and authenticated APIs.' },
            { step: 3, title: 'Cloud & Containerization', status: 'in-progress', skills: ['Docker', 'AWS (EC2, S3, RDS)', 'Kubernetes'], desc: 'Deploy containerized multi-tier applications with high availability.' },
            { step: 4, title: 'System Design & Scale', status: 'upcoming', skills: ['Redis Caching', 'Microservices', 'Message Queues (Kafka)'], desc: 'Architect low-latency distributed systems handling 100k+ RPS.' },
            { step: 5, title: 'Production CI/CD & Observability', status: 'upcoming', skills: ['GitHub Actions', 'Datadog / Prometheus', 'Infrastructure as Code'], desc: 'Automate zero-downtime deployment pipelines with full telemetry.' }
          ]).map((lvl, idx) => {
            const isCompleted = lvl.status === 'completed';
            const isInProgress = lvl.status === 'in-progress';

            return (
              <div key={idx} className="relative group">
                {/* Timeline node icon */}
                <div 
                  className={`absolute -left-[35px] sm:-left-[43px] top-1.5 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                    isCompleted
                      ? 'bg-emerald-500 border-dark-900 text-dark-900 shadow-glow-emerald'
                      : isInProgress
                      ? 'bg-brand-600 border-brand-400 text-white animate-pulse shadow-glow'
                      : 'bg-dark-900 border-slate-700 text-slate-500'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : lvl.step}
                </div>

                {/* Card */}
                <div className={`p-5 rounded-2xl border transition-all ${
                  isInProgress 
                    ? 'bg-dark-900/90 border-brand-500/50 shadow-xl ring-1 ring-brand-500/30' 
                    : 'bg-dark-900/50 border-slate-800'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">Step {lvl.step}: {lvl.title}</span>
                      {isInProgress && (
                        <span className="px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 text-[10px] font-bold">
                          Current Focus
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">
                      {lvl.status.replace('-', ' ')}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{lvl.desc}</p>

                  {/* Skills badges */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-3">
                    {lvl.skills.map((sk, sIdx) => (
                      <span
                        key={sIdx}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${
                          isCompleted
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                            : isInProgress
                            ? 'bg-brand-500/20 text-brand-300 border-brand-500/30'
                            : 'bg-dark-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CareerRoadmap;
