"use client";
import { challenges, learningPath } from "@/lib/learning";
import { featureNavigation, navigation } from "@/lib/data";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type Item = { title: string; description: string; href: string; category: string; terms: string };
const items: Item[] = [
  ...navigation.map((item) => ({ title: item.label, description: "Open " + item.label.toLowerCase(), href: item.href, category: "Page", terms: item.label + " " + item.href })),
  ...featureNavigation
    .map((item) => ({
      title: item.label,
      description: "Open " + item.label.toLowerCase(),
      href: "/features?tab=" + item.tab,
      category: "Learning tool",
      terms: item.label + " " + item.tab
    })),
  { title: learningPath.title, description: learningPath.description, href: "/learning-paths", category: "Learning path", terms: learningPath.title + " " + learningPath.description },
  ...learningPath.lessons.map((lesson) => ({ title: lesson.title, description: lesson.minutes + " minute lesson in " + learningPath.title, href: "/lessons?id=" + encodeURIComponent(lesson.id), category: "Lesson", terms: lesson.title + " " + lesson.body.join(" ") })),
  ...challenges.map((challenge) => ({ title: challenge.title, description: challenge.instructions, href: "/challenges/" + challenge.id, category: "Challenge", terms: challenge.title + " " + challenge.skill + " " + challenge.instructions })),
  { title: learningPath.project.title, description: learningPath.project.description, href: "/projects", category: "Guided project", terms: learningPath.project.title + " " + learningPath.project.description },
];

export function GlobalSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => !q || (item.title + " " + item.description + " " + item.terms).toLowerCase().includes(q)).slice(0, 10);
  }, [query]);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("search") === "1") {
      url.searchParams.delete("search");
      window.history.replaceState(null, "", url.pathname + url.search + url.hash);
      setOpen(true);
    }

    function onKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setOpen(true); }
      else if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  useEffect(() => {
    if (open) { setActive(0); requestAnimationFrame(() => input.current?.focus()); }
    else setQuery("");
  }, [open]);

  function visit(href: string) { setOpen(false); router.push(href); }

  return <>
    <button type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-label="Search NexusCraft" className="button-secondary min-h-9 px-3 text-xs sm:px-4 sm:text-sm">
      <span aria-hidden="true">⌕</span><span>Search</span><kbd className="hidden rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-muted sm:inline">Ctrl K</kbd>
    </button>
    {open && <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 pt-[10vh] backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="search-title" className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0d1626] shadow-2xl">
        <h2 id="search-title" className="sr-only">Search NexusCraft</h2>
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
          <span aria-hidden="true" className="text-xl text-accent">⌕</span>
          <input ref={input} value={query} onChange={(event) => { setQuery(event.target.value); setActive(0); }} onKeyDown={(event) => {
            if (event.key === "ArrowDown") { event.preventDefault(); setActive((i) => Math.min(i + 1, results.length - 1)); }
            else if (event.key === "ArrowUp") { event.preventDefault(); setActive((i) => Math.max(i - 1, 0)); }
            else if (event.key === "Enter" && results[active]) { event.preventDefault(); visit(results[active].href); }
          }} placeholder="Search paths, lessons, challenges, projects…" aria-label="Search learning content" aria-controls="search-results" aria-activedescendant={results[active] ? "search-item-" + active : undefined} className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500" />
          <button type="button" onClick={() => setOpen(false)} className="button-secondary px-3 py-1.5 text-xs">Esc</button>
        </div>
        <div id="search-results" role="listbox" aria-label="Search results" className="max-h-[60vh] overflow-y-auto p-2">
          {results.length ? results.map((item, index) => <button id={"search-item-" + index} key={item.category + item.href + item.title} type="button" role="option" aria-selected={active === index} onMouseEnter={() => setActive(index)} onClick={() => visit(item.href)} className={"flex w-full items-start justify-between gap-4 rounded-xl px-4 py-3 text-left " + (active === index ? "bg-white/[0.08]" : "hover:bg-white/[0.05]")}>
            <span className="min-w-0"><span className="block truncate text-sm font-medium text-white">{item.title}</span><span className="mt-1 block line-clamp-2 text-xs leading-5 text-muted">{item.description}</span></span><span className="shrink-0 rounded-md bg-white/[0.06] px-2 py-1 text-[10px] text-slate-400">{item.category}</span>
          </button>) : <p className="px-4 py-10 text-center text-sm text-muted">No matching learning content or pages.</p>}
        </div>
        <p className="border-t border-white/10 px-5 py-3 text-xs text-muted">Use ↑ and ↓ to navigate, Enter to open, or Esc to close.</p>
      </section>
    </div>}
  </>;
}