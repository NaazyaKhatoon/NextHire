import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  Bot, 
  Loader2, 
  RefreshCw, 
  Zap, 
  Flame, 
  Heart, 
  Briefcase, 
  DollarSign, 
  FileText, 
  MessageSquareQuote,
  Target
} from 'lucide-react';
import ChatMessage from './ChatMessage';
import Button from './Button';
import { aiService } from '../services/aiService';

const PROMPT_CATEGORIES = [
  {
    id: 'popular',
    label: '🔥 Popular',
    prompts: [
      'Give me an inspiring pep talk for my job search!',
      'Why is my ATS score low and how do I reach 95%+?',
      'Rewrite my project bullet using the XYZ formula.',
      'Help me practice the STAR method for a behavioral interview.',
    ]
  },
  {
    id: 'interviews',
    label: '🎯 Interview Prep',
    prompts: [
      'How to answer: Tell me about a time you solved a critical system bug?',
      'What are the top 5 technical questions for a Senior Full-Stack Engineer?',
      'How do I explain a career gap or transition with confidence?',
    ]
  },
  {
    id: 'outreach',
    label: '📩 Recruiter & Salary',
    prompts: [
      'Write a high-converting cold LinkedIn message to a hiring manager.',
      'Generate a polite salary counter-offer email asking for 15% more.',
      'How should I follow up after a second-round interview?',
    ]
  },
  {
    id: 'bullets',
    label: '⚡ Resume & Bullets',
    prompts: [
      'Improve my professional summary to sound like an executive leader.',
      'How do I fit my 2-page resume onto exactly 1 clean page?',
      'What high-demand skills should I learn for this role in 2026?',
    ]
  }
];

const ChatWindow = ({ resumeContext }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `👋 Hello! I am your **NextHire Career Copilot** (powered by advanced career AI).\n\nI have loaded your target role (**${resumeContext?.targetRole || 'Software Engineer'}**) and current ATS benchmark (**${resumeContext?.score || 88}/100**).\n\n🚀 **How I can help you land your next role:**\n• **ATS Score Elevation**: Identify exact missing keywords like *${(resumeContext?.missingSkills || ['Kubernetes', 'Docker']).join(', ')}*.\n• **XYZ Bullet Rewrites**: Transform passive responsibilities into high-impact metrics.\n• **STAR Behavioral Interview Practice**: Answer tough questions with structured confidence.\n• **Recruiter Cold DM & Salary Negotiation Scripts**: Stand out and get paid what you're worth.\n• **Daily Motivation & Mindset Booster**: Because job hunting is a mental game!\n\nWhat would you like to work on right now?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [activeCategory, setActiveCategory] = useState('popular');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMessage = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await aiService.chatWithCopilot({
        message: query,
        history: messages.slice(-8),
        resumeContext: resumeContext || {
          targetRole: 'Software Engineer',
          score: 88,
          skills: ['React', 'Node.js', 'Python', 'TypeScript', 'SQL'],
          missingSkills: ['Docker', 'AWS', 'Kubernetes']
        },
      });

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: response.reply || response.content || 'I processed your request with optimized ATS suggestions.',
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `💡 **NextHire Advice**: To maximize your ATS compatibility for **${resumeContext?.targetRole || 'Software Engineering'}**, focus on quantifiable metrics (e.g. *Reduced latency by 35% using Redis caching*). Ensure keywords like **${(resumeContext?.missingSkills || ['Docker', 'AWS']).join(', ')}** are placed under your technical skills and job bullets.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const currentCategoryObj = PROMPT_CATEGORIES.find((c) => c.id === activeCategory) || PROMPT_CATEGORIES[0];

  return (
    <div className="flex flex-col h-[700px] rounded-3xl bg-dark-900 border border-slate-800 shadow-2xl overflow-hidden">
      {/* Copilot Header */}
      <div className="p-4 bg-dark-850 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-sky-400 p-[1px] shadow-glow">
            <div className="w-full h-full bg-dark-900 rounded-[11px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-brand-400" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              NextHire Copilot
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
                GPT-Class Advisor
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Context-aware career acceleration, ATS optimization & motivation
            </p>
          </div>
        </div>

        {resumeContext && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dark-900 border border-slate-700/80 text-xs">
            <Target className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-300">Target: <strong className="text-white">{resumeContext.targetRole || 'Software Engineer'}</strong></span>
            {resumeContext.score && (
              <span className="ml-1 text-emerald-400 font-bold">({resumeContext.score}/100 ATS)</span>
            )}
          </div>
        )}
      </div>

      {/* Suggestion Category Tabs */}
      <div className="px-4 pt-3 pb-2 bg-dark-850/80 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
        {PROMPT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-dark-800 text-slate-400 hover:text-slate-200 hover:bg-dark-750 border border-slate-700/60'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Dynamic Suggested Prompt Chips */}
      <div className="p-2.5 bg-dark-900 border-b border-slate-800/60 overflow-x-auto flex gap-2 scrollbar-none">
        {currentCategoryObj.prompts.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(prompt)}
            disabled={loading}
            className="whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium bg-dark-800 text-slate-300 border border-slate-700/70 hover:border-brand-500/50 hover:text-white hover:bg-dark-750 transition-all shrink-0 flex items-center gap-1.5 group"
          >
            <Sparkles className="w-3 h-3 text-brand-400 group-hover:rotate-12 transition-transform" />
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}

        {loading && (
          <div className="flex gap-3 p-4 rounded-2xl bg-dark-800/80 border border-slate-800 animate-pulse">
            <div className="w-8 h-8 rounded-xl bg-brand-600/30 flex items-center justify-center text-brand-400">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
            <div className="space-y-2 flex-1">
              <div className="h-3.5 bg-slate-700 rounded w-1/3"></div>
              <div className="h-3 bg-slate-800 rounded w-2/3"></div>
              <div className="h-3 bg-slate-800 rounded w-1/2"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-dark-850 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask NextHire Copilot anything (e.g. 'Give me an interview pep talk', 'Rewrite my bullet', 'Salary negotiation')..."
            className="flex-1 px-4 py-3 rounded-xl bg-dark-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            disabled={loading}
          />
          <Button
            type="submit"
            variant="gradient"
            size="md"
            disabled={!input.trim() || loading}
            icon={Send}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
