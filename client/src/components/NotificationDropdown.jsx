import React, { useState } from 'react';
import { 
  Bell, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Calendar, 
  Flame, 
  Briefcase,
  X 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'ATS Score Elevated to 88%',
      desc: 'Your resume keywords match top 8% Senior Engineer criteria.',
      time: '2 hours ago',
      icon: TrendingUp,
      color: 'text-emerald-400',
      unread: true,
      link: '/analysis-result',
    },
    {
      id: '2',
      title: 'Interview Scheduled with Stripe',
      desc: 'Technical screen coming up in 2 days. Review STAR prep questions.',
      time: '5 hours ago',
      icon: Calendar,
      color: 'text-amber-400',
      unread: true,
      link: '/interview-prep',
    },
    {
      id: '3',
      title: '5-Day Career Streak Active 🔥',
      desc: 'Complete today\'s challenge to keep your momentum going!',
      time: '1 day ago',
      icon: Flame,
      color: 'text-rose-400',
      unread: false,
      link: '/dashboard',
    },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-400 hover:text-white rounded-xl hover:bg-dark-800 transition-colors"
        title="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 ring-2 ring-dark-900 animate-pulse" />
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-dark-850 border border-slate-800 shadow-2xl p-4 z-50 space-y-3 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">Smart Career Notifications</span>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 text-[10px] font-bold">
                    {unreadCount} New
                  </span>
                )}
              </div>
              <button
                onClick={markAllAsRead}
                className="text-[11px] text-brand-400 hover:text-brand-300 font-semibold"
              >
                Mark all read
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto">
              {notifications.map((n) => (
                <Link
                  key={n.id}
                  to={n.link}
                  onClick={() => setIsOpen(false)}
                  className={`block p-3 rounded-xl border transition-all text-xs ${
                    n.unread
                      ? 'bg-dark-900 border-brand-500/30 hover:border-brand-500/60'
                      : 'bg-dark-900/50 border-slate-800/80 hover:bg-dark-800'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <n.icon className={`w-4 h-4 mt-0.5 shrink-0 ${n.color}`} />
                    <div className="space-y-0.5">
                      <div className="font-bold text-slate-100 flex items-center gap-2">
                        <span>{n.title}</span>
                        {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />}
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{n.desc}</p>
                      <span className="text-[10px] text-slate-500 block pt-0.5">{n.time}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;
