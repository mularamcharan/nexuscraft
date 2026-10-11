import React, { useState } from 'react';
import { User, Award, BookOpen, Star, MessageSquare, UserPlus, FolderGit2, CheckCircle, Code2, Sparkles } from 'lucide-react';
import { ActiveTab, UserState } from '../types';

interface PublicProfilePageProps {
  userState: UserState;
  onNavigateTab: (tab: ActiveTab) => void;
  onSendToast?: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const PublicProfilePage: React.FC<PublicProfilePageProps> = ({ userState, onNavigateTab, onSendToast }) => {
  const [activeTab, setActiveTab] = useState<'about' | 'projects' | 'skills' | 'activity'>('about');
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    if (onSendToast) {
      onSendToast(isFollowing ? 'Unfollowed Sathwik' : 'Now following Sathwik!', 'info');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Profile Header Card */}
      <div className="bg-[#0e1628] border border-gray-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 p-1 shadow-2xl shrink-0">
            <div className="w-full h-full bg-[#0e1628] rounded-full flex items-center justify-center font-black text-2xl text-purple-400">
              {userState.userName.charAt(0)}
            </div>
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">{userState.userName || 'Sathwik Sai Varma'}</h1>
                <p className="text-xs font-bold text-purple-400">@sathwik</p>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleFollow}
                  className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer flex items-center gap-2 ${
                    isFollowing
                      ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                      : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{isFollowing ? 'Following' : 'Follow'}</span>
                </button>

                <button
                  onClick={() => onNavigateTab('messages')}
                  className="px-5 py-2.5 rounded-xl bg-[#121c33] hover:bg-[#182542] border border-gray-800 text-gray-300 hover:text-white font-extrabold text-xs transition-all cursor-pointer flex items-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                  <span>Message</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-300 max-w-xl">
              Passionate learner and builder. Always exploring new technologies and crafting full-stack AI solutions.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-800/60">
          {[
            { label: 'Courses', value: '12' },
            { label: 'Points', value: `${(userState.totalPoints + 8500).toLocaleString()}` },
            { label: 'Badges', value: '24' },
            { label: 'Followers', value: '156' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-[#121c33] border border-gray-800 rounded-2xl p-4 text-center">
              <div className="text-lg sm:text-xl font-black text-white">{stat.value}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-800">
        <div className="flex items-center gap-6 overflow-x-auto custom-scrollbar">
          {[
            { id: 'about', label: 'About' },
            { id: 'projects', label: 'Projects' },
            { id: 'skills', label: 'Skills' },
            { id: 'activity', label: 'Activity' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 text-xs font-bold transition-all cursor-pointer border-b-2 ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'about' && (
        <div className="bg-[#0e1628] border border-gray-800/80 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl">
          <div>
            <h2 className="text-sm font-black text-white uppercase tracking-wider mb-2">About</h2>
            <p className="text-xs text-gray-300 leading-relaxed">
              I am a software engineer and AI enthusiast focused on building interactive web applications, real-time tools, and clean user interfaces.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-black text-white uppercase tracking-wider mb-3">Top Skills</h2>
            <div className="flex flex-wrap gap-2">
              {['React', 'Python', 'MongoDB', 'Tailwind CSS', 'TypeScript', 'Node.js', 'FastAPI'].map((skill, i) => (
                <span key={i} className="px-3 py-1.5 rounded-xl bg-[#121c33] border border-gray-800 text-purple-300 text-xs font-bold">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'E-Commerce Website', desc: 'MERN stack store with cart and payments.' },
            { name: 'Task Management App', desc: 'Real-time task board built with React & Firebase.' }
          ].map((p, idx) => (
            <div key={idx} className="bg-[#0e1628] border border-gray-800/80 rounded-2xl p-5 space-y-2">
              <h3 className="text-sm font-extrabold text-white">{p.name}</h3>
              <p className="text-xs text-gray-400">{p.desc}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'skills' && (
        <div className="bg-[#0e1628] border border-gray-800/80 rounded-3xl p-6 space-y-3">
          <h2 className="text-sm font-black text-white uppercase tracking-wider">Verified Badges</h2>
          <div className="flex flex-wrap gap-2">
            {['React Master', 'Python Pro', 'Full Stack Capstone', 'AI Innovator'].map((b, i) => (
              <div key={i} className="p-3 rounded-2xl bg-[#121c33] border border-purple-500/30 text-purple-300 text-xs font-extrabold flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-400" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="bg-[#0e1628] border border-gray-800/80 rounded-3xl p-6 space-y-3 text-xs text-gray-400">
          <div className="p-3 rounded-xl bg-[#121c33] border border-gray-800">
            Completed <strong className="text-white">Full Stack Web Development</strong> module.
          </div>
        </div>
      )}
    </div>
  );
};
