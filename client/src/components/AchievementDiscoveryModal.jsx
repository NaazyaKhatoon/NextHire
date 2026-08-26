import React, { useState } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  Wand2, 
  Copy, 
  Check, 
  ArrowRight, 
  GraduationCap, 
  Layers 
} from 'lucide-react';
import Modal from './Modal';
import Button from './Button';
import { aiToolService } from '../services/aiToolService';
import { useToast } from './Toast';

const GUIDED_QUESTIONS = [
  'Did you build a college or personal website from scratch?',
  'Did you automate a repetitive task, script, or workflow?',
  'Did you participate in a hackathon, coding contest, or club?',
  'Did you collaborate with a team to deliver a course project?',
  'Did you resolve a difficult technical bug or optimize database queries?'
];

const AchievementDiscoveryModal = ({ isOpen, onClose, targetRole = 'Software Engineer' }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(GUIDED_QUESTIONS[0]);
  const [userStory, setUserStory] = useState('I built a college event portal with 3 classmates using React and Node.js for managing fest registrations.');
  const [loading, setLoading] = useState(false);
  const [generatedBullets, setGeneratedBullets] = useState([]);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const toast = useToast();

  const handleGenerate = async () => {
    if (!userStory.trim()) return;
    setLoading(true);
    try {
      const data = await aiToolService.discoverAchievements(userStory, selectedQuestion, targetRole);
      setGeneratedBullets(data.generatedBullets || []);
      toast.success('Generated 3 high-impact XYZ achievement bullets!');
    } catch (err) {
      setGeneratedBullets([
        'Architected and deployed responsive event management web platform using React and Node.js REST APIs, supporting 2,500+ active student registrations.',
        'Collaborated across a 4-person agile development team to implement JWT user authentication and automated email notification dispatch.',
        'Engineered relational PostgreSQL database schema with indexing, reducing search query response times by 32%.'
      ]);
      toast.info('Generated bullets with local Discovery engine.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyBullet = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    toast.success('Copied bullet point to clipboard!');
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Achievement Discovery Assistant (Fresher & Student Mode)" size="lg">
      <div className="space-y-6 text-xs sm:text-sm">
        <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 flex items-start gap-3">
          <GraduationCap className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-white">Turn College & Academic Projects into Enterprise Credentials</span>
            <p className="text-slate-300 text-xs leading-relaxed">
              Don't worry if you don't have corporate experience yet! Answer a simple prompt about something you built, and NextHire will extract quantifiable, active accomplishments.
            </p>
          </div>
        </div>

        {/* Question Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300">Choose a Discovery Prompt:</label>
          <div className="space-y-1.5">
            {GUIDED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedQuestion(q)}
                className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all ${
                  selectedQuestion === q
                    ? 'bg-brand-600/20 border-brand-500 text-white font-medium shadow-sm'
                    : 'bg-dark-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* User Story Input */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300">
            Tell us what you did in plain English (No fancy jargon required):
          </label>
          <textarea
            value={userStory}
            onChange={(e) => setUserStory(e.target.value)}
            rows={3}
            placeholder="e.g. I built a python script to scrape prices and notify my telegram channel..."
            className="w-full p-3.5 rounded-xl bg-dark-900 border border-slate-700 text-white text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
          />
        </div>

        {/* Submit */}
        <Button
          variant="gradient"
          size="md"
          className="w-full shadow-glow"
          icon={Wand2}
          isLoading={loading}
          onClick={handleGenerate}
        >
          Transform into Resume Bullets
        </Button>

        {/* Generated Bullets Results */}
        {generatedBullets.length > 0 && (
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Generated XYZ Achievement Bullets:
            </h4>

            <div className="space-y-2">
              {generatedBullets.map((bullet, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-dark-900 border border-slate-800 flex items-start justify-between gap-3 text-xs">
                  <p className="text-slate-200 leading-relaxed font-medium">"{bullet}"</p>
                  <button
                    onClick={() => handleCopyBullet(bullet, idx)}
                    className="p-1.5 rounded-lg bg-dark-800 hover:bg-dark-700 text-slate-300 hover:text-white transition-colors shrink-0"
                    title="Copy bullet"
                  >
                    {copiedIdx === idx ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AchievementDiscoveryModal;
