import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Save, 
  Download, 
  Wand2, 
  Plus, 
  Trash2, 
  Sparkles, 
  Eye, 
  Layers, 
  RotateCcw, 
  Palette, 
  ChevronDown, 
  ChevronUp,
  Flame,
  ShieldCheck,
  GraduationCap,
  Minimize2,
  Check,
  FolderGit2,
  Briefcase,
  BookOpen,
  Award,
  User,
  Cpu,
  RefreshCw
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import ResumePreview from '../components/ResumePreview';
import RecruiterGlanceModal from '../components/RecruiterGlanceModal';
import ResumeHeatmap from '../components/ResumeHeatmap';
import TruthCheckerCard from '../components/TruthCheckerCard';
import AchievementDiscoveryModal from '../components/AchievementDiscoveryModal';
import ResumeCleanupModal from '../components/ResumeCleanupModal';
import OnePageOptimizerModal from '../components/OnePageOptimizerModal';
import ResumeDesignStudioModal from '../components/ResumeDesignStudioModal';
import MotivationalQuoteCard from '../components/MotivationalQuoteCard';
import { resumeService } from '../services/resumeService';
import { useToast } from '../components/Toast';

const PRESET_SAMPLE_RESUMES = {
  fullstack: {
    title: 'Senior Full-Stack Engineer Resume',
    template: 'tech',
    targetRole: 'Senior Full-Stack Engineer',
    fresherMode: false,
    personalInfo: {
      fullName: 'Alex Chen',
      title: 'Senior Full-Stack Software Engineer',
      email: 'alex.chen@email.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA (Open to Remote)',
      website: 'alexchen.dev',
      linkedin: 'linkedin.com/in/alexchen-dev',
      github: 'github.com/alexchen-cloud',
      summary: 'Results-driven Senior Full-Stack Engineer with 5+ years of experience architecting resilient distributed microservices and scalable web platforms. Expert across React, Node.js, Python, TypeScript, and AWS cloud infrastructure. Demonstrated track record slashing database query latencies by 45%, automating CI/CD workflows, and mentoring high-velocity engineering squads.',
    },
    skills: [
      { category: 'Frontend', items: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'Redux / Zustand'] },
      { category: 'Backend & APIs', items: ['Node.js', 'Express', 'Python', 'FastAPI', 'RESTful APIs', 'GraphQL'] },
      { category: 'Databases & Cache', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma ORM'] },
      { category: 'Cloud & DevOps', items: ['AWS (EC2, S3, ECS, RDS)', 'Docker', 'Kubernetes', 'CI/CD Pipelines (GitHub Actions)', 'Git'] },
    ],
    experience: [
      {
        id: 'exp-1',
        title: 'Lead Full-Stack Engineer',
        company: 'Apex Cloud Systems',
        location: 'San Francisco, CA',
        startDate: 'Jan 2023',
        endDate: 'Present',
        current: true,
        bullets: [
          'Architected and deployed 12 high-throughput RESTful backend microservices in Node.js and FastAPI, handling 1.5M+ daily requests with 99.98% uptime.',
          'Refactored primary customer dashboard using React and Tailwind CSS, slashing Largest Contentful Paint (LCP) latency by 48% across 500k monthly active users.',
          'Implemented distributed Redis caching tier and PostgreSQL query indexing, reducing p95 database response times by 38% across hot transaction tables.',
          'Spearheaded automated GitHub Actions CI/CD deployment pipelines to AWS ECS, accelerating weekly release cycles from 3 days to under 45 minutes.',
        ]
      },
      {
        id: 'exp-2',
        title: 'Full-Stack Software Developer',
        company: 'Vanguard Interactive Tech',
        location: 'Austin, TX',
        startDate: 'Jun 2020',
        endDate: 'Dec 2022',
        current: false,
        bullets: [
          'Developed end-to-end full-stack web features using React, Node.js, and MongoDB, supporting 200k+ active SaaS enterprise customers.',
          'Engineered secure JWT authentication and role-based access control (RBAC) protocols across 8 microservice customer endpoints.',
          'Containerized legacy monolith using Docker and Docker Compose, reducing developer onboarding environment setup time from 2 days to 15 minutes.',
        ]
      }
    ],
    projects: [
      {
        id: 'proj-1',
        name: 'NextHire — AI Career Acceleration Platform',
        techStack: 'React, Node.js, Python FastAPI, PostgreSQL, Tailwind CSS, AWS',
        liveUrl: 'https://nexthire.ai',
        githubUrl: 'https://github.com/alexchen-cloud/nexthire',
        bullets: [
          'Built full-stack AI career platform featuring deterministic multi-factor ATS resume scoring, live A4 document compilation, and vector PDF exports.',
          'Architected real-time WebSocket telemetry and Python FastAPI microservices, evaluating resume keywords against 500+ tech competencies in sub-100ms.',
        ]
      },
      {
        id: 'proj-2',
        name: 'Distributed Telemetry & Rate Limiting Engine',
        techStack: 'Go, Redis, Docker, Prometheus, Grafana',
        liveUrl: 'https://telemetry-demo.dev',
        githubUrl: 'https://github.com/alexchen-cloud/rate-limiter',
        bullets: [
          'Engineered high-throughput sliding window rate limiter capable of handling 50k requests per second with atomic Redis Lua scripts.',
          'Integrated Prometheus metrics exporters and Grafana dashboards for real-time cluster health and latency percentiles.',
        ]
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'B.S. in Computer Science',
        institution: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        graduationDate: 'May 2020',
        graduationYear: '2020',
        gpa: '3.85 / 4.00',
        coursework: 'Distributed Systems, Database Architecture, Operating Systems, Computer Networks, Algorithms',
      }
    ],
    certifications: [
      { name: 'AWS Certified Solutions Architect – Associate', issuer: 'Amazon Web Services', date: '2023' },
      { name: 'Certified Kubernetes Application Developer (CKAD)', issuer: 'CNCF', date: '2024' },
    ]
  },
  fresher: {
    title: 'Fresher / Graduate Software Developer Resume',
    template: 'fresh-grad',
    targetRole: 'Junior Software Engineer',
    fresherMode: true,
    personalInfo: {
      fullName: 'Jordan Taylor',
      title: 'Aspiring Software Engineer & Computer Science Graduate',
      email: 'jordan.taylor@email.com',
      phone: '+1 (555) 987-6543',
      location: 'Seattle, WA',
      website: 'jordantaylor.dev',
      linkedin: 'linkedin.com/in/jordantaylor',
      github: 'github.com/jordantaylor-dev',
      summary: 'High-achieving Computer Science Graduate (GPA 3.92/4.0) with strong foundation in full-stack web development, data structures, and algorithms. Built 4 production-grade projects in React, Node.js, and Python. Winner of 2 collegiate hackathons and eager to contribute to high-impact software engineering teams.',
    },
    skills: [
      { category: 'Programming Languages', items: ['Python', 'JavaScript (ES6+)', 'TypeScript', 'Java', 'C++', 'SQL'] },
      { category: 'Frameworks & Libraries', items: ['React.js', 'Node.js', 'Express', 'FastAPI', 'Tailwind CSS'] },
      { category: 'Developer Tools', items: ['Git', 'GitHub Actions', 'Docker', 'Postman', 'VS Code', 'Linux'] },
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of Washington',
        location: 'Seattle, WA',
        graduationDate: 'June 2024',
        graduationYear: '2024',
        gpa: '3.92 / 4.00 (Dean\'s Honor List)',
        coursework: 'Data Structures & Algorithms, Object-Oriented Software Engineering, Database Systems, Web Development',
      }
    ],
    projects: [
      {
        id: 'proj-1',
        name: 'EcoRoute — Low-Carbon Freight Routing Engine',
        techStack: 'Python, FastAPI, React, Leaflet Maps, OpenRouteService API',
        liveUrl: 'https://ecoroute-demo.dev',
        githubUrl: 'https://github.com/jordantaylor-dev/ecoroute',
        bullets: [
          'Won 1st Place at NW Hackathon 2024 (150+ teams); engineered geospatial routing algorithm cutting simulated freight carbon emissions by 24%.',
          'Developed responsive React map dashboard visualizing real-time traffic bottlenecks and low-emission waypoints in under 100ms.',
        ]
      },
      {
        id: 'proj-2',
        name: 'Campus Event Portal & Ticketing System',
        techStack: 'React, Node.js, Express, PostgreSQL, JWT Authentication',
        liveUrl: 'https://campus-events.dev',
        githubUrl: 'https://github.com/jordantaylor-dev/campus-events',
        bullets: [
          'Architected relational database schema in PostgreSQL supporting 3,000+ university student ticket registrations and QR pass check-ins.',
          'Built secure JWT authentication and automated email confirmation dispatch using Nodemailer.',
        ]
      }
    ],
    experience: [
      {
        id: 'exp-1',
        title: 'Software Engineering Intern',
        company: 'Pacific Tech Labs',
        location: 'Seattle, WA',
        startDate: 'Jun 2023',
        endDate: 'Sep 2023',
        current: false,
        bullets: [
          'Engineered reusable React UI components and connected 6 RESTful API endpoints for customer onboarding workflow.',
          'Wrote unit and integration test suites using Jest, elevating code coverage from 55% to 82%.',
        ]
      }
    ],
    certifications: [
      { name: 'Meta Front-End Developer Professional Certificate', issuer: 'Coursera / Meta', date: '2024' },
    ]
  }
};

const ResumeEditor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('resumeai_current_editing_resume');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return PRESET_SAMPLE_RESUMES.fullstack;
  });

  const [template, setTemplate] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('template') || resumeData.template || 'tech';
  });

  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'heatmap' | 'truth'
  const [fresherMode, setFresherMode] = useState(resumeData.fresherMode || false);
  const [saving, setSaving] = useState(false);
  const [customDesign, setCustomDesign] = useState({});

  // Modals
  const [isGlanceModalOpen, setIsGlanceModalOpen] = useState(false);
  const [isDiscoveryModalOpen, setIsDiscoveryModalOpen] = useState(false);
  const [isCleanupModalOpen, setIsCleanupModalOpen] = useState(false);
  const [isOnePageModalOpen, setIsOnePageModalOpen] = useState(false);
  const [isStudioModalOpen, setIsStudioModalOpen] = useState(false);

  // Accordion state
  const [openSections, setOpenSections] = useState({
    personal: true,
    skills: true,
    experience: true,
    projects: true,
    education: true,
    certifications: false,
  });

  // State for new skill tag input
  const [newSkillCat, setNewSkillCat] = useState('');
  const [newSkillItem, setNewSkillItem] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tParam = params.get('template');
    if (tParam) {
      setTemplate(tParam);
      setResumeData(prev => ({ ...prev, template: tParam }));
    }
  }, [location]);

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSave = () => {
    setSaving(true);
    const updated = { ...resumeData, template, fresherMode, customDesign };
    localStorage.setItem('resumeai_current_editing_resume', JSON.stringify(updated));
    setTimeout(() => {
      setSaving(false);
      toast.success('Resume saved successfully!');
    }, 300);
  };

  const handleLoadPreset = (presetKey) => {
    const preset = PRESET_SAMPLE_RESUMES[presetKey];
    if (preset) {
      setResumeData(preset);
      setTemplate(preset.template);
      setFresherMode(preset.fresherMode || false);
      toast.success(`Loaded "${preset.title}" preset into Live Studio!`);
    }
  };

  const handleFresherToggle = () => {
    const next = !fresherMode;
    setFresherMode(next);
    setResumeData(prev => ({ ...prev, fresherMode: next }));
    if (next) {
      toast.success('Fresher Mode: Projects and Education moved to top priority!');
    } else {
      toast.info('Standard Professional Mode Active');
    }
  };

  // Skill manipulations
  const handleAddSkillTag = (catIdx) => {
    if (!newSkillItem.trim()) return;
    const newSkills = [...resumeData.skills];
    if (typeof newSkills[catIdx] === 'object' && newSkills[catIdx].items) {
      newSkills[catIdx].items.push(newSkillItem.trim());
    } else if (typeof newSkills[catIdx] === 'string') {
      newSkills.push(newSkillItem.trim());
    }
    setResumeData(prev => ({ ...prev, skills: newSkills }));
    setNewSkillItem('');
  };

  const handleRemoveSkillTag = (catIdx, itemIdx) => {
    const newSkills = [...resumeData.skills];
    if (typeof newSkills[catIdx] === 'object' && newSkills[catIdx].items) {
      newSkills[catIdx].items.splice(itemIdx, 1);
    } else {
      newSkills.splice(catIdx, 1);
    }
    setResumeData(prev => ({ ...prev, skills: newSkills }));
  };

  const handleAddSkillCategory = () => {
    if (!newSkillCat.trim()) return;
    const newSkills = Array.isArray(resumeData.skills) ? [...resumeData.skills] : [];
    newSkills.push({ category: newSkillCat.trim(), items: [] });
    setResumeData(prev => ({ ...prev, skills: newSkills }));
    setNewSkillCat('');
    toast.success(`Added skill category "${newSkillCat}"`);
  };

  // Experience manipulations
  const handleAddExperience = () => {
    const newExp = {
      id: 'exp-' + Date.now(),
      title: 'Software Engineer',
      company: 'Company Name',
      location: 'City, State',
      startDate: 'Jan 2024',
      endDate: 'Present',
      current: true,
      bullets: [
        'Developed full-stack web applications using React and Node.js.',
        'Improved system throughput and reduced response times by 30%.'
      ]
    };
    setResumeData(prev => ({ ...prev, experience: [newExp, ...prev.experience] }));
    toast.success('Added new experience entry');
  };

  const handleDeleteExperience = (expIdx) => {
    const newExp = [...resumeData.experience];
    newExp.splice(expIdx, 1);
    setResumeData(prev => ({ ...prev, experience: newExp }));
    toast.info('Experience entry removed');
  };

  const handleAddExpBullet = (expIdx) => {
    const newExp = [...resumeData.experience];
    newExp[expIdx].bullets.push('Architected feature resulting in quantifiable performance improvement.');
    setResumeData(prev => ({ ...prev, experience: newExp }));
  };

  const handleDeleteExpBullet = (expIdx, bulletIdx) => {
    const newExp = [...resumeData.experience];
    newExp[expIdx].bullets.splice(bulletIdx, 1);
    setResumeData(prev => ({ ...prev, experience: newExp }));
  };

  // Project manipulations
  const handleAddProject = () => {
    const newProj = {
      id: 'proj-' + Date.now(),
      name: 'New Project Title',
      techStack: 'React, Node.js, PostgreSQL',
      liveUrl: 'https://myproject.dev',
      githubUrl: 'https://github.com/myusername/project',
      bullets: [
        'Architected full-stack web application with responsive UI and authenticated REST APIs.',
        'Deployed containerized services with automated testing and continuous integration.'
      ]
    };
    setResumeData(prev => ({ ...prev, projects: [newProj, ...(prev.projects || [])] }));
    toast.success('Added new project entry');
  };

  const handleDeleteProject = (pIdx) => {
    const newProj = [...(resumeData.projects || [])];
    newProj.splice(pIdx, 1);
    setResumeData(prev => ({ ...prev, projects: newProj }));
    toast.info('Project entry removed');
  };

  // Education manipulations
  const handleAddEducation = () => {
    const newEdu = {
      id: 'edu-' + Date.now(),
      degree: 'B.S. in Computer Science',
      institution: 'University Name',
      location: 'City, State',
      graduationDate: 'May 2024',
      gpa: '3.8 / 4.0',
      coursework: 'Data Structures, Database Systems, Cloud Computing',
    };
    setResumeData(prev => ({ ...prev, education: [newEdu, ...(resumeData.education || [])] }));
    toast.success('Added education entry');
  };

  const handleDeleteEducation = (eduIdx) => {
    const newEdu = [...(resumeData.education || [])];
    newEdu.splice(eduIdx, 1);
    setResumeData(prev => ({ ...prev, education: newEdu }));
  };

  return (
    <div className="space-y-6 pb-16">
      {/* 1. TOP STUDIO TOOLBAR */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-3xl bg-dark-850 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={resumeData.title}
            onChange={(e) => setResumeData(prev => ({ ...prev, title: e.target.value }))}
            className="text-base sm:text-lg font-extrabold text-white bg-transparent border-b border-transparent hover:border-slate-700 focus:border-brand-500 focus:outline-none px-1"
          />

          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold shrink-0">
            98% ATS Safe
          </span>
        </div>

        {/* Action Button Strip */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Quick Presets */}
          <div className="flex items-center bg-dark-900 rounded-xl border border-slate-700 p-0.5 text-[11px]">
            <button
              onClick={() => handleLoadPreset('fullstack')}
              className="px-2.5 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-dark-800 transition-colors"
            >
              Full-Stack Demo
            </button>
            <button
              onClick={() => handleLoadPreset('fresher')}
              className="px-2.5 py-1 rounded-lg text-purple-300 hover:text-white hover:bg-purple-900/40 transition-colors font-semibold"
            >
              Fresher Demo
            </button>
          </div>

          {/* Fresher Mode Toggle */}
          <button
            onClick={handleFresherToggle}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
              fresherMode
                ? 'bg-purple-600 text-white shadow-glow'
                : 'bg-dark-800 text-slate-400 hover:text-white border border-slate-700'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Fresher Mode</span>
          </button>

          {/* Recruiter Preview */}
          <Button size="sm" variant="outline" icon={Eye} onClick={() => setIsGlanceModalOpen(true)}>
            Recruiter Glance
          </Button>

          {/* Achievement Discovery */}
          <Button size="sm" variant="outline" icon={Sparkles} onClick={() => setIsDiscoveryModalOpen(true)}>
            Discover
          </Button>

          {/* 1-Click Cleanup */}
          <Button size="sm" variant="outline" icon={Wand2} onClick={() => setIsCleanupModalOpen(true)}>
            Cleanup
          </Button>

          {/* Fit 1-Page */}
          <Button size="sm" variant="outline" icon={Minimize2} onClick={() => setIsOnePageModalOpen(true)}>
            Fit 1-Page
          </Button>

          {/* Design Studio */}
          <Button size="sm" variant="outline" icon={Palette} onClick={() => setIsStudioModalOpen(true)}>
            Studio
          </Button>

          {/* Save */}
          <Button size="sm" variant="gradient" icon={Save} isLoading={saving} onClick={handleSave} className="shadow-glow">
            Save
          </Button>
        </div>
      </div>

      {/* Motivational Mindset Card */}
      <MotivationalQuoteCard compact={true} />

      {/* 2. Sub-Tabs: Live Editor / Smart Heatmap / Truth Checker */}
      <div className="flex rounded-2xl bg-dark-800 p-1 border border-slate-800 text-xs">
        <button
          onClick={() => setActiveTab('editor')}
          className={`flex-1 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'editor' ? 'bg-brand-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Live Interactive Studio
        </button>

        <button
          onClick={() => setActiveTab('heatmap')}
          className={`flex-1 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'heatmap' ? 'bg-brand-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          Smart Resume Heatmap
        </button>

        <button
          onClick={() => setActiveTab('truth')}
          className={`flex-1 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'truth' ? 'bg-brand-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          Truth & Anti-Hallucination Guard
        </button>
      </div>

      {/* 3. MAIN SPLIT SCREEN VIEW */}
      {activeTab === 'editor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Form Accordions */}
          <div className="lg:col-span-6 space-y-4">
            {/* Template Selector Dropdown */}
            <div className="p-4 rounded-2xl bg-dark-800/80 border border-slate-800 flex items-center justify-between gap-3 text-xs">
              <span className="font-bold text-slate-300">Active ATS Layout:</span>
              <select
                value={template}
                onChange={(e) => {
                  setTemplate(e.target.value);
                  setResumeData(prev => ({ ...prev, template: e.target.value }));
                }}
                className="px-3 py-1.5 rounded-xl bg-dark-900 border border-slate-700 text-white font-semibold text-xs focus:ring-2 focus:ring-brand-500"
              >
                <option value="tech">Software Engineer Pro</option>
                <option value="modern">Modern Pro</option>
                <option value="minimal">Minimalist Clean</option>
                <option value="corporate">Executive Corporate</option>
                <option value="ai-engineer">AI & Data Scientist</option>
                <option value="fresh-grad">Fresh Graduate & Placement</option>
                <option value="creative">Modern Creative</option>
                <option value="ats-classic">ATS Classic Universal</option>
                <option value="devops-cloud">DevOps & SRE Platform</option>
                <option value="consultant">Strategy Consultant</option>
                <option value="marketing-growth">Growth & Product Marketing</option>
                <option value="clean-slate">Clean Slate Indigo</option>
              </select>
            </div>

            {/* Accordion 1: Personal Info */}
            <div className="rounded-2xl bg-dark-800/80 border border-slate-800 overflow-hidden">
              <button
                type="button"
                onClick={() => toggleSection('personal')}
                className="w-full p-4 flex items-center justify-between text-left font-bold text-white text-xs bg-dark-850 hover:bg-dark-800 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4 text-brand-400" />
                  1. Personal & Contact Information
                </span>
                {openSections.personal ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {openSections.personal && (
                <div className="p-4 space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-400 font-semibold">Full Name</label>
                      <input
                        type="text"
                        value={resumeData.personalInfo.fullName}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, fullName: e.target.value }
                        }))}
                        className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white mt-1 text-xs focus:ring-2 focus:ring-brand-500"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 font-semibold">Headline / Role Title</label>
                      <input
                        type="text"
                        value={resumeData.personalInfo.title}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, title: e.target.value }
                        }))}
                        className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white mt-1 text-xs focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-400 font-semibold">Email</label>
                      <input
                        type="email"
                        value={resumeData.personalInfo.email}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, email: e.target.value }
                        }))}
                        className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white mt-1 text-xs focus:ring-2 focus:ring-brand-500"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 font-semibold">Phone</label>
                      <input
                        type="text"
                        value={resumeData.personalInfo.phone}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, phone: e.target.value }
                        }))}
                        className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white mt-1 text-xs focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-400 font-semibold">Location</label>
                      <input
                        type="text"
                        value={resumeData.personalInfo.location}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, location: e.target.value }
                        }))}
                        className="w-full px-2.5 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white mt-1 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-semibold">LinkedIn URL</label>
                      <input
                        type="text"
                        value={resumeData.personalInfo.linkedin}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, linkedin: e.target.value }
                        }))}
                        className="w-full px-2.5 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white mt-1 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-semibold">GitHub / Portfolio</label>
                      <input
                        type="text"
                        value={resumeData.personalInfo.github}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, github: e.target.value }
                        }))}
                        className="w-full px-2.5 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white mt-1 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-semibold">Professional Summary</label>
                    <textarea
                      rows={3}
                      value={resumeData.personalInfo.summary}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, summary: e.target.value }
                      }))}
                      className="w-full p-3 rounded-xl bg-dark-900 border border-slate-700 text-white mt-1 text-xs leading-relaxed focus:ring-2 focus:ring-brand-500 font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 2: Skills with Interactive Category & Tag Builder */}
            <div className="rounded-2xl bg-dark-800/80 border border-slate-800 overflow-hidden">
              <button
                type="button"
                onClick={() => toggleSection('skills')}
                className="w-full p-4 flex items-center justify-between text-left font-bold text-white text-xs bg-dark-850 hover:bg-dark-800 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  2. Technical Skills & Stack Categories
                </span>
                {openSections.skills ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {openSections.skills && (
                <div className="p-4 space-y-4 text-xs">
                  {Array.isArray(resumeData.skills) && resumeData.skills.map((cat, catIdx) => (
                    <div key={catIdx} className="p-3 rounded-xl bg-dark-900 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between font-bold text-slate-200">
                        <span>{typeof cat === 'object' ? cat.category : 'Skill Category'}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newS = [...resumeData.skills];
                            newS.splice(catIdx, 1);
                            setResumeData(prev => ({ ...prev, skills: newS }));
                          }}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {(typeof cat === 'object' ? cat.items || [] : [cat]).map((item, itemIdx) => (
                          <span
                            key={itemIdx}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-800 text-slate-200 border border-slate-700 text-[11px] font-medium"
                          >
                            <span>{item}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveSkillTag(catIdx, itemIdx)}
                              className="text-slate-400 hover:text-rose-400"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>

                      {/* Add Tag to Category */}
                      {typeof cat === 'object' && (
                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="text"
                            placeholder="Add skill (e.g. Docker, Redis)..."
                            value={newSkillItem}
                            onChange={(e) => setNewSkillItem(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddSkillTag(catIdx);
                              }
                            }}
                            className="flex-1 px-3 py-1.5 rounded-lg bg-dark-850 border border-slate-700 text-white text-xs"
                          />
                          <Button size="sm" variant="secondary" onClick={() => handleAddSkillTag(catIdx)}>
                            Add Tag
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Add New Category */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                    <input
                      type="text"
                      placeholder="New Category (e.g. DevOps, Cloud, Machine Learning)..."
                      value={newSkillCat}
                      onChange={(e) => setNewSkillCat(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white text-xs"
                    />
                    <Button size="sm" variant="outline" icon={Plus} onClick={handleAddSkillCategory}>
                      Add Category
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 3: Work Experience */}
            <div className="rounded-2xl bg-dark-800/80 border border-slate-800 overflow-hidden">
              <div className="p-4 flex items-center justify-between bg-dark-850 border-b border-slate-800">
                <button
                  type="button"
                  onClick={() => toggleSection('experience')}
                  className="flex items-center gap-2 font-bold text-white text-xs"
                >
                  <Briefcase className="w-4 h-4 text-sky-400" />
                  <span>3. Work Experience & Employment ({resumeData.experience?.length || 0})</span>
                </button>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" icon={Plus} onClick={handleAddExperience}>
                    Add Job
                  </Button>
                  <button onClick={() => toggleSection('experience')} className="text-slate-400 p-1">
                    {openSections.experience ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {openSections.experience && (
                <div className="p-4 space-y-4 text-xs">
                  {resumeData.experience?.map((exp, expIdx) => (
                    <div key={exp.id || expIdx} className="p-4 rounded-xl bg-dark-900 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">Role #{expIdx + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteExperience(expIdx)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] text-slate-400">Job Title</label>
                          <input
                            type="text"
                            value={exp.title}
                            onChange={(e) => {
                              const newExp = [...resumeData.experience];
                              newExp[expIdx].title = e.target.value;
                              setResumeData(prev => ({ ...prev, experience: newExp }));
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-dark-850 border border-slate-700 text-white mt-0.5 text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-slate-400">Company Name</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => {
                              const newExp = [...resumeData.experience];
                              newExp[expIdx].company = e.target.value;
                              setResumeData(prev => ({ ...prev, experience: newExp }));
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-dark-850 border border-slate-700 text-white mt-0.5 text-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-400">Start Date</label>
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) => {
                              const newExp = [...resumeData.experience];
                              newExp[expIdx].startDate = e.target.value;
                              setResumeData(prev => ({ ...prev, experience: newExp }));
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-dark-850 border border-slate-700 text-white mt-0.5 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400">End Date</label>
                          <input
                            type="text"
                            value={exp.endDate}
                            onChange={(e) => {
                              const newExp = [...resumeData.experience];
                              newExp[expIdx].endDate = e.target.value;
                              setResumeData(prev => ({ ...prev, experience: newExp }));
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-dark-850 border border-slate-700 text-white mt-0.5 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400">Location</label>
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) => {
                              const newExp = [...resumeData.experience];
                              newExp[expIdx].location = e.target.value;
                              setResumeData(prev => ({ ...prev, experience: newExp }));
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-dark-850 border border-slate-700 text-white mt-0.5 text-xs"
                          />
                        </div>
                      </div>

                      {/* Bullets with AI Rewrite */}
                      <div className="space-y-2 pt-1 border-t border-slate-800">
                        <label className="text-[10px] font-bold text-slate-300">Accomplishment Bullets:</label>
                        {exp.bullets?.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2">
                            <textarea
                              rows={2}
                              value={bullet}
                              onChange={(e) => {
                                const newExp = [...resumeData.experience];
                                newExp[expIdx].bullets[bIdx] = e.target.value;
                                setResumeData(prev => ({ ...prev, experience: newExp }));
                              }}
                              className="flex-1 p-2 rounded-lg bg-dark-850 border border-slate-700 text-white text-xs leading-relaxed font-mono"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                navigate('/ai-rewriter', {
                                  state: { bulletToRewrite: bullet, targetRole: resumeData.targetRole }
                                });
                              }}
                              className="p-2 text-brand-400 hover:text-white rounded-lg bg-dark-800 hover:bg-brand-600/30 border border-brand-500/30 shrink-0 transition-colors"
                              title="Rewrite bullet with AI"
                            >
                              <Wand2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteExpBullet(expIdx, bIdx)}
                              className="p-2 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-dark-800 shrink-0"
                              title="Remove bullet"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}

                        <Button size="sm" variant="secondary" icon={Plus} onClick={() => handleAddExpBullet(expIdx)}>
                          Add Bullet Point
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion 4: Key Projects */}
            <div className="rounded-2xl bg-dark-800/80 border border-slate-800 overflow-hidden">
              <div className="p-4 flex items-center justify-between bg-dark-850 border-b border-slate-800">
                <button
                  type="button"
                  onClick={() => toggleSection('projects')}
                  className="flex items-center gap-2 font-bold text-white text-xs"
                >
                  <FolderGit2 className="w-4 h-4 text-purple-400" />
                  <span>4. Key Engineering Projects ({resumeData.projects?.length || 0})</span>
                </button>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" icon={Plus} onClick={handleAddProject}>
                    Add Project
                  </Button>
                  <button onClick={() => toggleSection('projects')} className="text-slate-400 p-1">
                    {openSections.projects ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {openSections.projects && (
                <div className="p-4 space-y-4 text-xs">
                  {resumeData.projects?.map((proj, pIdx) => (
                    <div key={proj.id || pIdx} className="p-4 rounded-xl bg-dark-900 border border-slate-800 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">Project #{pIdx + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteProject(pIdx)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] text-slate-400">Project Name</label>
                          <input
                            type="text"
                            value={proj.name}
                            onChange={(e) => {
                              const newProj = [...resumeData.projects];
                              newProj[pIdx].name = e.target.value;
                              setResumeData(prev => ({ ...prev, projects: newProj }));
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-dark-850 border border-slate-700 text-white mt-0.5 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400">Tech Stack</label>
                          <input
                            type="text"
                            value={proj.techStack}
                            onChange={(e) => {
                              const newProj = [...resumeData.projects];
                              newProj[pIdx].techStack = e.target.value;
                              setResumeData(prev => ({ ...prev, projects: newProj }));
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-dark-850 border border-slate-700 text-white mt-0.5 text-xs"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        {proj.bullets?.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2">
                            <textarea
                              rows={2}
                              value={bullet}
                              onChange={(e) => {
                                const newProj = [...resumeData.projects];
                                newProj[pIdx].bullets[bIdx] = e.target.value;
                                setResumeData(prev => ({ ...prev, projects: newProj }));
                              }}
                              className="flex-1 p-2 rounded-lg bg-dark-850 border border-slate-700 text-white text-xs leading-relaxed font-mono"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newProj = [...resumeData.projects];
                                newProj[pIdx].bullets.splice(bIdx, 1);
                                setResumeData(prev => ({ ...prev, projects: newProj }));
                              }}
                              className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg shrink-0"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion 5: Education */}
            <div className="rounded-2xl bg-dark-800/80 border border-slate-800 overflow-hidden">
              <div className="p-4 flex items-center justify-between bg-dark-850 border-b border-slate-800">
                <button
                  type="button"
                  onClick={() => toggleSection('education')}
                  className="flex items-center gap-2 font-bold text-white text-xs"
                >
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>5. Education ({resumeData.education?.length || 0})</span>
                </button>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" icon={Plus} onClick={handleAddEducation}>
                    Add Degree
                  </Button>
                  <button onClick={() => toggleSection('education')} className="text-slate-400 p-1">
                    {openSections.education ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {openSections.education && (
                <div className="p-4 space-y-3 text-xs">
                  {resumeData.education?.map((edu, eduIdx) => (
                    <div key={edu.id || eduIdx} className="p-3.5 rounded-xl bg-dark-900 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">Degree #{eduIdx + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteEducation(eduIdx)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] text-slate-400">Degree & Major</label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => {
                              const newEdu = [...resumeData.education];
                              newEdu[eduIdx].degree = e.target.value;
                              setResumeData(prev => ({ ...prev, education: newEdu }));
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-dark-850 border border-slate-700 text-white mt-0.5 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400">University / College</label>
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => {
                              const newEdu = [...resumeData.education];
                              newEdu[eduIdx].institution = e.target.value;
                              setResumeData(prev => ({ ...prev, education: newEdu }));
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-dark-850 border border-slate-700 text-white mt-0.5 text-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] text-slate-400">Graduation Year / Date</label>
                          <input
                            type="text"
                            value={edu.graduationDate || edu.graduationYear}
                            onChange={(e) => {
                              const newEdu = [...resumeData.education];
                              newEdu[eduIdx].graduationDate = e.target.value;
                              setResumeData(prev => ({ ...prev, education: newEdu }));
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-dark-850 border border-slate-700 text-white mt-0.5 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400">GPA (Optional)</label>
                          <input
                            type="text"
                            value={edu.gpa}
                            onChange={(e) => {
                              const newEdu = [...resumeData.education];
                              newEdu[eduIdx].gpa = e.target.value;
                              setResumeData(prev => ({ ...prev, education: newEdu }));
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-dark-850 border border-slate-700 text-white mt-0.5 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Live A4 Paper Preview */}
          <div className="lg:col-span-6 lg:sticky lg:top-20">
            <ResumePreview
              resumeData={resumeData}
              template={template}
              fresherMode={fresherMode}
              customDesign={customDesign}
              onTemplateChange={(newT) => {
                setTemplate(newT);
                setResumeData(prev => ({ ...prev, template: newT }));
              }}
            />
          </div>
        </div>
      )}

      {/* TAB 2: SMART RESUME HEATMAP */}
      {activeTab === 'heatmap' && (
        <ResumeHeatmap
          resumeText={resumeData.personalInfo.summary + ' ' + (resumeData.experience || []).map(e => e.bullets.join(' ')).join(' ')}
          onFixBullet={(bullet) => navigate('/ai-rewriter', { state: { bulletToRewrite: bullet } })}
        />
      )}

      {/* TAB 3: TRUTH CHECKER */}
      {activeTab === 'truth' && (
        <TruthCheckerCard
          resumeText={resumeData.personalInfo.summary + ' ' + (resumeData.experience || []).map(e => e.bullets.join(' ')).join(' ')}
          targetRole={resumeData.targetRole}
        />
      )}

      {/* MODALS */}
      <RecruiterGlanceModal
        isOpen={isGlanceModalOpen}
        onClose={() => setIsGlanceModalOpen(false)}
        candidateName={resumeData.personalInfo.fullName}
        targetRole={resumeData.targetRole}
      />

      <AchievementDiscoveryModal
        isOpen={isDiscoveryModalOpen}
        onClose={() => setIsDiscoveryModalOpen(false)}
        targetRole={resumeData.targetRole}
      />

      <ResumeCleanupModal
        isOpen={isCleanupModalOpen}
        onClose={() => setIsCleanupModalOpen(false)}
        onApplyCleanup={() => {
          // Clean up spacing and trim bullets
          const cleanedExp = (resumeData.experience || []).map(exp => ({
            ...exp,
            bullets: exp.bullets.map(b => b.trim().endsWith('.') ? b.trim() : b.trim() + '.')
          }));
          setResumeData(prev => ({ ...prev, experience: cleanedExp }));
        }}
      />

      <OnePageOptimizerModal
        isOpen={isOnePageModalOpen}
        onClose={() => setIsOnePageModalOpen(false)}
        onApplyOnePage={() => {
          setCustomDesign(prev => ({
            ...prev,
            marginSize: '12mm',
            lineSpacing: '1.28',
          }));
        }}
      />

      <ResumeDesignStudioModal
        isOpen={isStudioModalOpen}
        onClose={() => setIsStudioModalOpen(false)}
        onApplyCustomDesign={(design) => {
          setCustomDesign(design);
        }}
      />
    </div>
  );
};

export default ResumeEditor;
