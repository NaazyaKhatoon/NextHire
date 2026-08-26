import React from 'react';
import { Bot, User, Copy, Check, Sparkles } from 'lucide-react';
import { useToast } from './Toast';

const ChatMessage = ({ message }) => {
  const [copied, setCopied] = React.useState(false);
  const toast = useToast();
  const isAi = message.role === 'assistant' || message.role === 'ai';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-3.5 p-4 rounded-2xl transition-all ${
      isAi ? 'bg-dark-800/90 border border-slate-800/80' : 'bg-brand-950/30 border border-brand-500/20'
    }`}>
      <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center ${
        isAi 
          ? 'bg-gradient-to-tr from-brand-600 to-sky-500 text-white shadow-glow' 
          : 'bg-slate-700 text-slate-200'
      }`}>
        {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
      </div>

      <div className="flex-1 space-y-1.5 overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white">
              {isAi ? 'NextHire Copilot' : 'You'}
            </span>
            {isAi && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-brand-500/20 text-brand-300 border border-brand-500/30">
                <Sparkles className="w-2.5 h-2.5" />
                AI Career Advisor
              </span>
            )}
          </div>

          {isAi && (
            <button
              onClick={handleCopy}
              className="text-slate-400 hover:text-slate-200 p-1 rounded transition-colors"
              title="Copy message"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>

        <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
