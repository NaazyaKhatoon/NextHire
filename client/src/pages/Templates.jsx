import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutTemplate, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Eye, 
  ShieldCheck, 
  FileCheck2, 
  Star,
  Zap,
  Sliders,
  X
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Modal from '../components/Modal';
import ResumePreview from '../components/ResumePreview';
import MotivationalQuoteCard from '../components/MotivationalQuoteCard';
import { useToast } from '../components/Toast';

export const ALL_TEMPLATES = [
  {
    id: 'modern',
    name: 'Modern Pro',
    category: 'Tech & Engineering',
    color: '#6366F1',
    description: 'Clean header with subtle accent divider lines. Highly favored by fast-growth tech scale-ups.',
    bestFor: 'Software Engineers, Full Stack Developers, Tech Leads',
    atsScore: 98,
  },
  {
    id: 'minimal',
    name: 'Minimalist Clean',
    category: 'Universal ATS',
    color: '#0EA5E9',
    description: 'High-density typographical layout with zero distractions. Maximizes 1-page efficiency.',
    bestFor: 'Any Role, Developers, Product Managers, Analysts',
    atsScore: 100,
  },
  {
    id: 'corporate',
    name: 'Executive Corporate',
    category: 'Management',
    color: '#3B82F6',
    description: 'Traditional centered layout with classic serif hierarchy for Fortune 500 and enterprise firms.',
    bestFor: 'Engineering Managers, Directors, Consultants, PMs',
    atsScore: 96,
  },
  {
    id: 'tech',
    name: 'Software Engineer Pro',
    category: 'Tech & Engineering',
    color: '#10B981',
    description: 'Prominent technical skills sidebar with structured project repositories and metric callouts.',
    bestFor: 'Backend, Frontend, DevOps, and Cloud Engineers',
    atsScore: 98,
  },
  {
    id: 'ai-engineer',
    name: 'AI & Data Scientist',
    category: 'AI & Data',
    color: '#8B5CF6',
    description: 'Features dedicated model benchmarks, RAG architectures, and PyTorch/Hugging Face highlights.',
    bestFor: 'AI Engineers, ML Researchers, Data Scientists',
    atsScore: 99,
  },
  {
    id: 'fresh-grad',
    name: 'Fresh Graduate & Placement',
    category: 'Entry Level',
    color: '#EC4899',
    description: 'Prioritizes academic coursework, hackathon victories, clubs, and capstone engineering projects.',
    bestFor: 'College Students, Freshers, Interns, Bootcamp Grads',
    atsScore: 100,
  },
  {
    id: 'creative',
    name: 'Modern Creative',
    category: 'Design & Product',
    color: '#F59E0B',
    description: 'Tasteful left-rail header styling balanced with strict ATS single-column machine readability.',
    bestFor: 'UI/UX Designers, Product Designers, Technical Writers',
    atsScore: 94,
  },
  {
    id: 'ats-classic',
    name: 'ATS Classic Universal',
    category: 'Universal ATS',
    color: '#475569',
    description: '100% compliant across Workday, Taleo, Greenhouse, iCIMS, and Lever screening parsers.',
    bestFor: 'All candidates applying to strict enterprise corporate portals',
    atsScore: 100,
  },
  {
    id: 'devops-cloud',
    name: 'DevOps & SRE Platform',
    category: 'Tech & Engineering',
    color: '#06B6D4',
    description: 'Highlights Kubernetes, Terraform IaC, SLA uptime metrics, and automated CI/CD pipelines.',
    bestFor: 'DevOps, SRE, Cloud Architects, Infrastructure Leads',
    atsScore: 99,
  },
  {
    id: 'consultant',
    name: 'Strategy Consultant',
    category: 'Management',
    color: '#334155',
    description: 'Focuses on strategic revenue growth, client P&L, cost reduction percentages, and governance.',
    bestFor: 'Strategy Consultants, Business Analysts, Operations',
    atsScore: 97,
  },
  {
    id: 'marketing-growth',
    name: 'Growth & Product Marketing',
    category: 'Design & Product',
    color: '#F43F5E',
    description: 'Designed for conversion telemetry, CAC/LTV metrics, pipeline generation, and user acquisition.',
    bestFor: 'Growth Marketers, PMMs, Demand Gen Leads',
    atsScore: 95,
  },
  {
    id: 'clean-slate',
    name: 'Clean Slate Indigo',
    category: 'Universal ATS',
    color: '#4F46E5',
    description: 'Modern indigo borders with balanced whitespace, high contrast, and crisp section dividers.',
    bestFor: 'Full-Stack Developers, QA Engineers, Scrum Masters',
    atsScore: 99,
  }
];

const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const categories = ['All', 'Universal ATS', 'Tech & Engineering', 'AI & Data', 'Entry Level', 'Management', 'Design & Product'];

  const filteredTemplates = selectedCategory === 'All'
    ? ALL_TEMPLATES
    : ALL_TEMPLATES.filter(t => t.category === selectedCategory);

  const handleUseTemplate = (templateId) => {
    toast.success(`Loaded "${templateId}" into Live Studio!`);
    navigate(`/resume-editor?template=${templateId}`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* 1. Header with "Free Forever" Guarantee */}
      <div className="text-center space-y-2 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-semibold mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>100% Free Forever • Zero Paywalls</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          12+ Free Premium ATS-Tested Resume Templates
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Every template is audited to pass enterprise ATS scanners (Workday, Taleo, Greenhouse, Lever). Free vector PDF export on all layouts.
        </p>
      </div>

      {/* Motivational Mindset Card */}
      <MotivationalQuoteCard compact={true} />

      {/* 2. Category Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-dark-800 text-slate-400 hover:text-white border border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. Templates Grid (12+ Layouts) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="rounded-3xl bg-dark-800/80 border border-slate-800 hover:border-brand-500/50 transition-all p-6 space-y-4 shadow-xl flex flex-col justify-between group"
          >
            <div className="space-y-3">
              {/* Header preview dummy card */}
              <div 
                onClick={() => setPreviewTemplate(template)}
                className="h-36 rounded-2xl p-4 flex flex-col justify-between border border-slate-700/80 transition-transform group-hover:scale-[1.02] cursor-pointer"
                style={{ backgroundColor: '#0B1120' }}
              >
                <div className="flex items-center justify-between">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: template.color }} />
                  <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    {template.atsScore}% ATS Safe
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="w-2/3 h-3.5 bg-slate-700 rounded-md"></div>
                  <div className="w-1/2 h-2 bg-slate-800 rounded"></div>
                  <div className="w-full h-1.5 bg-slate-800/80 rounded mt-2"></div>
                  <div className="w-4/5 h-1.5 bg-slate-800/80 rounded"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">{template.name}</h3>
                  <span className="text-[10px] text-slate-400">{template.category}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{template.description}</p>
              </div>

              <div className="p-2.5 rounded-xl bg-dark-900 border border-slate-800 text-[11px] text-slate-300">
                <strong>Best For:</strong> {template.bestFor}
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="flex-1"
                icon={Eye}
                onClick={() => setPreviewTemplate(template)}
              >
                Preview
              </Button>

              <Button
                variant="gradient"
                size="sm"
                className="flex-1"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => handleUseTemplate(template.id)}
              >
                Use Layout
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Live Preview Modal */}
      {previewTemplate && (
        <Modal
          isOpen={Boolean(previewTemplate)}
          onClose={() => setPreviewTemplate(null)}
          title={`Live ATS Preview: ${previewTemplate.name}`}
          size="lg"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-dark-900 border border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: previewTemplate.color }} />
                <span>{previewTemplate.description}</span>
              </div>
              <Button
                variant="gradient"
                size="sm"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => handleUseTemplate(previewTemplate.id)}
              >
                Edit with this Template
              </Button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto rounded-2xl bg-dark-950 p-2 border border-slate-800 flex justify-center">
              <ResumePreview template={previewTemplate.id} showControls={false} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Templates;
