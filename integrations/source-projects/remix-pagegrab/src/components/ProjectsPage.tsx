import React, { useState } from 'react';
import { Code2, ExternalLink, Plus, Bookmark, Star, Filter, FolderGit2 } from 'lucide-react';
import { ActiveTab, UserState } from '../types';

interface ProjectsPageProps {
  userState?: UserState;
  onNavigateTab: (tab: ActiveTab) => void;
  onSendToast?: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigateTab, onSendToast }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'my' | 'bookmarked'>('all');

  const projects = [
    {
      id: 'e-commerce',
      title: 'E-Commerce Website',
      description: 'Build a full-stack e-commerce app using MERN Stack with payment processing and inventory management.',
      tags: ['React', 'Node.js', 'Express', 'MongoDB'],
      stars: 342,
      isBookmarked: true,
      category: 'all'
    },
    {
      id: 'task-mgmt',
      title: 'Task Management App',
      description: 'A productivity app to manage tasks, collaborate with team members, and track real-time progress.',
      tags: ['TypeScript', 'React', 'Tailwind', 'Firebase'],
      stars: 189,
      isBookmarked: false,
      category: 'my'
    },
    {
      id: 'weather-dash',
      title: 'Weather Dashboard',
      description: 'Real-time weather app with API integration, location search, radar maps, and 7-day forecasts.',
      tags: ['React', 'OpenWeather API', 'Chart.js'],
      stars: 215,
      isBookmarked: true,
      category: 'all'
    },
    {
      id: 'portfolio-site',
      title: 'Portfolio Website',
      description: 'Personal portfolio website template showcasing projects, skill sets, contact forms, and dark mode.',
      tags: ['HTML', 'Tailwind CSS', 'JavaScript'],
      stars: 420,
      isBookmarked: false,
      category: 'my'
    }
  ];

  const filteredProjects = projects.filter(p => {
    if (activeFilter === 'my') return p.category === 'my';
    if (activeFilter === 'bookmarked') return p.isBookmarked;
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Projects</h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Build real-world projects and showcase your skills</p>
        </div>
        <button
          onClick={() => {
            if (onSendToast) onSendToast('Opened New Project Builder Modal', 'info');
          }}
          className="px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 transition-all cursor-pointer flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
        {[
          { id: 'all', label: 'All Projects' },
          { id: 'my', label: 'My Projects' },
          { id: 'bookmarked', label: 'Bookmarked' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeFilter === tab.id
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-[#0e1628] text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-[#0e1628] border border-gray-800/80 rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-purple-500/40 transition-all shadow-xl group"
          >
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <FolderGit2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-white group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
              </div>

              <p className="text-xs text-gray-400 max-w-2xl leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-[#121c33] border border-gray-800 text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 border-gray-800/60 pt-4 md:pt-0">
              <button
                onClick={() => {
                  if (onSendToast) onSendToast(`Opening ${project.title}...`, 'info');
                  onNavigateTab('portfolio');
                }}
                className="px-6 py-3 rounded-2xl bg-[#121c33] hover:bg-purple-600 hover:text-white border border-gray-800 text-purple-300 font-extrabold text-xs transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap"
              >
                <span>View Project</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
