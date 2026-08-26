import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  FileSearch, 
  FileText, 
  Briefcase, 
  Wand2, 
  User, 
  LogOut, 
  Menu, 
  X,
  LayoutDashboard,
  ShieldAlert
} from 'lucide-react';
import Button from './Button';
import NotificationDropdown from './NotificationDropdown';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const isDashboardView = location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/ats-scanner') ||
    location.pathname.startsWith('/analysis-result') ||
    location.pathname.startsWith('/resume-generator') ||
    location.pathname.startsWith('/resume-editor') ||
    location.pathname.startsWith('/job-matcher') ||
    location.pathname.startsWith('/ai-rewriter') ||
    location.pathname.startsWith('/chatbot') ||
    location.pathname.startsWith('/resume-history') ||
    location.pathname.startsWith('/skill-gap') ||
    location.pathname.startsWith('/career-roadmap') ||
    location.pathname.startsWith('/interview-prep') ||
    location.pathname.startsWith('/mock-interview') ||
    location.pathname.startsWith('/application-tracker') ||
    location.pathname.startsWith('/application-analytics') ||
    location.pathname.startsWith('/project-analyzer') ||
    location.pathname.startsWith('/linkedin-analyzer') ||
    location.pathname.startsWith('/resume-ab-testing') ||
    location.pathname.startsWith('/settings');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-dark-900/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 via-indigo-500 to-sky-400 p-[1px] shadow-glow transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-dark-900 rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-brand-400 group-hover:text-brand-300 transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
              Next<span className="gradient-text">Hire</span>
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 -mt-1">
              AI Career Platform
            </span>
          </div>
        </Link>

        {/* Public Desktop Nav Links */}
        {!isDashboardView && (
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <Link to="/ats-scanner" className="hover:text-white transition-colors flex items-center gap-1.5">
              <FileSearch className="w-4 h-4 text-brand-400" />
              ATS Scanner
            </Link>
            <Link to="/skill-gap" className="hover:text-white transition-colors">
              Skill Gap
            </Link>
            <Link to="/interview-prep" className="hover:text-white transition-colors">
              Interview Prep
            </Link>
            <Link to="/application-tracker" className="hover:text-white transition-colors">
              App Tracker
            </Link>
            <Link to="/templates" className="hover:text-white transition-colors">
              Templates
            </Link>
            <Link to="/pricing" className="hover:text-white transition-colors">
              Pricing
            </Link>
          </nav>
        )}

        {/* Auth CTA / User Menu */}
        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <NotificationDropdown />
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-3 p-1.5 pl-3 rounded-xl bg-dark-800 border border-slate-700/80 hover:border-slate-600 transition-all focus:outline-none"
                >
                  <div className="text-left text-xs">
                    <div className="font-semibold text-slate-200">{user.name || 'Demo User'}</div>
                    <div className="text-slate-400 truncate max-w-[120px]">{user.targetRole || 'Software Engineer'}</div>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-sky-500 flex items-center justify-center font-bold text-white text-xs shadow-sm">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                </button>

                {/* Profile Dropdown */}
                {profileDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 rounded-2xl bg-dark-800 border border-slate-700 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-slate-700/60 mb-1">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-semibold text-white truncate">{user.email}</p>
                      {user.isDemo && (
                        <span className="mt-1 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-brand-500/20 text-brand-300 border border-brand-500/30">
                          Demo Mode
                        </span>
                      )}
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-dark-700 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-brand-400" />
                      Dashboard
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-dark-700 transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      Account Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 rounded-lg hover:bg-rose-500/10 transition-colors mt-1 border-t border-slate-700/40 pt-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="gradient" size="sm" icon={Sparkles}>
                  Get Started Free
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-dark-800 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-dark-900/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <Link
            to="/ats-scanner"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:bg-dark-800 hover:text-white"
          >
            <FileSearch className="w-4 h-4 text-brand-400" />
            ATS Scanner
          </Link>
          <Link
            to="/resume-generator"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:bg-dark-800 hover:text-white"
          >
            <FileText className="w-4 h-4 text-sky-400" />
            AI Resume Builder
          </Link>
          <Link
            to="/job-matcher"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:bg-dark-800 hover:text-white"
          >
            <Briefcase className="w-4 h-4 text-indigo-400" />
            Job Matcher
          </Link>
          <Link
            to="/ai-rewriter"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:bg-dark-800 hover:text-white"
          >
            <Wand2 className="w-4 h-4 text-purple-400" />
            AI Rewriter
          </Link>
          <Link
            to="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:bg-dark-800 hover:text-white"
          >
            Pricing
          </Link>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full" icon={LayoutDashboard}>
                    Dashboard
                  </Button>
                </Link>
                <Button variant="danger" className="w-full" onClick={handleLogout} icon={LogOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="gradient" className="w-full" icon={Sparkles}>
                    Get Started Free
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
