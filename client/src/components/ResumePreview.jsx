import React, { useRef, useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Globe, 
  Download, 
  Printer, 
  ZoomIn, 
  ZoomOut,
  Sparkles,
  Award,
  BookOpen,
  FolderGit2,
  CheckCircle2,
  Briefcase
} from 'lucide-react';
import Button from './Button';
import { useToast } from './Toast';

export const TEMPLATES = [
  { id: 'modern', name: 'Modern Pro', category: 'Tech & Modern', color: '#6366F1' },
  { id: 'minimal', name: 'Minimalist Clean', category: 'Universal ATS', color: '#0EA5E9' },
  { id: 'corporate', name: 'Executive Corporate', category: 'Management', color: '#3B82F6' },
  { id: 'tech', name: 'Software Engineer', category: 'Engineering', color: '#10B981' },
  { id: 'ai-engineer', name: 'AI & Data Scientist', category: 'AI & Data', color: '#8B5CF6' },
  { id: 'fresh-grad', name: 'Fresh Graduate & Placement', category: 'Entry Level', color: '#EC4899' },
  { id: 'creative', name: 'Modern Creative', category: 'Design & Product', color: '#F59E0B' },
  { id: 'ats-classic', name: 'ATS Classic Universal', category: 'Universal ATS', color: '#475569' },
  { id: 'devops-cloud', name: 'DevOps & SRE Platform', category: 'Tech & Engineering', color: '#06B6D4' },
  { id: 'consultant', name: 'Strategy Consultant', category: 'Management', color: '#334155' },
  { id: 'marketing-growth', name: 'Growth & Product Marketing', category: 'Design & Product', color: '#F43F5E' },
  { id: 'clean-slate', name: 'Clean Slate Indigo', category: 'Universal ATS', color: '#4F46E5' },
];

const ResumePreview = ({
  resumeData,
  data: incomingData,
  template = 'tech',
  onTemplateChange,
  showControls = true,
  fresherMode = false,
  customDesign = {},
  onEdit,
}) => {
  const [zoom, setZoom] = useState(100);
  const printRef = useRef(null);
  const toast = useToast();

  const rawData = incomingData || resumeData || {};

  const p = rawData.personalInfo || {
    fullName: 'Alex Chen',
    email: 'alex.chen@email.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    title: 'Senior Full-Stack Software Engineer',
    linkedin: 'linkedin.com/in/alexchen-dev',
    github: 'github.com/alexchen-cloud',
    website: 'alexchen.dev',
    summary: 'Results-driven Senior Full-Stack Engineer with 5+ years of experience architecting resilient distributed microservices and scalable web platforms. Expert across React, Node.js, Python, TypeScript, and AWS cloud infrastructure. Demonstrated track record slashing database query latencies by 45%, automating CI/CD workflows, and mentoring high-velocity engineering squads.',
  };

  // Normalize Skills: support array of strings OR array of { category, items }
  const rawSkills = rawData.skills || [
    { category: 'Frontend', items: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'Redux'] },
    { category: 'Backend & APIs', items: ['Node.js', 'Express', 'Python', 'FastAPI', 'RESTful APIs', 'GraphQL'] },
    { category: 'Databases & Cloud', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'CI/CD'] },
  ];

  let flatSkills = [];
  let categorizedSkills = [];

  if (Array.isArray(rawSkills)) {
    if (rawSkills.length > 0 && typeof rawSkills[0] === 'object' && rawSkills[0].category) {
      categorizedSkills = rawSkills;
      flatSkills = rawSkills.flatMap(s => s.items || []);
    } else if (rawSkills.length > 0 && typeof rawSkills[0] === 'string') {
      flatSkills = rawSkills;
      categorizedSkills = [{ category: 'Core Technical Competencies', items: rawSkills }];
    }
  }

  const experience = rawData.experience || [
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
  ];

  const projects = rawData.projects || [
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
  ];

  const education = rawData.education || [
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
  ];

  const certifications = rawData.certifications || [
    { name: 'AWS Certified Solutions Architect – Associate', issuer: 'Amazon Web Services', date: '2023' },
    { name: 'Certified Kubernetes Application Developer (CKAD)', issuer: 'CNCF', date: '2024' },
  ];

  const handlePrint = () => {
    window.print();
    toast.success('Opening print dialog for high-resolution vector PDF export');
  };

  // Custom typography & accent styles
  const activeFont = customDesign?.fontFamily || 'Inter, sans-serif';
  const activeAccent = customDesign?.accentColor || (
    template === 'tech' ? '#10B981' :
    template === 'minimal' ? '#0EA5E9' :
    template === 'corporate' ? '#1E293B' :
    template === 'ai-engineer' ? '#8B5CF6' :
    template === 'fresh-grad' ? '#EC4899' :
    template === 'creative' ? '#F59E0B' :
    template === 'devops-cloud' ? '#06B6D4' :
    template === 'consultant' ? '#334155' :
    template === 'marketing-growth' ? '#F43F5E' :
    template === 'clean-slate' ? '#4F46E5' :
    template === 'ats-classic' || template === 'classic' ? '#0F172A' : '#6366F1'
  );
  const activeMargin = customDesign?.marginSize || '15mm';
  const activeLineHeight = customDesign?.lineSpacing || '1.35';

  const isFresher = fresherMode || rawData.fresherMode;

  return (
    <div className="flex flex-col items-center w-full space-y-4">
      {/* Top Action Controls Bar */}
      {showControls && (
        <div className="w-full flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-dark-800 border border-slate-700/80 shadow-md">
          {/* Template Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Template:</span>
            <select
              value={template}
              onChange={(e) => onTemplateChange?.(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-dark-900 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {TEMPLATES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.category})
                </option>
              ))}
            </select>
          </div>

          {/* Zoom & Print Buttons */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-dark-900 rounded-xl border border-slate-700 p-0.5">
              <button
                type="button"
                onClick={() => setZoom((prev) => Math.max(60, prev - 10))}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono text-slate-300 px-2">{zoom}%</span>
              <button
                type="button"
                onClick={() => setZoom((prev) => Math.min(140, prev + 10))}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            <Button
              variant="gradient"
              size="sm"
              icon={Download}
              onClick={handlePrint}
            >
              Download PDF / Print
            </Button>
          </div>
        </div>
      )}

      {/* A4 Paper Canvas Container */}
      <div className="w-full overflow-x-auto flex justify-center p-2 sm:p-6 bg-dark-950/80 rounded-3xl border border-slate-800 shadow-inner">
        <div
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
          className="transition-transform duration-200"
        >
          {/* Printable A4 Resume Document */}
          <div
            ref={printRef}
            id="resume-document"
            style={{
              fontFamily: activeFont,
              padding: activeMargin,
              lineHeight: activeLineHeight,
            }}
            className="resume-print-area w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-2xl rounded-sm text-[10pt] leading-relaxed transition-all"
          >
            {/* ========================================================================= */}
            {/* HEADER SECTION (Universal + Dynamic Styling) */}
            {/* ========================================================================= */}
            {template === 'creative' ? (
              <div
                className="-m-[15mm] mb-5 p-[15mm] pb-5 text-white"
                style={{ background: `linear-gradient(135deg, ${activeAccent}, #4338CA)` }}
              >
                <h1 className="text-3xl font-extrabold tracking-tight">{p.fullName || 'Alex Chen'}</h1>
                {p.title && <p className="text-sm font-medium opacity-90 mt-0.5">{p.title}</p>}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[9pt] opacity-85 mt-2.5">
                  {p.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{p.email}</span>}
                  {p.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{p.phone}</span>}
                  {p.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{p.location}</span>}
                  {p.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" />{p.linkedin}</span>}
                  {p.github && <span className="flex items-center gap-1"><Github className="w-3 h-3" />{p.github}</span>}
                </div>
              </div>
            ) : template === 'minimal' ? (
              <div className="text-center pb-3 border-b border-neutral-300 mb-4">
                <h1 className="text-2xl font-light tracking-wide text-black uppercase">{p.fullName || 'Alex Chen'}</h1>
                {p.title && <p className="text-xs tracking-widest uppercase text-neutral-600 mt-0.5">{p.title}</p>}
                <p className="text-[8.5pt] text-neutral-600 mt-1">
                  {[p.email, p.phone, p.location, p.linkedin, p.github].filter(Boolean).join('  |  ')}
                </p>
              </div>
            ) : template === 'corporate' || template === 'consultant' ? (
              <div className="text-center border-b-2 border-slate-800 pb-3 mb-4 font-serif">
                <h1 className="text-3xl font-bold tracking-tight text-slate-950 uppercase">{p.fullName || 'Alex Chen'}</h1>
                {p.title && <p className="text-sm font-sans font-semibold text-slate-700 mt-0.5">{p.title}</p>}
                <p className="text-xs font-sans text-slate-600 mt-1.5">
                  {[p.location, p.phone, p.email, p.linkedin, p.website].filter(Boolean).join('  •  ')}
                </p>
              </div>
            ) : template === 'ats-classic' || template === 'classic' ? (
              <div className="text-center border-b-2 border-black pb-2.5 mb-4">
                <h1 className="text-2xl font-bold uppercase tracking-tight text-black">{p.fullName || 'Alex Chen'}</h1>
                {p.title && <p className="text-xs font-semibold text-slate-800 mt-0.5">{p.title}</p>}
                <p className="text-[9pt] text-slate-700 mt-1">
                  {[p.location, p.phone, p.email, p.linkedin, p.github].filter(Boolean).join(' | ')}
                </p>
              </div>
            ) : (
              /* MODERN / TECH / AI-ENGINEER / FRESH-GRAD / DEVOPS / CLEAN-SLATE */
              <div className="flex justify-between items-start border-b-2 pb-3 mb-4" style={{ borderColor: activeAccent }}>
                <div>
                  <h1 className="text-2xl font-extrabold tracking-tight text-slate-950 uppercase">{p.fullName || 'Alex Chen'}</h1>
                  {p.title && <p className="text-sm font-bold mt-0.5" style={{ color: activeAccent }}>{p.title}</p>}
                </div>
                <div className="text-right text-[8.5pt] text-slate-600 space-y-0.5">
                  <div>{[p.email, p.phone].filter(Boolean).join(' • ')}</div>
                  <div className="font-mono" style={{ color: activeAccent }}>{[p.github, p.linkedin].filter(Boolean).join(' • ')}</div>
                  <div>{p.location}</div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* SUMMARY SECTION */}
            {/* ========================================================================= */}
            {p.summary && (
              <div className="mb-4">
                <h2
                  className="text-xs font-bold uppercase tracking-wider border-b pb-0.5 mb-1.5 flex items-center gap-1.5"
                  style={{ color: activeAccent, borderColor: `${activeAccent}40` }}
                >
                  Professional Summary
                </h2>
                <p className="text-justify text-slate-700 leading-normal text-[9.5pt]">{p.summary}</p>
              </div>
            )}

            {/* ========================================================================= */}
            {/* SKILLS SECTION */}
            {/* ========================================================================= */}
            {categorizedSkills.length > 0 && (
              <div className="mb-4">
                <h2
                  className="text-xs font-bold uppercase tracking-wider border-b pb-0.5 mb-1.5 flex items-center gap-1.5"
                  style={{ color: activeAccent, borderColor: `${activeAccent}40` }}
                >
                  Technical Stack & Core Skills
                </h2>
                <div className="space-y-1 text-[9pt] text-slate-800">
                  {categorizedSkills.map((cat, idx) => (
                    <div key={idx} className="flex items-baseline gap-1.5">
                      <strong className="text-slate-900 font-bold shrink-0">{cat.category || 'Skills'}:</strong>
                      <span className="text-slate-700">
                        {Array.isArray(cat.items) ? cat.items.join(', ') : (cat.items || '')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* FRESHER MODE: EDUCATION & PROJECTS BEFORE EXPERIENCE */}
            {/* ========================================================================= */}
            {isFresher && (
              <>
                {/* Education First in Fresher Mode */}
                {education.length > 0 && (
                  <div className="mb-4">
                    <h2
                      className="text-xs font-bold uppercase tracking-wider border-b pb-0.5 mb-1.5 flex items-center gap-1.5"
                      style={{ color: activeAccent, borderColor: `${activeAccent}40` }}
                    >
                      Education & Academic Background
                    </h2>
                    {education.map((edu, idx) => (
                      <div key={idx} className="space-y-0.5 mb-2">
                        <div className="flex justify-between items-baseline font-bold text-slate-900">
                          <span>{edu.degree} — <span className="font-semibold text-slate-700">{edu.institution}</span></span>
                          <span className="text-[9pt] text-slate-500 font-normal">{edu.graduationDate || edu.graduationYear}</span>
                        </div>
                        <div className="text-[8.5pt] text-slate-600">
                          {edu.location && <span>{edu.location} • </span>}
                          {edu.gpa && <span><strong>GPA:</strong> {edu.gpa} • </span>}
                          {edu.coursework && <span><strong>Relevant Coursework:</strong> {edu.coursework}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Projects Second in Fresher Mode */}
                {projects.length > 0 && (
                  <div className="mb-4">
                    <h2
                      className="text-xs font-bold uppercase tracking-wider border-b pb-0.5 mb-1.5 flex items-center gap-1.5"
                      style={{ color: activeAccent, borderColor: `${activeAccent}40` }}
                    >
                      Key Engineering & Academic Projects
                    </h2>
                    {projects.map((proj, idx) => (
                      <div key={idx} className="space-y-1 mb-2.5">
                        <div className="flex justify-between items-baseline font-bold text-slate-900">
                          <span>{proj.name} {proj.techStack && <span className="text-[8.5pt] font-normal text-slate-500">| {proj.techStack}</span>}</span>
                          {(proj.liveUrl || proj.githubUrl || proj.link) && (
                            <span className="text-[8pt] font-mono" style={{ color: activeAccent }}>
                              {proj.liveUrl || proj.githubUrl || proj.link}
                            </span>
                          )}
                        </div>
                        {proj.description && <p className="text-[9pt] text-slate-700">{proj.description}</p>}
                        {proj.bullets?.length > 0 && (
                          <ul className="list-disc ml-4 space-y-0.5 text-slate-700 text-[9pt]">
                            {proj.bullets.map((b, bIdx) => <li key={bIdx}>{b}</li>)}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* ========================================================================= */}
            {/* WORK EXPERIENCE */}
            {/* ========================================================================= */}
            {experience.length > 0 && (
              <div className="mb-4">
                <h2
                  className="text-xs font-bold uppercase tracking-wider border-b pb-0.5 mb-1.5 flex items-center gap-1.5"
                  style={{ color: activeAccent, borderColor: `${activeAccent}40` }}
                >
                  {isFresher ? 'Internships & Work Experience' : 'Professional Work Experience'}
                </h2>
                {experience.map((exp, idx) => (
                  <div key={idx} className="space-y-0.5 mb-3">
                    <div className="flex justify-between items-baseline font-bold text-slate-900">
                      <span>{exp.title} • <span style={{ color: activeAccent }}>{exp.company}</span></span>
                      <span className="text-[8.5pt] text-slate-500 font-mono">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    {exp.location && <div className="text-[8.5pt] text-slate-500">{exp.location}</div>}
                    <ul className="list-disc ml-4 space-y-0.5 text-slate-700 text-[9pt] mt-1">
                      {exp.bullets?.map((b, bIdx) => (
                        <li key={bIdx} className="leading-snug">{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* ========================================================================= */}
            {/* STANDARD MODE: PROJECTS & EDUCATION */}
            {/* ========================================================================= */}
            {!isFresher && (
              <>
                {/* Projects */}
                {projects.length > 0 && (
                  <div className="mb-4">
                    <h2
                      className="text-xs font-bold uppercase tracking-wider border-b pb-0.5 mb-1.5 flex items-center gap-1.5"
                      style={{ color: activeAccent, borderColor: `${activeAccent}40` }}
                    >
                      Key Projects & Technical Implementations
                    </h2>
                    {projects.map((proj, idx) => (
                      <div key={idx} className="space-y-0.5 mb-2.5">
                        <div className="flex justify-between items-baseline font-bold text-slate-900">
                          <span>{proj.name} {proj.techStack && <span className="text-[8.5pt] font-normal text-slate-500">({proj.techStack})</span>}</span>
                          {(proj.liveUrl || proj.githubUrl || proj.link) && (
                            <span className="text-[8pt] font-mono" style={{ color: activeAccent }}>
                              {proj.liveUrl || proj.githubUrl || proj.link}
                            </span>
                          )}
                        </div>
                        {proj.description && <p className="text-[9pt] text-slate-700">{proj.description}</p>}
                        {proj.bullets?.length > 0 && (
                          <ul className="list-disc ml-4 space-y-0.5 text-slate-700 text-[9pt]">
                            {proj.bullets.map((b, bIdx) => <li key={bIdx}>{b}</li>)}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Education */}
                {education.length > 0 && (
                  <div className="mb-4">
                    <h2
                      className="text-xs font-bold uppercase tracking-wider border-b pb-0.5 mb-1.5 flex items-center gap-1.5"
                      style={{ color: activeAccent, borderColor: `${activeAccent}40` }}
                    >
                      Education
                    </h2>
                    {education.map((edu, idx) => (
                      <div key={idx} className="flex justify-between items-baseline text-[9pt] mb-1">
                        <div>
                          <strong className="text-slate-900">{edu.degree}</strong> — <span className="text-slate-700">{edu.institution}</span>
                          {edu.gpa && <span className="text-slate-500 text-[8.5pt]"> (GPA: {edu.gpa})</span>}
                        </div>
                        <span className="text-[8.5pt] text-slate-500 font-mono">{edu.graduationDate || edu.graduationYear}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* ========================================================================= */}
            {/* CERTIFICATIONS */}
            {/* ========================================================================= */}
            {certifications.length > 0 && (
              <div>
                <h2
                  className="text-xs font-bold uppercase tracking-wider border-b pb-0.5 mb-1 flex items-center gap-1.5"
                  style={{ color: activeAccent, borderColor: `${activeAccent}40` }}
                >
                  Certifications & Honors
                </h2>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[8.5pt] text-slate-700">
                  {certifications.map((cert, idx) => (
                    <span key={idx} className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" style={{ color: activeAccent }} />
                      <strong>{typeof cert === 'string' ? cert : cert.name}</strong>
                      {cert.issuer && ` — ${cert.issuer}`}
                      {cert.date && ` (${cert.date})`}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
