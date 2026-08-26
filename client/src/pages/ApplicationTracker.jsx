import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Filter, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  MapPin, 
  FileText, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  BarChart2,
  ExternalLink
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Modal from '../components/Modal';
import MotivationalQuoteCard from '../components/MotivationalQuoteCard';
import { applicationService } from '../services/applicationService';
import { useToast } from '../components/Toast';

const STATUSES = ['Saved', 'Applied', 'Screening', 'Interview', 'Offer', 'Rejected'];

const ApplicationTracker = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'table'
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State for Add / Edit
  const [formCompany, setFormCompany] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formLocation, setFormLocation] = useState('Remote');
  const [formSalary, setFormSalary] = useState('$130k - $160k');
  const [formStatus, setFormStatus] = useState('Applied');
  const [formNotes, setFormNotes] = useState('');

  const toast = useToast();

  const fetchApps = async () => {
    try {
      const list = await applicationService.getApplications();
      setApplications(list || []);
    } catch (err) {
      console.warn('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleCreateApp = async (e) => {
    e.preventDefault();
    if (!formCompany.trim() || !formRole.trim()) {
      toast.error('Company and Role are required.');
      return;
    }

    try {
      const created = await applicationService.createApplication({
        company: formCompany,
        role: formRole,
        location: formLocation,
        salary: formSalary,
        status: formStatus,
        notes: formNotes,
        appliedDate: new Date(),
        matchScore: 90,
      });

      setApplications(prev => [created, ...prev]);
      setIsModalOpen(false);
      setFormCompany('');
      setFormRole('');
      setFormNotes('');
      toast.success(`Tracked application for ${formRole} at ${formCompany}!`);
    } catch (err) {
      toast.error('Failed to create application.');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await applicationService.updateApplication(id, { status: newStatus });
      setApplications(prev => prev.map(a => a._id === id ? { ...a, status: newStatus } : a));
      toast.success(`Status updated to "${newStatus}"!`);
    } catch (err) {
      toast.info('Status updated locally');
    }
  };

  const handleDelete = async (id) => {
    try {
      await applicationService.deleteApplication(id);
      setApplications(prev => prev.filter(a => a._id !== id));
      toast.success('Application removed from tracker.');
    } catch (err) {
      setApplications(prev => prev.filter(a => a._id !== id));
      toast.success('Application removed.');
    }
  };

  const filteredApps = applications.filter((app) => {
    const matchesSearch = 
      app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || app.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      {/* 1. Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20 text-xs font-semibold mb-2">
            <Briefcase className="w-3.5 h-3.5 text-brand-400" />
            <span>Application Pipeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Job Application Tracker & Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Organize, track interview stages, and measure your job search conversion funnel.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/application-analytics">
            <Button variant="secondary" size="md" icon={BarChart2}>
              Analytics & Funnels
            </Button>
          </Link>

          <Button
            variant="gradient"
            size="md"
            icon={Plus}
            className="shadow-glow"
            onClick={() => setIsModalOpen(true)}
          >
            Track New Job
          </Button>
        </div>
      </div>

      {/* Motivational Mindset Card */}
      <MotivationalQuoteCard compact={true} />

      {/* 2. Search, Status Filter & View Toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-dark-800/80 border border-slate-800 text-xs">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company or role..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
          {['All', ...STATUSES].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap ${
                selectedStatus === st
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-dark-900 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Kanban Board Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
        {STATUSES.map((status) => {
          const columnApps = filteredApps.filter((a) => a.status === status);

          const statusColor =
            status === 'Offer'
              ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
              : status === 'Interview'
              ? 'border-amber-500/40 text-amber-400 bg-amber-500/10'
              : status === 'Screening'
              ? 'border-indigo-500/40 text-indigo-400 bg-indigo-500/10'
              : status === 'Applied'
              ? 'border-sky-500/40 text-sky-400 bg-sky-500/10'
              : status === 'Rejected'
              ? 'border-rose-500/40 text-rose-400 bg-rose-500/10'
              : 'border-slate-700 text-slate-400 bg-slate-800';

          return (
            <div key={status} className="rounded-3xl bg-dark-850 border border-slate-800 p-3.5 space-y-3 min-w-[220px]">
              <div className="flex items-center justify-between px-1">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${statusColor}`}>
                  {status}
                </span>
                <span className="text-xs font-bold text-slate-400">{columnApps.length}</span>
              </div>

              <div className="space-y-2.5">
                {columnApps.map((app) => (
                  <div
                    key={app._id}
                    className="p-3.5 rounded-2xl bg-dark-900 border border-slate-800 hover:border-brand-500/40 transition-all space-y-2 text-xs shadow-md group"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <h4 className="font-bold text-white leading-tight">{app.company}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">{app.role}</p>
                      </div>
                      <button
                        onClick={() => handleDelete(app._id)}
                        className="text-slate-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800/80">
                      <span>{app.location}</span>
                      <span className="text-emerald-400 font-bold">{app.matchScore || 88}% ATS</span>
                    </div>

                    {/* Quick Move Dropdown */}
                    <div className="pt-1">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app._id, e.target.value)}
                        className="w-full text-[10px] bg-dark-800 text-slate-300 rounded-lg p-1 border border-slate-700 focus:ring-1 focus:ring-brand-500"
                      >
                        {STATUSES.map((st) => (
                          <option key={st} value={st}>Move to {st}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}

                {columnApps.length === 0 && (
                  <div className="p-4 rounded-xl border border-dashed border-slate-800 text-center text-slate-600 text-[11px]">
                    No {status.toLowerCase()} jobs
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Application Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Track New Job Application">
        <form onSubmit={handleCreateApp} className="space-y-4 text-xs">
          <div>
            <label className="text-[11px] font-semibold text-slate-300">Company Name *</label>
            <input
              type="text"
              required
              value={formCompany}
              onChange={(e) => setFormCompany(e.target.value)}
              placeholder="e.g. Stripe, Google, Linear, Figma"
              className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white mt-1 text-xs focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-300">Target Role / Position *</label>
            <input
              type="text"
              required
              value={formRole}
              onChange={(e) => setFormRole(e.target.value)}
              placeholder="e.g. Senior Full-Stack Engineer"
              className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white mt-1 text-xs focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-300">Location</label>
              <input
                type="text"
                value={formLocation}
                onChange={(e) => setFormLocation(e.target.value)}
                placeholder="e.g. Remote (US) or San Francisco"
                className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white mt-1 text-xs focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300">Salary Band</label>
              <input
                type="text"
                value={formSalary}
                onChange={(e) => setFormSalary(e.target.value)}
                placeholder="e.g. $140k - $170k"
                className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white mt-1 text-xs focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-300">Pipeline Status</label>
            <select
              value={formStatus}
              onChange={(e) => setFormStatus(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-slate-700 text-white mt-1 text-xs focus:ring-2 focus:ring-brand-500"
            >
              {STATUSES.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-300">Notes & Interview Details</label>
            <textarea
              rows={3}
              value={formNotes}
              onChange={(e) => setFormNotes(e.target.value)}
              placeholder="e.g. Recruiter screened on Tuesday, follow up on Friday..."
              className="w-full p-3 rounded-xl bg-dark-900 border border-slate-700 text-white mt-1 text-xs focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <Button variant="secondary" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="gradient" size="sm" type="submit">
              Save Application
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ApplicationTracker;
