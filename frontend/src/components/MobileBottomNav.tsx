import React from 'react';
import { ActiveTab } from '../types';
import { MessageSquareCode, FolderGit2, Users, Bell, User } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenNotifications,
  onOpenProfile,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080d1a]/95 backdrop-blur-md border-t border-[#1e2d4a] px-3 py-2 flex items-center justify-around shadow-2xl">
      <button
        onClick={() => setActiveTab('prompt-mastery')}
        className={`flex flex-col items-center gap-1 transition-all ${
          activeTab === 'prompt-mastery' ? 'text-blue-400 font-bold' : 'text-gray-400 hover:text-white'
        }`}
      >
        <MessageSquareCode className="w-5 h-5" />
        <span className="text-[10px]">Prompts</span>
      </button>

      <button
        onClick={() => setActiveTab('portfolio')}
        className={`flex flex-col items-center gap-1 transition-all ${
          activeTab === 'portfolio' ? 'text-blue-400 font-bold' : 'text-gray-400 hover:text-white'
        }`}
      >
        <FolderGit2 className="w-5 h-5" />
        <span className="text-[10px]">Portfolio</span>
      </button>

      <button
        onClick={() => setActiveTab('learner-space')}
        className={`flex flex-col items-center gap-1 transition-all ${
          activeTab === 'learner-space' ? 'text-blue-400 font-bold' : 'text-gray-400 hover:text-white'
        }`}
      >
        <Users className="w-5 h-5" />
        <span className="text-[10px]">Community</span>
      </button>

      <button
        onClick={onOpenNotifications}
        className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-all relative"
      >
        <Bell className="w-5 h-5" />
        <span className="text-[10px]">Alerts</span>
        <span className="absolute top-0 right-2 w-2 h-2 rounded-full bg-blue-500" />
      </button>

      <button
        onClick={onOpenProfile}
        className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-all"
      >
        <User className="w-5 h-5" />
        <span className="text-[10px]">Profile</span>
      </button>
    </nav>
  );
};
