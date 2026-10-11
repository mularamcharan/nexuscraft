"use client";

import { DemoWorkspace } from "@/components/demo-workspace";
import { ProjectsPage } from "@/src/components/ProjectsPage";
import type { ActiveTab } from "@/src/types";

export function ProjectsWorkspace() {
  function navigateFeature(tab: ActiveTab) {
    window.location.assign(`/features?tab=${encodeURIComponent(tab)}`);
  }

  return (
    <div className="space-y-10">
      <DemoWorkspace view="projects" />
      <section aria-label="Project discovery" className="border-t border-white/[0.08] pt-8">
        <ProjectsPage onNavigateTab={navigateFeature} />
      </section>
    </div>
  );
}
