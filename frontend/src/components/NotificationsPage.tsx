import React from 'react';
import { Bell, Award, CheckCircle2, Zap, MessageSquare, ArrowLeft } from 'lucide-react';
import { ActiveTab } from '../types';

interface NotificationsPageProps {
  onNavigateTab: (tab: ActiveTab) => void;
  onSendToast?: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({ onNavigateTab, onSendToast }) => {
  const notifications = [
    {
      id: '1',
      title: 'New badge earned! 🎉',
      desc: "You earned the 'AI Explorer' badge",
      time: '2m ago',
      icon: Award,
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    },
    {
      id: '2',
      title: 'Course completed! ✅',
      desc: "Congratulations! You completed 'AI Basics'",
      time: '1h ago',
      icon: CheckCircle2,
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    },
    {
      id: '3',
      title: 'New challenge available ⚡',
      desc: 'Climate Challenge 2026 is now live',
      time: '3h ago',
      icon: Zap,
      color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    },
    {
      id: '4',
      title: 'Community feedback received',
      desc: 'Ananya Reddy commented on your project submission.',
      time: '5h ago',
      icon: MessageSquare,
      color: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-fadeIn">
      <div className="flex items-center justify-between bg-[#0e1628] border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white">Notifications</h1>
            <p className="text-xs text-slate-400">Stay updated on your learning milestones and community updates</p>
          </div>
        </div>
        <button
          onClick={() => onNavigateTab('prompt-mastery')}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Prompt Lab</span>
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className="bg-[#0e1628] border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex items-start gap-4 transition-all shadow-md"
            >
              <div className={`p-2.5 rounded-xl border ${item.color} shrink-0 mt-0.5`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xs font-bold text-white">{item.title}</h3>
                  <span className="text-[10px] text-slate-500">{item.time}</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
