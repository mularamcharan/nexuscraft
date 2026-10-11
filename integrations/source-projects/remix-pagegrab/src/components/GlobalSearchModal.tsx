import React, { useState } from 'react';
import { Search, X, BookOpen, Cpu, Sparkles, FolderGit2, Users, Award, ChevronRight, History } from 'lucide-react';
import { ActiveTab } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenModule?: (moduleId: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  setActiveTab,
  onOpenModule,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  if (!isOpen) return null;

  const filterTabs = ['All', 'Courses', 'Skills', 'Projects', 'Community', 'Users', 'Certificates'];

  const results = [
    { id: 'ai-mod-1', title: 'AI Innovation Fundamentals', type: 'Prompt', level: 'Beginner', lessons: '12 Challenges', rating: '4.8', tab: 'prompt-mastery' as ActiveTab },
    { id: 'ai-mod-2', title: 'Prompt Engineering Mastery', type: 'Practice', level: 'Advanced', lessons: '15 Lessons', rating: '4.9', tab: 'prompt-mastery' as ActiveTab },
    { id: 'env-mod-1', title: 'Climate Prediction using AI', type: 'Project', level: 'Intermediate', lessons: '8 Tasks', rating: '4.7', tab: 'portfolio' as ActiveTab },
    { id: 'ai-mod-3', title: 'Machine Learning Basics', type: 'Prompt', level: 'Beginner', lessons: '10 Challenges', rating: '4.5', tab: 'prompt-mastery' as ActiveTab },
    { id: 'env-mod-2', title: 'AI for Environmental Impact', type: 'Project', level: 'Intermediate', lessons: '10 Challenges', rating: '4.6', tab: 'portfolio' as ActiveTab },
  ];

  const recentSearches = ['Machine Learning', 'Prompt Engineering', 'Data Science', 'Climate Change', 'AI Innovation Basics'];
  const popularTags = ['AI', 'Sustainability', 'Python', 'Web Development', 'Data Analytics', 'Deep Learning', 'Environmental Solutions', 'Interview Skills'];

  const filteredResults = results.filter(r => {
    const matchesQuery = !searchQuery || r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || (activeFilter === 'Courses' && r.type === 'Course') || (activeFilter === 'Projects' && r.type === 'Project');
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-8 sm:pt-16 px-4 animate-fadeIn">
      <div className="bg-[#0b1222] border border-[#1e2d4a] rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Header Input */}
        <div className="p-4 sm:p-6 border-b border-[#1e2d4a] relative flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for courses, skills, projects, people..."
            autoFocus
            className="w-full bg-transparent text-white text-sm sm:text-base placeholder-gray-500 outline-none font-medium"
          />
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#10192d] hover:bg-[#182542] text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 sm:px-6 py-3 border-b border-[#1e2d4a] bg-[#080d1a] flex items-center gap-2 overflow-x-auto custom-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === tab
                  ? 'bg-[#2563eb] text-white shadow-md'
                  : 'bg-[#10192d] text-gray-400 hover:text-white hover:bg-[#182542] border border-[#1e2d4a]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar space-y-6">
          {/* Top Results List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Top Results</h4>
            <div className="space-y-2">
              {filteredResults.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (onOpenModule && item.id) onOpenModule(item.id);
                    else setActiveTab(item.tab);
                    onClose();
                  }}
                  className="p-3.5 rounded-2xl bg-[#10192d] hover:bg-[#182542] border border-[#1e2d4a] hover:border-blue-500/50 flex items-center justify-between transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#2563eb]/20 text-[#38bdf8] flex items-center justify-center font-bold shrink-0">
                      {item.type === 'Course' ? <BookOpen className="w-5 h-5" /> : <FolderGit2 className="w-5 h-5" />}
                    </div>
                    <div className="min-w-0">
                      <h5 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                        {item.title}
                      </h5>
                      <p className="text-xs text-gray-400 truncate">
                        {item.type} • {item.level} • {item.lessons} • ★ {item.rating}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase shrink-0 ${
                    item.type === 'Course' ? 'bg-[#2563eb]/20 text-blue-400 border border-[#2563eb]/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  }`}>
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Searches & Popular Searches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#1e2d4a]">
            {/* Recent Searches */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-blue-400" /> Recent Searches
                </span>
              </div>
              <div className="space-y-1.5">
                {recentSearches.map((term, i) => (
                  <div
                    key={i}
                    onClick={() => setSearchQuery(term)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#080d1a] hover:bg-[#10192d] text-xs font-medium text-gray-300 hover:text-white cursor-pointer transition-colors"
                  >
                    <span>{term}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Searches */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Popular Searches</span>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, i) => (
                  <button
                    key={i}
                    onClick={() => setSearchQuery(tag)}
                    className="px-3 py-1.5 rounded-xl bg-[#10192d] hover:bg-[#182542] border border-[#1e2d4a] text-xs font-medium text-gray-300 hover:text-white cursor-pointer transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#1e2d4a] bg-[#080d1a] flex items-center justify-between text-xs text-gray-400">
          <span>Press ESC or click anywhere outside to close</span>
          <button
            onClick={() => {
              setActiveTab('portfolio');
              onClose();
            }}
            className="text-blue-400 hover:underline font-semibold flex items-center gap-1"
          >
            View all results for "{searchQuery || 'AI'}" <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
