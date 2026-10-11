import React, { useState } from 'react';
import { Search, ChevronRight, BookOpen, FolderGit2, User, FileText, ArrowRight } from 'lucide-react';
import { ActiveTab } from '../types';

interface SearchPageProps {
  onNavigateTab: (tab: ActiveTab) => void;
  onSendToast?: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ onNavigateTab }) => {
  const [query, setQuery] = useState('react');
  const [activeCategory, setActiveCategory] = useState<'all' | 'prompts' | 'projects' | 'users' | 'resources'>('all');

  const results = [
    {
      id: 1,
      title: 'AI Prompt Engineering Studio',
      type: 'Prompt Studio',
      category: 'prompts',
      desc: 'Hands-on prompt optimization and automated environmental intelligence reasoning.',
      icon: BookOpen,
      targetTab: 'prompt-mastery' as ActiveTab
    },
    {
      id: 2,
      title: 'Building with React',
      type: 'Project',
      category: 'projects',
      desc: 'Step-by-step practical build guide for creating a multi-page SaaS product dashboard in React.',
      icon: FolderGit2,
      targetTab: 'portfolio' as ActiveTab
    },
    {
      id: 3,
      title: 'Prompt Engineering Frameworks',
      type: 'Prompts',
      category: 'prompts',
      desc: 'Learn advanced prompting techniques, zero-shot and few-shot reasoning, and guardrails.',
      icon: BookOpen,
      targetTab: 'prompt-mastery' as ActiveTab
    },
    {
      id: 4,
      title: 'Full-Stack Portfolio Showcase',
      type: 'Project',
      category: 'projects',
      desc: 'Deep dive into microservices, containerization, and modern deployment pipelines.',
      icon: FolderGit2,
      targetTab: 'portfolio' as ActiveTab
    }
  ];

  const filtered = results.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Search Input Header */}
      <div className="bg-[#0e1628] border border-gray-800/80 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-purple-400 absolute left-4 top-4" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, projects, users..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#121c33] border border-gray-800 text-sm font-medium text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pt-1">
          {[
            { id: 'all', label: 'All' },
            { id: 'prompts', label: 'Prompts & Skills' },
            { id: 'projects', label: 'Projects' },
            { id: 'users', label: 'Users' },
            { id: 'resources', label: 'Resources' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-[#121c33] text-gray-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-[#0e1628] border border-gray-800/80 rounded-2xl p-5 flex items-center justify-between gap-4 hover:border-purple-500/40 transition-all shadow-lg group cursor-pointer"
            onClick={() => onNavigateTab(item.targetTab)}
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                <item.icon className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#121c33] text-gray-400 border border-gray-800">
                    {item.type}
                  </span>
                </div>
                <p className="text-xs text-gray-400 line-clamp-1">{item.desc}</p>
              </div>
            </div>

            <button className="px-4 py-2 rounded-xl bg-[#121c33] group-hover:bg-purple-600 text-purple-300 group-hover:text-white text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1 shrink-0">
              <span>View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
