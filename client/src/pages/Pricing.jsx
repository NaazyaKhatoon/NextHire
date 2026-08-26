import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Check, Zap, ShieldCheck } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const Pricing = () => {
  const plans = [
    {
      name: 'Free Starter',
      price: '$0',
      period: 'forever',
      description: 'Essential ATS scanning and basic resume building for active job seekers.',
      features: [
        '5 ATS Resume Scans per month',
        'Deterministic ATS compatibility score',
        'Keyword & skills gap analysis',
        'Standard ATS Classic template',
        'Basic bullet rewrite suggestions',
        'PDF Resume download'
      ],
      cta: 'Get Started Free',
      variant: 'outline',
      highlighted: false,
    },
    {
      name: 'Pro Career Pass',
      price: '$14',
      period: 'per month',
      description: 'Full AI career copilot, unlimited scans, live editing, and all 6 premium ATS templates.',
      features: [
        'Unlimited ATS Resume Scans',
        'AI Bullet Rewriter (4 styles)',
        'Contextual Career Copilot chatbot',
        'All 6 ATS-Tested Pro Templates',
        'Job Matcher tailored alignment',
        'Recruiter 6-Second Glance simulator',
        'Export high-resolution ATS A4 PDFs',
        'Priority AI model processing'
      ],
      cta: 'Upgrade to Pro',
      variant: 'gradient',
      highlighted: true,
    },
    {
      name: 'Enterprise / Teams',
      price: '$49',
      period: 'per month',
      description: 'For career coaches, bootcamps, and universities managing multiple cohorts.',
      features: [
        'Everything in Pro',
        'Up to 50 active candidate profiles',
        'Bulk resume batch scanning',
        'Cohort ATS improvement analytics',
        'Custom corporate templates',
        'Dedicated API access & webhook triggers',
        '24/7 Priority support SLA'
      ],
      cta: 'Contact Sales',
      variant: 'secondary',
      highlighted: false,
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-16">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          <span>Simple, Transparent Pricing</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Invest in Your Career Acceleration
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Land more interviews with ATS-compliant resumes and intelligent AI coaching. Cancel anytime.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan, idx) => (
          <Card
            key={idx}
            className={`flex flex-col justify-between space-y-6 ${
              plan.highlighted ? 'border-brand-500/60 shadow-glow bg-dark-800' : ''
            }`}
          >
            <div className="space-y-4">
              {plan.highlighted && (
                <span className="px-3 py-1 bg-gradient-to-r from-brand-600 to-sky-500 text-white text-[10px] uppercase font-bold tracking-wider rounded-full inline-block shadow-md">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{plan.description}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-white">{plan.price}</span>
                <span className="text-xs text-slate-400">/{plan.period}</span>
              </div>

              <ul className="space-y-2.5 pt-2 border-t border-slate-800 text-xs text-slate-300">
                {plan.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link to="/signup" className="block pt-4">
              <Button variant={plan.variant} size="md" className="w-full">
                {plan.cta}
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
