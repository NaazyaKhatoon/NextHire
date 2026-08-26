import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Briefcase, 
  GraduationCap, 
  FileCode, 
  Award, 
  CheckCircle2, 
  Wand2, 
  Plus, 
  Trash2,
  Cpu,
  Layers
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { aiService } from '../services/aiService';
import { useToast } from '../components/Toast';

const STEPS = [
  { id: 1, title: 'Personal Info', icon: User },
  { id: 2, title: 'Target Role', icon: Briefcase },
  { id: 3, title: 'Education', icon: GraduationCap },
  { id: 4, title: 'Experience', icon: Briefcase },
  { id: 5, title: 'Projects', icon: FileCode },
  { id: 6, title: 'Skills', icon: Layers },
  { id: 7, title: 'Certifications', icon: Award },
  { id: 8, title: 'Achievements', icon: Sparkles },
  { id: 9, title: 'AI Generation', icon: Wand2 },
];

const ResumeGenerator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: 'Alex Chen',
      email: 'alex.chen@email.com',
      phone: '(555) 019-2834',
      location: 'San Francisco, CA',
      title: 'Senior Full-Stack Engineer',
      linkedin: 'linkedin.com/in/alexchen-dev',
      github: 'github.com/alexchen',
      website: 'alexchen.dev',
      summary: '',
    },
    targetRole: 'Senior Full-Stack Engineer',
    experienceYears: '5+',
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        graduationYear: '2020',
        gpa: '3.85 / 4.0',
      }
    ],
    experience: [
      {
        title: 'Lead Full-Stack Engineer',
        company: 'TechNova Solutions',
        location: 'San Francisco, CA',
        startDate: '2022',
        endDate: 'Present',
        current: true,
        bullets: [
          'Spearheaded the architectural transition of monolithic SaaS platform into decoupled microservices using Node.js and Docker.',
          'Optimized frontend performance in React and Next.js, decreasing LCP load times by 48% across 500k monthly active users.'
        ]
      }
    ],
    projects: [
      {
        name: 'CloudScale AI Monitor',
        link: 'github.com/alexchen/cloudscale',
        description: 'Built real-time cloud resource telemetry dashboard in React, FastAPI, and TimescaleDB.'
      }
    ],
    skills: [
      'React.js', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'Python', 'FastAPI', 'PostgreSQL', 'Docker', 'AWS'
    ],
    certifications: [
      'AWS Certified Solutions Architect – Associate'
    ],
    achievements: [
      'Recipient of TechNova Innovation Award 2023 for Microservices Redesign'
    ]
  });

  const updatePersonalInfo = (field, val) => {
    setFormData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: val }
    }));
  };

  const handleNext = () => {
    if (currentStep < 9) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const generated = await aiService.generateFullResume(formData);
      const resumePayload = generated.resume || formData;

      // Save to localStorage for editor access
      localStorage.setItem('resumeai_current_editing_resume', JSON.stringify(resumePayload));
      toast.success('AI Resume generated successfully!');
      navigate('/resume-editor');
    } catch (err) {
      console.warn('AI generator fallback:', err.message);
      localStorage.setItem('resumeai_current_editing_resume', JSON.stringify(formData));
      toast.success('Resume prepared for editing!');
      navigate('/resume-editor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Wizard Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          <span>9-Step Guided AI Wizard</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          AI Resume Generator
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Step {currentStep} of 9: {STEPS[currentStep - 1].title}
        </p>
      </div>

      {/* Progress Stepper Bar */}
      <div className="flex items-center justify-between overflow-x-auto py-2 border-b border-slate-800 scrollbar-none gap-2">
        {STEPS.map((s) => {
          const isDone = currentStep > s.id;
          const isCurrent = currentStep === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setCurrentStep(s.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
                isCurrent
                  ? 'bg-brand-600 text-white shadow-glow'
                  : isDone
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : 'bg-dark-800 text-slate-400 border border-slate-700'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <s.icon className="w-3.5 h-3.5" />
              )}
              <span>{s.title}</span>
            </button>
          );
        })}
      </div>

      {/* Step Content Card */}
      <div className="rounded-3xl bg-dark-800/80 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
        {/* STEP 1: Personal Info */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <User className="w-5 h-5 text-brand-400" />
              Personal & Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Full Name</label>
                <input
                  type="text"
                  value={formData.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Email</label>
                <input
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Phone</label>
                <input
                  type="text"
                  value={formData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Location</label>
                <input
                  type="text"
                  value={formData.personalInfo.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">LinkedIn Profile</label>
                <input
                  type="text"
                  value={formData.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">GitHub / Portfolio URL</label>
                <input
                  type="text"
                  value={formData.personalInfo.github}
                  onChange={(e) => updatePersonalInfo('github', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Target Role */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-sky-400" />
              Target Role & Industry Focus
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300">Desired Job Title</label>
                <input
                  type="text"
                  value={formData.targetRole}
                  onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-brand-500 mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300">Years of Experience</label>
                <select
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-brand-500 mt-1"
                >
                  <option value="0-1">Entry Level (0 - 1 years)</option>
                  <option value="1-3">Junior to Mid (1 - 3 years)</option>
                  <option value="3-5">Mid-Senior (3 - 5 years)</option>
                  <option value="5+">Senior / Lead (5+ years)</option>
                  <option value="10+">Principal / Executive (10+ years)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Education */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-400" />
              Education History
            </h3>
            {formData.education.map((edu, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-dark-900 border border-slate-700/80 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400">Degree & Major</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => {
                        const next = [...formData.education];
                        next[idx].degree = e.target.value;
                        setFormData({ ...formData, education: next });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-dark-800 border border-slate-700 text-white text-xs mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400">University / College</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => {
                        const next = [...formData.education];
                        next[idx].institution = e.target.value;
                        setFormData({ ...formData, education: next });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-dark-800 border border-slate-700 text-white text-xs mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STEP 4: Experience */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-400" />
              Work Experience & Roles
            </h3>
            {formData.experience.map((exp, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-dark-900 border border-slate-700/80 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400">Position Title</label>
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) => {
                        const next = [...formData.experience];
                        next[idx].title = e.target.value;
                        setFormData({ ...formData, experience: next });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-dark-800 border border-slate-700 text-white text-xs mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400">Company Name</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => {
                        const next = [...formData.experience];
                        next[idx].company = e.target.value;
                        setFormData({ ...formData, experience: next });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-dark-800 border border-slate-700 text-white text-xs mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STEP 5: Projects */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileCode className="w-5 h-5 text-purple-400" />
              Key Projects & Open Source
            </h3>
            {formData.projects.map((proj, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-dark-900 border border-slate-700/80 space-y-2">
                <input
                  type="text"
                  value={proj.name}
                  onChange={(e) => {
                    const next = [...formData.projects];
                    next[idx].name = e.target.value;
                    setFormData({ ...formData, projects: next });
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-dark-800 border border-slate-700 text-white text-xs font-semibold"
                  placeholder="Project Name"
                />
                <textarea
                  value={proj.description}
                  onChange={(e) => {
                    const next = [...formData.projects];
                    next[idx].description = e.target.value;
                    setFormData({ ...formData, projects: next });
                  }}
                  className="w-full p-2.5 rounded-lg bg-dark-800 border border-slate-700 text-white text-xs"
                  rows={2}
                  placeholder="Project impact and technologies used..."
                />
              </div>
            ))}
          </div>
        )}

        {/* STEP 6: Skills */}
        {currentStep === 6 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-sky-400" />
              Core Competencies & Skills
            </h3>
            <div className="flex flex-wrap gap-2 p-4 rounded-2xl bg-dark-900 border border-slate-700">
              {formData.skills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1 bg-brand-500/20 text-brand-200 border border-brand-500/30 rounded-lg text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* STEP 7: Certifications */}
        {currentStep === 7 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Certifications & Accreditations
            </h3>
            <div className="space-y-2">
              {formData.certifications.map((cert, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={cert}
                  onChange={(e) => {
                    const next = [...formData.certifications];
                    next[idx] = e.target.value;
                    setFormData({ ...formData, certifications: next });
                  }}
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white text-xs"
                />
              ))}
            </div>
          </div>
        )}

        {/* STEP 8: Achievements */}
        {currentStep === 8 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              Honors, Awards & Key Highlights
            </h3>
            <div className="space-y-2">
              {formData.achievements.map((ach, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={ach}
                  onChange={(e) => {
                    const next = [...formData.achievements];
                    next[idx] = e.target.value;
                    setFormData({ ...formData, achievements: next });
                  }}
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white text-xs"
                />
              ))}
            </div>
          </div>
        )}

        {/* STEP 9: Generate Summary & Launch */}
        {currentStep === 9 && (
          <div className="text-center space-y-6 py-6">
            <div className="w-16 h-16 rounded-3xl bg-brand-600/20 border border-brand-500/40 flex items-center justify-center text-brand-400 mx-auto shadow-glow">
              <Wand2 className="w-8 h-8 animate-pulse" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h3 className="text-xl font-bold text-white">
                Ready to Assemble Your AI-Optimized Resume
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our AI will formulate high-impact action bullets, inject ATS keywords, and format your profile into an industry-grade A4 resume.
              </p>
            </div>

            <Button
              variant="glow"
              size="lg"
              icon={Sparkles}
              isLoading={loading}
              onClick={handleGenerate}
              className="px-8"
            >
              Assemble & Open in Live Editor
            </Button>
          </div>
        )}

        {/* Stepper Footer Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBack}
            disabled={currentStep === 1}
            icon={ArrowLeft}
          >
            Back
          </Button>

          {currentStep < 9 && (
            <Button
              variant="gradient"
              size="sm"
              onClick={handleNext}
              icon={ArrowRight}
              iconPosition="right"
            >
              Continue
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeGenerator;
