import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
import { validateResumeFile } from '../utils/validation';

const SAMPLE_RESUMES = [
  {
    title: 'Senior Full-Stack Engineer Resume',
    role: 'Full Stack Software Engineer',
    fileName: 'alex_chen_fullstack.pdf',
    text: `ALEX CHEN
San Francisco, CA • alex.chen@email.com • (555) 019-2834 • linkedin.com/in/alexchen-dev • github.com/alexchen

PROFESSIONAL SUMMARY
Results-driven Senior Full-Stack Engineer with 5+ years of experience architecting high-scale distributed web applications and microservices. Expert in React, TypeScript, Node.js, Python, PostgreSQL, and AWS. Proven track record reducing system latency by 40% and mentoring 6+ junior engineers.

CORE SKILLS
• Languages: JavaScript (ES6+), TypeScript, Python, SQL, HTML5, CSS3
• Frontend: React.js, Next.js, Redux Toolkit, Tailwind CSS, Webpack, Vite
• Backend: Node.js, Express, FastAPI, Django, GraphQL, REST APIs
• Cloud & DevOps: AWS (EC2, S3, Lambda), Docker, Kubernetes, CI/CD, GitHub Actions
• Databases: PostgreSQL, MongoDB, Redis, Elasticsearch
• Methodologies: Agile, Scrum, TDD, Microservices, System Design

EXPERIENCE
Lead Full-Stack Engineer | TechNova Solutions | San Francisco, CA | 2022 - Present
• Spearheaded the architectural transition of monolithic SaaS platform into decoupled microservices using Node.js and Docker, improving system uptime from 99.2% to 99.98%.
• Optimized frontend performance in React and Next.js, decreasing LCP load times by 48% across 500k monthly active users.
• Designed and deployed automated CI/CD deployment pipelines using GitHub Actions and AWS ECS, cutting deployment cycle from 3 hours to 12 minutes.
• Supervised and mentored an engineering squad of 7 developers, conducting weekly code reviews and architecture workshops.

Software Engineer | Apex Cloud Systems | San Jose, CA | 2020 - 2022
• Developed scalable RESTful APIs in Node.js and Express handling 15M+ requests daily with sub-50ms latency.
• Integrated Redis distributed caching layer, reducing PostgreSQL database load by 35%.
• Implemented automated integration tests using Jest and Cypress, elevating test coverage from 62% to 88%.

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley | 2016 - 2020 | GPA: 3.85 / 4.0

PROJECTS
CloudScale AI Monitor (github.com/alexchen/cloudscale)
• Built real-time cloud resource telemetry dashboard in React, FastAPI, and TimescaleDB, alerting DevOps teams on anomaly spikes with 98% precision.
`
  },
  {
    title: 'Product Manager Resume',
    role: 'Senior Product Manager',
    fileName: 'sarah_miller_pm.pdf',
    text: `SARAH MILLER
New York, NY • sarah.miller@email.com • (555) 342-9182 • linkedin.com/in/sarahmiller-pm

SUMMARY
Customer-obsessed Senior Product Manager with 6+ years of experience leading cross-functional teams to build B2B SaaS and consumer tech products. Driven 120% YoY ARR growth, orchestrated 8 major product launches, and leveraged user research and SQL data analytics to double retention.

EXPERIENCE
Senior Product Manager | Veloce Commerce | New York, NY | 2022 - Present
• Owned end-to-end product strategy and roadmap for enterprise checkout experience, delivering $14.2M in incremental annual revenue.
• Ran 25+ quantitative A/B experimentation cohorts that boosted checkout funnel conversion by 18.4%.
• Collaborated closely with engineering, design, and marketing teams to deliver features on sprint schedules.

Product Manager | Horizon Health Tech | Boston, MA | 2019 - 2022
• Launched mobile patient portal app from 0 to 1 with 4.8-star App Store rating and 200k+ downloads.
• Conducted 80+ customer discovery interviews to identify core friction points and define PRDs.

SKILLS
Product Strategy, User Research, Roadmap Planning, A/B Testing, Agile/Scrum, Data Analytics (SQL, Amplitude, Mixpanel), Wireframing (Figma), JIRA.
`
  }
];

const FileUploader = ({ selectedFile, onFileSelect, onTextSampleSelect, onError }) => {
  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        onError?.(fileRejections[0]?.errors[0]?.message || 'Invalid file format');
        return;
      }
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const validation = validateResumeFile(file);
        if (!validation.valid) {
          onError?.(validation.message);
          return;
        }
        onFileSelect(file);
      }
    },
    [onFileSelect, onError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div className="space-y-4">
      {/* Drag and drop container */}
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300
          ${isDragActive
            ? 'border-brand-400 bg-brand-500/10 scale-[1.01]'
            : 'border-slate-700/80 hover:border-brand-500/60 bg-dark-800/50 hover:bg-dark-800/80'
          }
        `}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 shadow-glow">
            <UploadCloud className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <p className="text-base font-semibold text-white">
              {isDragActive ? 'Drop your resume file here' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs text-slate-400">
              Supports <span className="text-slate-200 font-medium">PDF, DOCX, TXT</span> (Max 10MB)
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-[11px] text-slate-300 border border-slate-700">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Private & ATS Compatible Format Checking</span>
          </div>
        </div>
      </div>

      {/* Selected File Card */}
      {selectedFile && (
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-dark-800 border border-brand-500/40 shadow-sm animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white truncate max-w-xs sm:max-w-md">
                {selectedFile.name}
              </p>
              <p className="text-xs text-slate-400">
                {(selectedFile.size / 1024).toFixed(1)} KB • Ready for AI parsing
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onFileSelect(null);
            }}
            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-dark-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Quick Test Samples */}
      <div className="pt-2 border-t border-slate-800/80">
        <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center justify-between">
          <span>Or load a preset sample resume for instant scanning:</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SAMPLE_RESUMES.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onTextSampleSelect?.(sample)}
              className="text-left p-2.5 rounded-xl bg-dark-800/60 hover:bg-dark-700/80 border border-slate-700/60 hover:border-brand-500/50 transition-all text-xs group"
            >
              <div className="font-semibold text-slate-200 group-hover:text-brand-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-brand-400" />
                {sample.title}
              </div>
              <div className="text-slate-400 text-[11px] mt-0.5">Role: {sample.role}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
