"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { featureNavigation, navigation } from "@/lib/data";
import { Icon } from "@/components/icon";
import { GlobalSearch } from "@/components/global-search";

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="NexusCraft home">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-ink">
        <Icon name="sparkle" size={21} />
      </span>
      <span className="text-base font-semibold tracking-tight text-white">NexusCraft</span>
    </Link>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  if (pathname === "/") return <>{children}</>;

  const navLinks = (
    <>
      <p className="px-3 pb-2 pt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Workspace</p>
      {navigation.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            aria-current={active ? "page" : undefined}
            className={`nav-link ${active ? "nav-link-active" : ""}`}
          >
            <Icon name={item.icon} size={18} />
            {item.label}
          </Link>
        );
      })}
      <details className="mt-2" open={pathname === "/features"}>
        <summary className="nav-link cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <Icon name="sparkle" size={18} />Learning tools
        </summary>
        <nav aria-label="Learning tools" className="mt-1 space-y-1 border-l border-white/[0.08] pl-2">
          {featureNavigation.map((item) => {
            const href = `/features?tab=${item.tab}`;
            return (
              <Link
                key={item.tab}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="nav-link text-xs"
              >
                <Icon name={item.icon} size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </details>
      <p className="px-3 pb-2 pt-7 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">You</p>
      <Link
        href="/features?tab=public-profile"
        onClick={() => setMenuOpen(false)}
        className="nav-link"
      >
        <Icon name="user" size={18} />Profile
      </Link>
      <Link
        href="/features?tab=settings"
        onClick={() => setMenuOpen(false)}
        className="nav-link"
      >
        <Icon name="settings" size={18} />Settings
      </Link>
    </>
  );

  return (
    <div className="min-h-screen bg-ink text-slate-100">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[248px] flex-col border-r border-white/[0.07] bg-[#0d1626] px-4 py-6 lg:flex">
        <div className="px-2"><Brand /></div>
        <nav aria-label="Main navigation" className="mt-5 min-h-0 flex-1 overflow-y-auto">{navLinks}</nav>
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4">
          <p className="text-sm font-medium text-white">Keep building</p>
          <p className="mt-1 text-xs leading-5 text-muted">Small steps turn ideas into skills.</p>
          <Link href="/learning-paths" className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-accent hover:text-white">
            Explore a path <Icon name="arrow" size={14} />
          </Link>
        </div>
      </aside>

      <div className="lg:pl-[248px]">
        <header className="sticky top-0 z-20 border-b border-white/[0.07] bg-ink/95 px-4 py-3 backdrop-blur sm:px-7 lg:px-9">
          <div className="flex min-h-10 items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                className="icon-button lg:hidden"
                type="button"
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <Icon name={menuOpen ? "close" : "menu"} />
              </button>
              <span className="lg:hidden"><Brand /></span>
              <div className="hidden text-sm text-muted sm:block">Your learning workspace</div>
            </div>
            <div className="flex items-center gap-3">
              <GlobalSearch />
              <Link
                href="/features?tab=public-profile"
                className="group flex items-center gap-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-accent/40"
                title="View profile"
                aria-label="Profile settings"
              >
                <span className="sample-label hidden sm:inline-flex cursor-pointer transition-colors group-hover:border-accent/40 group-hover:text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />Learning workspace
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#1a2940] text-xs font-semibold text-slate-200 transition-all group-hover:border-accent/60 group-hover:bg-[#233550] group-hover:text-white group-hover:shadow-md group-hover:shadow-accent/20">
                  NC
                </div>
              </Link>
            </div>
          </div>
        </header>

        {menuOpen && (
          <div className="fixed inset-0 top-[65px] z-20 overflow-y-auto bg-ink/95 px-4 pb-6 lg:hidden">
            <nav aria-label="Mobile navigation" className="mx-auto max-w-xl pt-3">{navLinks}</nav>
          </div>
        )}

        <main className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-7 sm:py-10 lg:px-10">{children}</main>
        <footer className="border-t border-white/[0.06] px-4 py-5 text-center text-xs text-slate-500 sm:px-7 lg:px-10">
          NexusCraft · Your learning progress stays in this browser
        </footer>
      </div>
    </div>
  );
}
