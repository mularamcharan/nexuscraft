import { Bookmark, Code2, ExternalLink, FolderGit2, Star } from "lucide-react";
import type { ProjectDiscoveryItem } from "@shared/types";

export function ProjectCard({
  project,
  onView
}: {
  project: ProjectDiscoveryItem;
  onView: () => void;
}) {
  return (
    <article className="group flex flex-col items-start justify-between gap-6 rounded-3xl border border-gray-800/80 bg-[#0e1628] p-6 shadow-xl transition-all hover:border-purple-500/40 md:flex-row md:items-center">
      <div className="min-w-0 flex-1 space-y-3">
        <div className="flex items-center gap-3">
          <span className="rounded-xl border border-purple-500/20 bg-purple-500/10 p-2.5 text-purple-400">
            <FolderGit2 className="h-5 w-5" />
          </span>
          <h3 className="text-lg font-black text-white transition-colors group-hover:text-purple-400">
            {project.title}
          </h3>
        </div>
        <p className="max-w-2xl text-xs leading-relaxed text-gray-400">{project.description}</p>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-lg border border-gray-800 bg-[#121c33] px-2.5 py-1 text-[10px] font-bold text-gray-300">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span className="inline-flex items-center gap-1.5">
            <Code2 className="h-3.5 w-3.5" />
            {project.tags.length} technologies
          </span>
          <span className="inline-flex items-center gap-1.5">
            {project.isBookmarked ? <Bookmark className="h-3.5 w-3.5 text-cyan-300" /> : <Star className="h-3.5 w-3.5 text-amber-300" />}
            {project.isBookmarked ? "Bookmarked" : `${project.stars} stars`}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={onView}
        className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl border border-gray-800 bg-[#121c33] px-6 py-3 text-xs font-extrabold text-purple-300 transition-all hover:bg-purple-600 hover:text-white md:w-auto"
      >
        View Project
        <ExternalLink className="h-3.5 w-3.5" />
      </button>
    </article>
  );
}
