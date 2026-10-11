import React from 'react';
import { ActiveTab, UserState } from '../types';
import { 
  LayoutDashboard, 
  BookOpen,
  Target, 
  Users, 
  Video, 
  Bot, 
  FolderGit2, 
  Award, 
  BarChart3, 
  MessageSquare,
  MessageSquareCode, 
  Settings, 
  HelpCircle, 
  Hexagon,
  Menu,
  Code2,
  GraduationCap,
  Rocket
} from 'lucide-react';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  userState: UserState;
  onOpenProfile: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onHelpCenter?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  userState,
  onOpenProfile,
  isCollapsed,
  onToggleCollapse,
  onHelpCenter,
}) => {
  const currentLevel = Math.floor(userState.totalPoints / 200) + 1;

  const mainNavItems = [
    { id: 'prompt-mastery' as ActiveTab, label: 'Prompt Mastery', icon: MessageSquareCode },
    { id: 'learner-space' as ActiveTab, label: 'Community', icon: Users },
    { id: 'portfolio' as ActiveTab, label: 'Career & Portfolio', icon: FolderGit2 },
    { id: 'messages' as ActiveTab, label: 'Messages', icon: MessageSquare },
    { id: 'settings' as ActiveTab, label: 'Settings', icon: Settings },
  ];

  return (
    <aside className={`bg-[#0b1222] border-r border-[#1e2d4a] flex flex-col justify-between fixed top-0 bottom-0 left-0 z-40 hidden md:flex select-none transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex flex-col h-full overflow-y-auto custom-scrollbar p-3.5 space-y-5">
        {/* Brand Logo & Collapse Toggle */}
        <div className="flex items-center justify-between px-2 pt-2 pb-1">
          {!isCollapsed && (
            <div 
              onClick={() => setActiveTab('prompt-mastery')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#2563eb] to-[#38bdf8] p-0.5 shadow-md flex-shrink-0 flex items-center justify-center">
                <div className="w-full h-full bg-[#0b1222] rounded-[10px] flex items-center justify-center">
                  <Hexagon className="w-4 h-4 text-[#38bdf8] fill-[#2563eb]/20" />
                </div>
              </div>
              <span className="font-display font-extrabold text-lg tracking-tight text-white group-hover:text-blue-400 transition-colors">
                NexusCraft
              </span>
            </div>
          )}

          <button
            onClick={onToggleCollapse}
            className={`p-2 rounded-xl bg-[#10192d] hover:bg-[#182542] border border-[#1e2d4a] text-gray-400 hover:text-white transition-all cursor-pointer flex items-center justify-center ${isCollapsed ? 'mx-auto' : ''}`}
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <Menu className="w-4 h-4 text-gray-300" />
          </button>
        </div>

        {/* Navigation Items List */}
        <div className="space-y-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0 py-2.5' : 'gap-3 px-3.5 py-2.5'} rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#2563eb] text-white shadow-lg shadow-blue-600/30 font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-[#141f36]'
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* User Footer Profile Card */}
      <div className="p-3 border-t border-[#1e2d4a] bg-[#080d1a]">
        <div 
          onClick={onOpenProfile}
          title={isCollapsed ? `${userState.userName} (Level ${currentLevel})` : undefined}
          className={`flex items-center ${isCollapsed ? 'justify-center p-2' : 'gap-3 p-2.5'} rounded-xl bg-[#10192d] hover:bg-[#182542] border border-[#1e2d4a] cursor-pointer transition-all group`}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563eb] to-[#38bdf8] flex items-center justify-center font-bold text-white text-xs shadow flex-shrink-0">
            {userState.userName.charAt(0)}
          </div>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-bold text-white truncate group-hover:text-blue-400 transition-colors">
                {userState.userName}
              </span>
              <span className="text-[10px] text-gray-400 truncate">
                Lvl {currentLevel} • {userState.totalPoints} XP
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
