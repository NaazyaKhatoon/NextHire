import React, { useState } from 'react';
import { 
  User, 
  Settings as SettingsIcon, 
  Shield, 
  Bell, 
  Save, 
  Trash2, 
  RefreshCw, 
  Check, 
  Moon, 
  Sparkles,
  Zap
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const toast = useToast();

  const [name, setName] = useState(user?.name || 'Alex Chen');
  const [email, setEmail] = useState(user?.email || 'alex.chen@email.com');
  const [targetRole, setTargetRole] = useState(user?.targetRole || 'Senior Full-Stack Engineer');
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      updateUser({ ...user, name, email, targetRole });
      setSaving(false);
      toast.success('Profile settings updated successfully!');
    }, 500);
  };

  const handleResetData = () => {
    localStorage.removeItem('resumeai_current_editing_resume');
    localStorage.removeItem('resumeai_latest_analysis');
    toast.success('Local demo data cache reset to fresh defaults');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <SettingsIcon className="w-6 h-6 text-brand-400" />
          Account & Engine Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage your personal profile, target career parameters, and AI model preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. Profile Settings */}
        <Card className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-white">
            <User className="w-4 h-4 text-brand-400" />
            <span>Profile Information</span>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-slate-300">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white mt-1 text-xs focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-300">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white mt-1 text-xs focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[11px] font-semibold text-slate-300">Primary Target Role</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white mt-1 text-xs focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" variant="gradient" size="sm" icon={Save} isLoading={saving}>
                Save Profile
              </Button>
            </div>
          </form>
        </Card>

        {/* 2. Preferences */}
        <Card className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-white">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>AI Copilot & Performance Preferences</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-dark-900 border border-slate-800">
              <div>
                <div className="font-semibold text-white">Real-Time AI Bullet Suggestions</div>
                <div className="text-[11px] text-slate-400">Offer live action verb recommendations while editing in Studio</div>
              </div>
              <input
                type="checkbox"
                checked={aiSuggestions}
                onChange={(e) => setAiSuggestions(e.target.checked)}
                className="w-4 h-4 text-brand-600 rounded bg-dark-800 border-slate-700 focus:ring-brand-500"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-dark-900 border border-slate-800">
              <div>
                <div className="font-semibold text-white">Weekly ATS Market Benchmark Updates</div>
                <div className="text-[11px] text-slate-400">Receive notifications when new top tech skills trend in your role</div>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 text-brand-600 rounded bg-dark-800 border-slate-700 focus:ring-brand-500"
              />
            </div>
          </div>
        </Card>

        {/* 3. Data & Storage Maintenance */}
        <Card className="space-y-4 border-rose-500/20">
          <div className="flex items-center gap-2 font-bold text-sm text-rose-400">
            <Shield className="w-4 h-4" />
            <span>Cache & Privacy Reset</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div>
              <div className="font-semibold text-white">Reset Local Workspace Cache</div>
              <div className="text-[11px] text-slate-400">Clear temporary resume drafts and restore demo benchmarks</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              icon={RefreshCw}
              onClick={handleResetData}
            >
              Reset Cache
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
