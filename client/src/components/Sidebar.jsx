import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileSearch,
  FilePlus,
  FileEdit,
  Briefcase,
  Wand2,
  LayoutTemplate,
  BotMessageSquare,
  History,
  Settings,
  Sparkles,
  Zap,
  Cpu,
  Compass,
  Mic,
  BarChart2,
  FolderGit2,
  Linkedin,
  Layers
} from 'lucide-react';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/ats-scanner', label: 'ATS Scanner', icon: FileSearch, badge: 'Core' },
    { path: '/skill-gap', label: 'Skill Gap & Roadmap', icon: Cpu, badge: 'New' },
    { path: '/career-roadmap', label: 'Career Roadmaps', icon: Compass },
    { path: '/interview-prep', label: 'Interview Prep', icon: Mic, badge: 'AI' },
    { path: '/mock-interview', label: 'AI Mock Interview', icon: BotMessageSquare, isAi: true },
    { path: '/application-tracker', label: 'Application Tracker', icon: Briefcase },
    { path: '/application-analytics', label: 'App Analytics', icon: BarChart2 },
    { path: '/project-analyzer', label: 'Project & Portfolio', icon: FolderGit2, badge: 'AI' },
    { path: '/linkedin-analyzer', label: 'LinkedIn & SEO', icon: Linkedin },
    { path: '/resume-ab-testing', label: 'Resume A/B Testing', icon: Layers },
    { path: '/resume-generator', label: 'Resume Builder', icon: FilePlus, isAi: true },
    { path: '/resume-editor', label: 'Resume Editor', icon: FileEdit },
    { path: '/job-matcher', label: 'Job Matcher', icon: Briefcase },
    { path: '/ai-rewriter', label: 'AI Bullet Rewriter', icon: Wand2, isAi: true },
    { path: '/templates', label: 'ATS Templates', icon: LayoutTemplate },
    { path: '/chatbot', label: 'Career Copilot', icon: BotMessageSquare, isAi: true },
    { path: '/resume-history', label: 'Resume History', icon: History },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={`
        sticky top-16 h-[calc(100vh-4rem)] bg-dark-900/90 border-r border-slate-800/80 
        transition-all duration-300 z-30 flex flex-col justify-between p-3.5
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}
    >
      <div className="space-y-1.5">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group relative
              ${isActive
                ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-lg shadow-brand-600/20 font-semibold'
                : 'text-slate-400 hover:text-slate-100 hover:bg-dark-800/80'
              }
              ${isCollapsed ? 'justify-center' : ''}
            `}
          >
            <item.icon className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" />

            {!isCollapsed && (
              <div className="flex items-center justify-between w-full">
                <span className="truncate">{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                    {item.badge}
                  </span>
                )}
                {item.isAi && (
                  <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                )}
              </div>
            )}

            {/* Hover Tooltip if Collapsed */}
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-2.5 py-1 bg-dark-800 border border-slate-700 text-white text-xs rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                {item.label}
              </div>
            )}
          </NavLink>
        ))}
      </div>

      {/* Pro Badge / Mini Status */}
      {!isCollapsed && (
        <div className="rounded-xl bg-gradient-to-br from-brand-900/40 via-dark-800 to-dark-800 border border-brand-500/30 p-3.5 mt-4">
          <div className="flex items-center gap-2 text-brand-400 font-semibold text-xs mb-1">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>AI Optimization Ready</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-2.5">
            Deterministic ATS parser + AI Copilot are connected.
          </p>
          <NavLink
            to="/ats-scanner"
            className="block text-center text-xs font-semibold py-1.5 px-3 rounded-lg bg-brand-600/30 hover:bg-brand-600/50 text-brand-200 border border-brand-500/40 transition-colors"
          >
            Scan New Resume
          </NavLink>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
