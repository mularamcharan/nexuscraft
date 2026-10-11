import React, { useEffect, useState, type FormEvent } from 'react';
import { Filter, Plus } from 'lucide-react';
import { ActiveTab, UserState } from '../types';
import type { ProjectDiscoveryItem, ProjectInput } from '@shared/types';
import { getProjects, saveProject } from '@/api-client';
import { ProjectCard } from '@/components/project-card';

interface ProjectsPageProps {
  userState?: UserState;
  onNavigateTab: (tab: ActiveTab) => void;
  onSendToast?: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigateTab, onSendToast }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'my' | 'bookmarked'>('all');
  const [projects, setProjects] = useState<ProjectDiscoveryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectTags, setProjectTags] = useState('');
  const [isSavingProject, setIsSavingProject] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    getProjects()
      .then((loadedProjects) => {
        if (isActive) setProjects(loadedProjects);
      })
      .catch((error: unknown) => {
        if (isActive) {
          const message = error instanceof Error ? error.message : 'Projects could not be loaded.';
          setLoadError(message);
        }
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  async function handleCreateProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSavingProject(true);
    setSaveError(null);
    const input: ProjectInput = {
      title: projectTitle.trim(),
      description: projectDescription.trim(),
      tags: projectTags.split(',').map((tag) => tag.trim()).filter(Boolean)
    };

    try {
      const createdProject = await saveProject(input);
      setProjects((currentProjects) => [createdProject, ...currentProjects]);
      setProjectTitle('');
      setProjectDescription('');
      setProjectTags('');
      setIsProjectFormOpen(false);
      onSendToast?.('Project added to your workspace.', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Project could not be saved.';
      setSaveError(message);
      onSendToast?.(message, 'error');
    } finally {
      setIsSavingProject(false);
    }
  }

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
          onClick={() => setIsProjectFormOpen(true)}
          className="px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 transition-all cursor-pointer flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
        <Filter aria-hidden="true" className="mr-1 h-4 w-4 text-gray-500" />
        {[
          { id: 'all' as const, label: 'All Projects' },
          { id: 'my' as const, label: 'My Projects' },
          { id: 'bookmarked' as const, label: 'Bookmarked' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
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
        {isLoading && <p role="status" className="text-sm text-gray-400">Loading projects…</p>}
        {loadError && <p role="alert" className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-200">{loadError}</p>}
        {!isLoading && !loadError && filteredProjects.length === 0 && (
          <p className="rounded-xl border border-gray-800 p-6 text-sm text-gray-400">No projects match this filter yet.</p>
        )}
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onView={() => {
              onSendToast?.(`Opening ${project.title}...`, 'info');
              onNavigateTab('portfolio');
            }}
          />
        ))}
      </div>

      {isProjectFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
          <form onSubmit={handleCreateProject} className="w-full max-w-xl space-y-4 rounded-2xl border border-gray-700 bg-[#0e1628] p-6 shadow-2xl">
            <div>
              <h2 className="text-lg font-extrabold text-white">Add a project</h2>
              <p className="mt-1 text-xs text-gray-400">Save a project to your workspace portfolio.</p>
            </div>
            <label className="block text-xs font-semibold text-gray-300">
              Project name
              <input required maxLength={120} value={projectTitle} onChange={(event) => setProjectTitle(event.target.value)} className="mt-2 w-full rounded-xl border border-gray-700 bg-[#080d1a] px-3 py-2.5 text-sm text-white" />
            </label>
            <label className="block text-xs font-semibold text-gray-300">
              Description
              <textarea required maxLength={2000} rows={4} value={projectDescription} onChange={(event) => setProjectDescription(event.target.value)} className="mt-2 w-full resize-y rounded-xl border border-gray-700 bg-[#080d1a] px-3 py-2.5 text-sm text-white" />
            </label>
            <label className="block text-xs font-semibold text-gray-300">
              Technologies (comma separated)
              <input maxLength={500} value={projectTags} onChange={(event) => setProjectTags(event.target.value)} className="mt-2 w-full rounded-xl border border-gray-700 bg-[#080d1a] px-3 py-2.5 text-sm text-white" placeholder="React, TypeScript, SQLite" />
            </label>
            {saveError && <p role="alert" className="text-sm text-rose-300">{saveError}</p>}
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setIsProjectFormOpen(false)} className="rounded-xl border border-gray-700 px-4 py-2 text-sm text-gray-300">Cancel</button>
              <button disabled={isSavingProject} className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-60">
                {isSavingProject ? 'Saving…' : 'Save project'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
