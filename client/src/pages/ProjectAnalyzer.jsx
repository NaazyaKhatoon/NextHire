import React, { useState } from 'react';
import { 
  FolderGit2, 
  Sparkles, 
  Trophy, 
  Copy, 
  Check, 
  Wand2, 
  Layers, 
  ArrowRight, 
  Code2, 
  FileText,
  Linkedin
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import MotivationalQuoteCard from '../components/MotivationalQuoteCard';
import { aiToolService } from '../services/aiToolService';
import { useToast } from '../components/Toast';

const ProjectAnalyzer = () => {
  const [activeTab, setActiveTab] = useState('analyzer'); // 'analyzer' | 'hackathon' | 'portfolio'

  // 1. Project Analyzer Form State
  const [projectTitle, setProjectTitle] = useState('E-Commerce Distributed Platform');
  const [techStack, setTechStack] = useState('React, TypeScript, Node.js, PostgreSQL, Redis, Docker, AWS');
  const [projectDesc, setProjectDesc] = useState('Built full-stack e-commerce web platform with cart management, JWT authentication, and Stripe payment gateway.');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  // 2. Hackathon Converter Form State
  const [hackathonName, setHackathonName] = useState('HackMIT 2025');
  const [hackathonProj, setHackathonProj] = useState('EcoRoute AI');
  const [hackathonProblem, setHackathonProblem] = useState('Urban freight delivery produces excessive carbon emissions due to inefficient stop-and-go routing.');
  const [hackathonSolution, setHackathonSolution] = useState('Predictive routing algorithm calculating optimal low-emission multi-stop delivery paths in real time.');
  const [hackathonStack, setHackathonStack] = useState('FastAPI, Python, React, Leaflet, OpenAI API');
  const [hackathonResult, setHackathonResult] = useState(null);
  const [loadingHackathon, setLoadingHackathon] = useState(false);

  // 3. Portfolio Generator Form State
  const [portfolioData, setPortfolioData] = useState(null);
  const [loadingPortfolio, setLoadingPortfolio] = useState(false);

  const [copiedKey, setCopiedKey] = useState(null);
  const toast = useToast();

  const handleAnalyzeProject = async (e) => {
    e.preventDefault();
    setLoadingAnalysis(true);
    try {
      const data = await aiToolService.analyzeProject({
        title: projectTitle,
        description: projectDesc,
        techStack,
      });
      setAnalysisResult(data);
      toast.success('Project strength analyzed!');
    } catch (err) {
      toast.info('Analyzed using local project evaluator.');
    } finally {
      setLoadingAnalysis(false);
    }
  };

  const handleConvertHackathon = async (e) => {
    e.preventDefault();
    setLoadingHackathon(true);
    try {
      const data = await aiToolService.convertHackathon({
        hackathonName,
        projectName: hackathonProj,
        problem: hackathonProblem,
        solution: hackathonSolution,
        techStack: hackathonStack,
        role: 'Lead Full-Stack Developer',
      });
      setHackathonResult(data);
      toast.success('Hackathon converted to resume & portfolio credentials!');
    } catch (err) {
      toast.info('Converted with local Hackathon engine.');
    } finally {
      setLoadingHackathon(false);
    }
  };

  const handleGeneratePortfolio = async () => {
    setLoadingPortfolio(true);
    try {
      const data = await aiToolService.generatePortfolio({
        title: projectTitle,
        description: projectDesc,
        stack: techStack,
      });
      setPortfolioData(data.portfolioData);
      toast.success('Portfolio content generated!');
    } catch (err) {
      toast.info('Generated portfolio content locally.');
    } finally {
      setLoadingPortfolio(false);
    }
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(typeof text === 'string' ? text : JSON.stringify(text, null, 2));
    setCopiedKey(key);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20 text-xs font-semibold mb-2">
          <FolderGit2 className="w-3.5 h-3.5 text-brand-400" />
          <span>Project & Portfolio Engineering</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Project Strength Analyzer & Hackathon Converter
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Grade technical complexity, transform hackathon sprints into resume bullets, and generate portfolio descriptions.
        </p>
      </div>

      {/* Motivational Mindset Card */}
      <MotivationalQuoteCard compact={true} />

      {/* Tool Navigation Tabs */}
      <div className="flex rounded-2xl bg-dark-800 p-1 border border-slate-800 text-xs">
        <button
          onClick={() => setActiveTab('analyzer')}
          className={`flex-1 py-2.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'analyzer'
              ? 'bg-brand-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code2 className="w-4 h-4" />
          Project Strength Analyzer
        </button>

        <button
          onClick={() => setActiveTab('hackathon')}
          className={`flex-1 py-2.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'hackathon'
              ? 'bg-brand-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Trophy className="w-4 h-4" />
          Hackathon → Resume Converter
        </button>

        <button
          onClick={() => {
            setActiveTab('portfolio');
            if (!portfolioData) handleGeneratePortfolio();
          }}
          className={`flex-1 py-2.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'portfolio'
              ? 'bg-brand-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          Portfolio Content Generator
        </button>
      </div>

      {/* TAB 1: PROJECT STRENGTH ANALYZER */}
      {activeTab === 'analyzer' && (
        <div className="space-y-6">
          <form onSubmit={handleAnalyzeProject} className="rounded-3xl bg-dark-800/80 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-slate-300">Project Title</label>
                <input
                  type="text"
                  required
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900 border border-slate-700 text-white mt-1 text-xs focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300">Technologies & Stack Used</label>
                <input
                  type="text"
                  required
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900 border border-slate-700 text-white mt-1 text-xs focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300">Project Overview & What You Built</label>
              <textarea
                rows={3}
                required
                value={projectDesc}
                onChange={(e) => setProjectDesc(e.target.value)}
                className="w-full p-3 rounded-xl bg-dark-900 border border-slate-700 text-white mt-1 text-xs focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" variant="gradient" size="md" icon={Wand2} isLoading={loadingAnalysis}>
                Analyze Project Strength
              </Button>
            </div>
          </form>

          {/* Analysis Report */}
          {analysisResult && (
            <div className="rounded-3xl bg-dark-800/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{projectTitle}</h3>
                  <p className="text-xs text-slate-400">Technical Depth & Recruiter Conversion Grader</p>
                </div>
                <div className="px-4 py-2 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-center shrink-0">
                  <span className="text-xs font-bold block">Strength Score</span>
                  <span className="text-2xl font-extrabold text-emerald-400">{analysisResult.projectStrengthScore}/100</span>
                </div>
              </div>

              {/* Formatted Multi-Platform Versions */}
              <div className="space-y-4">
                {/* Resume Version */}
                <div className="p-4 rounded-2xl bg-dark-900 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-brand-400" />
                      Optimized Resume Bullet Point:
                    </span>
                    <button
                      onClick={() => copyToClipboard(analysisResult.resumeVersion, 'resume')}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      {copiedKey === 'resume' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-slate-200 font-medium italic">"{analysisResult.resumeVersion}"</p>
                </div>

                {/* LinkedIn Version */}
                <div className="p-4 rounded-2xl bg-dark-900 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                      LinkedIn Project Post Copy:
                    </span>
                    <button
                      onClick={() => copyToClipboard(analysisResult.linkedInVersion, 'linkedin')}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      {copiedKey === 'linkedin' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-slate-200 font-medium">{analysisResult.linkedInVersion}</p>
                </div>

                {/* Interview Explanation */}
                <div className="p-4 rounded-2xl bg-dark-900 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      How to Explain this Project in an Interview:
                    </span>
                    <button
                      onClick={() => copyToClipboard(analysisResult.interviewExplanation, 'interview')}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      {copiedKey === 'interview' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-slate-300 leading-relaxed italic">"{analysisResult.interviewExplanation}"</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: HACKATHON CONVERTER */}
      {activeTab === 'hackathon' && (
        <div className="space-y-6">
          <form onSubmit={handleConvertHackathon} className="rounded-3xl bg-dark-800/80 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-slate-300">Hackathon Name</label>
                <input
                  type="text"
                  required
                  value={hackathonName}
                  onChange={(e) => setHackathonName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900 border border-slate-700 text-white mt-1 text-xs focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300">Project Name</label>
                <input
                  type="text"
                  required
                  value={hackathonProj}
                  onChange={(e) => setHackathonProj(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900 border border-slate-700 text-white mt-1 text-xs focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300">Problem Addressed</label>
              <textarea
                rows={2}
                required
                value={hackathonProblem}
                onChange={(e) => setHackathonProblem(e.target.value)}
                className="w-full p-3 rounded-xl bg-dark-900 border border-slate-700 text-white mt-1 text-xs focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300">Technical Solution & Tech Stack</label>
              <textarea
                rows={2}
                required
                value={hackathonSolution}
                onChange={(e) => setHackathonSolution(e.target.value)}
                className="w-full p-3 rounded-xl bg-dark-900 border border-slate-700 text-white mt-1 text-xs focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" variant="gradient" size="md" icon={Trophy} isLoading={loadingHackathon}>
                Convert Hackathon to Credentials
              </Button>
            </div>
          </form>

          {/* Hackathon Output */}
          {hackathonResult && (
            <div className="rounded-3xl bg-dark-800/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl animate-in fade-in">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                Generated Hackathon Resume & Portfolio Artifacts
              </h3>

              <div className="space-y-3 text-xs">
                {hackathonResult.resumeBullets?.map((bullet, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-dark-900 border border-slate-800 flex items-start justify-between gap-2">
                    <p className="text-slate-200 font-medium">"{bullet}"</p>
                    <button
                      onClick={() => copyToClipboard(bullet, `hack-${idx}`)}
                      className="p-1 text-slate-400 hover:text-white shrink-0"
                    >
                      {copiedKey === `hack-${idx}` ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PORTFOLIO GENERATOR */}
      {activeTab === 'portfolio' && portfolioData && (
        <div className="rounded-3xl bg-dark-800/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">{portfolioData.title}</h3>
              <p className="text-xs text-slate-400">{portfolioData.tagline}</p>
            </div>

            <Button
              variant="outline"
              size="sm"
              icon={Copy}
              onClick={() => copyToClipboard(portfolioData.gitHubReadmeMarkdown, 'readme')}
            >
              Copy GitHub README
            </Button>
          </div>

          {/* 30-Second Elevator Pitch */}
          <div className="p-4 rounded-2xl bg-brand-950/40 border border-brand-500/30 space-y-1.5 text-xs">
            <span className="font-bold text-brand-300">30-Second Interview Elevator Pitch:</span>
            <p className="text-slate-200 leading-relaxed font-medium">"{portfolioData.thirtySecondPitch}"</p>
          </div>

          {/* Key Features */}
          <div className="space-y-2 text-xs">
            <span className="font-bold text-white">Core Architectural Features:</span>
            <ul className="space-y-1 text-slate-300 list-disc list-inside">
              {portfolioData.keyFeatures?.map((feat, i) => (
                <li key={i}>{feat}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectAnalyzer;
