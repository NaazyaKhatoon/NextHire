import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  FileSearch, 
  FilePlus, 
  Briefcase, 
  Wand2, 
  BotMessageSquare, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  ArrowRight, 
  Edit3, 
  Trash2, 
  Download, 
  Copy,
  Zap,
  ShieldCheck,
  Flame,
  Trophy,
  Mic,
  BarChart2,
  FolderGit2,
  Layers,
  Compass,
  Cpu
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import ATSScore from '../components/ATSScore';
import ScoreCard from '../components/ScoreCard';
import MotivationalQuoteCard from '../components/MotivationalQuoteCard';
import NextBestActionCard from '../components/NextBestActionCard';
import CareerReadinessScore from '../components/CareerReadinessScore';
import DailyCareerChallenge from '../components/DailyCareerChallenge';
import { useAuth } from '../context/AuthContext';
import { resumeService } from '../services/resumeService';
import { careerService } from '../services/careerService';
import { formatDate, getScoreBg } from '../utils/formatters';
import { useToast } from '../components/Toast';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [resumes, setResumes] = useState([]);
  const [careerProgress, setCareerProgress] = useState(null);
  const [nextAction, setNextAction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resList, progData, actionData] = await Promise.all([
          resumeService.getResumes(),
          careerService.getCareerProgress(),
          careerService.getNextBestAction(user?.targetRole || 'Senior Full-Stack Engineer', 88)
        ]);

        if (resList && resList.length > 0) {
          setResumes(resList);
        } else {
          setResumes([
            {
              _id: 'demo-resume-1',
              title: 'Senior Software Engineer Resume',
              targetRole: 'Full Stack Software Engineer',
              atsScore: 88,
              readinessScore: 92,
              updatedAt: new Date().toISOString(),
              template: 'tech',
            },
            {
              _id: 'demo-resume-2',
              title: 'DevOps & Cloud Architect Resume',
              targetRole: 'DevOps / Cloud Engineer',
              atsScore: 82,
              readinessScore: 85,
              updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
              template: 'modern',
            }
          ]);
        }

        setCareerProgress(progData);
        setNextAction(actionData?.action);
      } catch (err) {
        console.warn('Using local dashboard state:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleDelete = (id) => {
    setResumes((prev) => prev.filter((r) => r._id !== id));
    toast.success('Resume removed from list');
  };

  const handleDuplicate = (resume) => {
    const duplicated = {
      ...resume,
      _id: 'resume-' + Date.now(),
      title: `${resume.title} (Copy)`,
      updatedAt: new Date().toISOString(),
    };
    setResumes((prev) => [duplicated, ...prev]);
    toast.success('Resume duplicated successfully');
  };

  const topResume = resumes[0] || {
    atsScore: 88,
    targetRole: user?.targetRole || 'Senior Full-Stack Engineer',
  };

  return (
    <div className="space-y-8 pb-16">
      {/* 1. TOP HEADER & GREETING */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>NextHire Career Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, {user?.name || 'Alex'}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Target Role: <strong className="text-slate-200">{user?.targetRole || 'Senior Full-Stack Engineer'}</strong> • Job Readiness in top 6%
          </p>
        </div>

        {/* Quick Action Button Group */}
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/ats-scanner">
            <Button variant="gradient" size="md" icon={FileSearch} className="shadow-glow">
              Scan Resume
            </Button>
          </Link>
          <Link to="/application-tracker">
            <Button variant="secondary" size="md" icon={Briefcase}>
              Track Job
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. NEXT BEST ACTION (Prominent Hero Card) */}
      <NextBestActionCard
        action={nextAction}
        targetRole={topResume.targetRole}
        atsScore={topResume.atsScore || 88}
      />

      {/* 3. CAREER READINESS SCORE & RADIAL BREAKDOWN */}
      <CareerReadinessScore
        score={careerProgress?.readinessScore || 91}
        breakdown={careerProgress?.breakdown || {}}
        targetRole={topResume.targetRole}
      />

      {/* 4. DAILY CAREER MOTIVATION & DAILY CHALLENGE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Daily Motivation Booster */}
        <div className="lg:col-span-6 h-full">
          <MotivationalQuoteCard className="h-full" />
        </div>

        {/* Daily Career Challenge with 7-Day Streak */}
        <div className="lg:col-span-6 h-full">
          <DailyCareerChallenge
            challenge={careerProgress?.todayChallenge}
            streakDays={careerProgress?.streakDays || 5}
            onChallengeComplete={() => {
              careerService.getCareerProgress().then(setCareerProgress);
            }}
          />
        </div>
      </div>

      {/* 5. STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Overall ATS Score</p>
            <h3 className="text-2xl font-extrabold text-emerald-400">{topResume.atsScore || 88}%</h3>
            <span className="text-[11px] text-emerald-400/90 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +14 pts optimized
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-glow-emerald">
            <Sparkles className="w-6 h-6" />
          </div>
        </Card>

        <Card className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Applications</p>
            <h3 className="text-2xl font-extrabold text-sky-400">18 Tracked</h3>
            <span className="text-[11px] text-slate-400">6 interviews in progress</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shadow-glow-cyan">
            <Briefcase className="w-6 h-6" />
          </div>
        </Card>

        <Card className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Skill Gap Solved</p>
            <h3 className="text-2xl font-extrabold text-amber-400">84% Stack</h3>
            <span className="text-[11px] text-slate-400">3 of 5 skills completed</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Cpu className="w-6 h-6" />
          </div>
        </Card>

        <Card className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Interview Score</p>
            <h3 className="text-2xl font-extrabold text-purple-400">86% STAR</h3>
            <span className="text-[11px] text-purple-400 font-medium">Mock sessions ready</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Mic className="w-6 h-6" />
          </div>
        </Card>
      </div>

      {/* 6. ADVANCED QUICK CAREER HUBS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <Link to="/skill-gap" className="p-4 rounded-2xl bg-dark-800/80 border border-slate-800 hover:border-brand-500/50 transition-all space-y-1.5 group">
          <Cpu className="w-5 h-5 text-brand-400 group-hover:scale-110 transition-transform" />
          <div className="font-bold text-white">Skill Gap & Roadmap</div>
          <div className="text-[11px] text-slate-400">Ranked learning priorities</div>
        </Link>

        <Link to="/interview-prep" className="p-4 rounded-2xl bg-dark-800/80 border border-slate-800 hover:border-sky-500/50 transition-all space-y-1.5 group">
          <Mic className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
          <div className="font-bold text-white">AI Interview Prep</div>
          <div className="text-[11px] text-slate-400">STAR questions & mock drill</div>
        </Link>

        <Link to="/project-analyzer" className="p-4 rounded-2xl bg-dark-800/80 border border-slate-800 hover:border-purple-500/50 transition-all space-y-1.5 group">
          <FolderGit2 className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
          <div className="font-bold text-white">Project & Hackathon</div>
          <div className="text-[11px] text-slate-400">Convert to portfolio artifacts</div>
        </Link>

        <Link to="/linkedin-analyzer" className="p-4 rounded-2xl bg-dark-800/80 border border-slate-800 hover:border-emerald-500/50 transition-all space-y-1.5 group">
          <BotMessageSquare className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
          <div className="font-bold text-white">LinkedIn & SEO</div>
          <div className="text-[11px] text-slate-400">Profile & resume consistency</div>
        </Link>
      </div>

      {/* 7. RECENT RESUMES LIST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand-400" />
            Recent Resumes & Drafts
          </h2>
          <Link to="/resume-history" className="text-xs font-semibold text-brand-400 hover:text-brand-300">
            View All ({resumes.length})
          </Link>
        </div>

        <div className="rounded-3xl bg-dark-800/80 border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-dark-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3.5">Resume Title</th>
                  <th className="px-6 py-3.5">Target Role</th>
                  <th className="px-6 py-3.5">ATS Score</th>
                  <th className="px-6 py-3.5">Last Updated</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {resumes.map((resume) => (
                  <tr key={resume._id} className="hover:bg-dark-750/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-white">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-400">
                          <Edit3 className="w-3.5 h-3.5" />
                        </div>
                        <span>{resume.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{resume.targetRole}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getScoreBg(resume.atsScore)}`}>
                        {resume.atsScore}% ATS Match
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{formatDate(resume.updatedAt)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/resume-editor?id=${resume._id}`}>
                          <button className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-dark-700 transition-colors" title="Edit in Studio">
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </Link>
                        <Link to={`/analysis-result?id=${resume._id}`}>
                          <button className="p-1.5 text-slate-400 hover:text-brand-300 rounded-lg hover:bg-dark-700 transition-colors" title="Analyze ATS">
                            <FileSearch className="w-4 h-4" />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDuplicate(resume)}
                          className="p-1.5 text-slate-400 hover:text-sky-300 rounded-lg hover:bg-dark-700 transition-colors"
                          title="Duplicate"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(resume._id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-dark-700 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
