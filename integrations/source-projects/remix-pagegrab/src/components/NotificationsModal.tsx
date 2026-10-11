import React, { useState } from 'react';
import { Bell, X, Shield, Award, CheckCircle2, MessageSquare, Zap, Clock } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'New badge earned! 🎉',
      desc: "You earned the 'AI Explorer' badge",
      time: '2m ago',
      type: 'badge',
      read: false,
      icon: Award,
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    },
    {
      id: '2',
      title: 'Course completed! ✅',
      desc: "Congratulations! You completed 'AI Basics'",
      time: '1h ago',
      type: 'course',
      read: false,
      icon: CheckCircle2,
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    },
    {
      id: '3',
      title: 'New challenge available',
      desc: 'Climate Challenge 2024 is now live',
      time: '3h ago',
      type: 'challenge',
      read: false,
      icon: Zap,
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    },
    {
      id: '4',
      title: 'Ananya Reddy commented on your project',
      desc: 'Great work on your project!',
      time: '5h ago',
      type: 'mention',
      read: true,
      icon: MessageSquare,
      color: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    },
    {
      id: '5',
      title: 'Workshop reminder ⏰',
      desc: 'AI in Sustainability starts in 1 hour',
      time: '1d ago',
      type: 'workshop',
      read: true,
      icon: Clock,
      color: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    },
  ]);

  if (!isOpen) return null;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const filteredNotifs = notifications.filter(n => {
    if (activeTab === 'Unread') return !n.read;
    if (activeTab === 'Mentions') return n.type === 'mention';
    if (activeTab === 'System') return n.type === 'badge' || n.type === 'course';
    if (activeTab === 'Updates') return n.type === 'challenge' || n.type === 'workshop';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#0b1222] border border-[#1e2d4a] rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#1e2d4a] flex items-center justify-between bg-[#080d1a]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#2563eb]/20 text-blue-400">
              <Bell className="w-5 h-5" />
            </div>
            <h3 className="font-display font-extrabold text-lg text-white">Notifications</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllAsRead}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 cursor-pointer"
            >
              Mark all as read
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-[#10192d] text-gray-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="px-5 py-3 border-b border-[#1e2d4a] bg-[#0b1222] flex items-center gap-2 overflow-x-auto custom-scrollbar">
          {['All', 'Unread', 'Mentions', 'System', 'Updates'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#2563eb] text-white shadow-md'
                  : 'bg-[#10192d] text-gray-400 hover:text-white border border-[#1e2d4a]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="p-5 overflow-y-auto custom-scrollbar space-y-3 flex-1">
          {filteredNotifs.length === 0 ? (
            <div className="py-8 text-center text-xs text-gray-400">No notifications in this filter</div>
          ) : (
            filteredNotifs.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                    item.read
                      ? 'bg-[#080d1a]/60 border-[#1e2d4a]/50 text-gray-300'
                      : 'bg-[#10192d] border-[#1e2d4a] text-white shadow-md'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl border shrink-0 ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                      <span className="text-[10px] text-gray-500 shrink-0">{item.time}</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1e2d4a] bg-[#080d1a] text-center">
          <button
            onClick={() => {}}
            className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
          >
            Load more
          </button>
        </div>
      </div>
    </div>
  );
};
