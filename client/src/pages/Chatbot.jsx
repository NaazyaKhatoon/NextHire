import React from 'react';
import { BotMessageSquare, Sparkles, Zap, Flame } from 'lucide-react';
import ChatWindow from '../components/ChatWindow';
import MotivationalQuoteCard from '../components/MotivationalQuoteCard';

const Chatbot = () => {
  const resumeContext = {
    targetRole: 'Senior Full-Stack Engineer',
    score: 88,
    skills: ['React', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS'],
    missingSkills: ['Kubernetes', 'GraphQL', 'Terraform'],
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20 text-xs font-semibold mb-1">
          <BotMessageSquare className="w-3.5 h-3.5 text-brand-400" />
          <span>NextHire 24/7 Context-Aware Career Advisor</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          NextHire Career Copilot
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          ChatGPT-class career assistant for tailoring resumes, practicing STAR behavioral interviews, negotiating salary, and getting motivating advice.
        </p>
      </div>

      {/* Motivational Mindset Booster */}
      <MotivationalQuoteCard compact={true} />

      {/* Main Chat Window */}
      <ChatWindow resumeContext={resumeContext} />
    </div>
  );
};

export default Chatbot;
