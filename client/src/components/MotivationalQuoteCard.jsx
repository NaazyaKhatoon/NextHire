import React, { useState, useEffect } from 'react';
import { Sparkles, Quote, RefreshCw, Heart, Share2, Copy, Check, Flame, Zap, Trophy } from 'lucide-react';
import { useToast } from './Toast';

export const MOTIVATIONAL_QUOTES = [
  {
    quote: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
    author: "Steve Jobs",
    role: "Co-Founder, Apple",
    category: "Purpose & Craft"
  },
  {
    quote: "Great companies and great careers are not built on luck; they are built on relentless preparation, curiosity, and adaptability.",
    author: "Satya Nadella",
    role: "CEO, Microsoft",
    category: "Career Growth"
  },
  {
    quote: "The world rewards people who take initiative. Don't wait for permission to build something extraordinary.",
    author: "Sam Altman",
    role: "CEO, OpenAI",
    category: "Initiative & Action"
  },
  {
    quote: "Software and AI will transform everything, but human grit, empathy, and continuous learning will always be the ultimate differentiator.",
    author: "Jensen Huang",
    role: "CEO, NVIDIA",
    category: "Resilience & Grit"
  },
  {
    quote: "If you are offered a seat on a rocket ship, don't ask what seat! Just get on.",
    author: "Sheryl Sandberg",
    role: "Former COO, Meta",
    category: "Opportunity"
  },
  {
    quote: "Every master was once a disaster. Every senior engineer was once debugging hello world. Keep pushing.",
    author: "Naval Ravikant",
    role: "Entrepreneur & Investor",
    category: "Continuous Progress"
  },
  {
    quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    role: "Statesman",
    category: "Perseverance"
  },
  {
    quote: "You don't need a thousand offers. You only need ONE company to recognize your true value. Stay focused.",
    author: "NextHire Career Insight",
    role: "AI Career Wisdom",
    category: "Job Search Mindset"
  },
  {
    quote: "The expert in anything was once a beginner. Confidence comes from competence, and competence comes from daily reps.",
    author: "Helen Hayes",
    role: "Artist & Leader",
    category: "Mastery"
  },
  {
    quote: "Opportunity does not knock; it presents itself when you shatter the door down with undeniable proof of your skills.",
    author: "Kyle Chandler",
    role: "Leader",
    category: "Execution"
  }
];

const MotivationalQuoteCard = ({ compact = false, className = '' }) => {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  useEffect(() => {
    // Pick a random starting quote
    setIndex(Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length));
  }, []);

  const handleNextQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
      setIsAnimating(false);
    }, 200);
  };

  const current = MOTIVATIONAL_QUOTES[index];

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${current.quote}" — ${current.author}`);
    setCopied(true);
    toast.success('Inspirational quote copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  if (compact) {
    return (
      <div className={`p-3.5 rounded-2xl bg-gradient-to-r from-brand-950/40 via-dark-800 to-indigo-950/30 border border-brand-500/25 flex items-center justify-between gap-3 text-xs ${className}`}>
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-xl bg-brand-500/15 flex items-center justify-center text-brand-400 shrink-0">
            <Quote className="w-4 h-4" />
          </div>
          <div className="truncate">
            <span className="text-slate-200 font-medium italic">"{current.quote}"</span>
            <span className="text-brand-300 font-semibold ml-1.5">— {current.author}</span>
          </div>
        </div>
        <button
          onClick={handleNextQuote}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-dark-700 transition-colors shrink-0"
          title="Next Quote"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isAnimating ? 'animate-spin' : ''}`} />
        </button>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-950/70 via-dark-800/90 to-indigo-950/60 border border-brand-500/30 p-6 sm:p-7 shadow-2xl backdrop-blur-xl transition-all ${className}`}>
      {/* Decorative ambient backdrop */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-brand-600/20 via-sky-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-[11px] font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            Daily Career Mindset Booster
          </span>
          <span className="hidden sm:inline-block text-[11px] text-slate-400">
            • {current.category}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-dark-750 transition-colors"
            title="Copy Quote"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={handleNextQuote}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-xl bg-dark-750 hover:bg-dark-700 text-slate-300 hover:text-white border border-slate-700 transition-all active:scale-95"
            title="Shuffle quote"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAnimating ? 'animate-spin' : ''}`} />
            <span>New Quote</span>
          </button>
        </div>
      </div>

      {/* Quote Body */}
      <div className={`space-y-3 transition-opacity duration-200 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <p className="text-sm sm:text-base font-medium text-slate-100 italic leading-relaxed">
          "{current.quote}"
        </p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-brand-600 to-sky-400 flex items-center justify-center font-bold text-white text-xs">
              {current.author.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-bold text-white">{current.author}</div>
              <div className="text-[10px] text-slate-400">{current.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>Your Next Hire is Coming</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotivationalQuoteCard;
