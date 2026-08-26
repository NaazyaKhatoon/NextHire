import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart2, 
  TrendingUp, 
  ArrowLeft, 
  CheckCircle2, 
  Calendar, 
  Target, 
  Briefcase, 
  Award,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import Card from '../components/Card';
import Button from '../components/Button';
import MotivationalQuoteCard from '../components/MotivationalQuoteCard';
import { applicationService } from '../services/applicationService';

const ApplicationAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await applicationService.getAnalytics();
        setAnalytics(data);
      } catch (err) {
        console.warn('Using local fallback analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const stats = analytics?.stats || {
    totalSent: 18,
    interviewsScheduled: 6,
    offersReceived: 2,
    responseRate: 72,
    interviewRate: 44,
    bestPerformingResume: 'Senior Full-Stack Resume v2.4 (94% ATS)',
    mostSuccessfulRole: 'Senior Full-Stack Engineer',
  };

  const timelineData = analytics?.timelineData || [
    { week: 'Week 1', applications: 3, interviews: 0, offers: 0 },
    { week: 'Week 2', applications: 6, interviews: 1, offers: 0 },
    { week: 'Week 3', applications: 4, interviews: 2, offers: 0 },
    { week: 'Week 4', applications: 5, interviews: 3, offers: 1 },
  ];

  const statusDistribution = analytics?.statusDistribution || [
    { name: 'Saved', value: 2, color: '#94A3B8' },
    { name: 'Applied', value: 6, color: '#38BDF8' },
    { name: 'Screening', value: 4, color: '#818CF8' },
    { name: 'Interview', value: 5, color: '#F59E0B' },
    { name: 'Offer', value: 2, color: '#10B981' },
    { name: 'Rejected', value: 1, color: '#F43F5E' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20 text-xs font-semibold mb-2">
            <BarChart2 className="w-3.5 h-3.5 text-brand-400" />
            <span>Job Search Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Application Insights & Funnel Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Measure your recruiter callback conversion rates, interview trends, and resume effectiveness.
          </p>
        </div>

        <Link to="/application-tracker">
          <Button variant="secondary" size="md" icon={ArrowLeft}>
            Back to Tracker
          </Button>
        </Link>
      </div>

      {/* Motivational Mindset Card */}
      <MotivationalQuoteCard compact={true} />

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Applications</span>
          <div className="text-2xl font-extrabold text-white">{stats.totalSent}</div>
          <span className="text-[11px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Active search
          </span>
        </Card>

        <Card className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Response Rate</span>
          <div className="text-2xl font-extrabold text-sky-400">{stats.responseRate}%</div>
          <span className="text-[11px] text-slate-400">vs 15% industry avg</span>
        </Card>

        <Card className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Interview Rate</span>
          <div className="text-2xl font-extrabold text-amber-400">{stats.interviewRate}%</div>
          <span className="text-[11px] text-amber-400 font-semibold">{stats.interviewsScheduled} interviews booked</span>
        </Card>

        <Card className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Offers Extended</span>
          <div className="text-2xl font-extrabold text-emerald-400">{stats.offersReceived}</div>
          <span className="text-[11px] text-emerald-400 font-bold">11% Conversion</span>
        </Card>
      </div>

      {/* 3. Charts: Funnel Area Trend & Status Pie Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Applications Over Time */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-dark-800/80 border border-slate-800 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-400" />
            Applications & Interview Conversion Timeline
          </h3>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="appColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="intColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="applications" stroke="#6366F1" fillOpacity={1} fill="url(#appColor)" name="Applications Sent" />
                <Area type="monotone" dataKey="interviews" stroke="#F59E0B" fillOpacity={1} fill="url(#intColor)" name="Interviews Scheduled" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Pipeline Distribution */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-dark-800/80 border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between">
          <h3 className="text-sm font-bold text-white">Pipeline Stage Breakdown</h3>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusDistribution} innerRadius={45} outerRadius={65} paddingAngle={4} dataKey="value">
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px]">
            {statusDistribution.map((st) => (
              <div key={st.name} className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: st.color }} />
                <span>{st.name}: <strong>{st.value}</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Top Performing Resume Version & Role */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-dark-800/80 border border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Best Performing Resume Version</span>
            <h4 className="text-xs font-bold text-white mt-0.5">{stats.bestPerformingResume}</h4>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-dark-800/80 border border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Most Successful Target Role</span>
            <h4 className="text-xs font-bold text-white mt-0.5">{stats.mostSuccessfulRole}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationAnalytics;
