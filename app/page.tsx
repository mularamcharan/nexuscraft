import Link from "next/link";
import { Icon } from "@/components/icon";

const steps = [
  { number: "01", title: "Learn", description: "Get the core idea with focused, approachable lessons." },
  { number: "02", title: "Practice", description: "Try a short challenge that makes the concept stick." },
  { number: "03", title: "Build", description: "Put your new skill to work on something real." },
  { number: "04", title: "Improve", description: "Reflect, revise, and learn from what you create." },
  { number: "05", title: "Prove", description: "Collect practical work that shows what you can do." }
];

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden bg-ink text-slate-100">
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="NexusCraft home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-ink"><Icon name="sparkle" size={21} /></span>
          <span className="font-semibold tracking-tight text-white">NexusCraft</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 text-sm text-slate-400 md:flex">
          <Link href="/learning-paths" className="hover:text-white">Learning paths</Link>
          <Link href="/challenges" className="hover:text-white">Challenges</Link>
          <Link href="/projects" className="hover:text-white">Projects</Link>
          <Link href="/portfolio" className="hover:text-white">Portfolio</Link>
          <Link href="/features?tab=prompt-mastery" className="hover:text-white">Prompt mastery</Link>
          <Link href="/features?tab=learner-space" className="hover:text-white">Community</Link>
        </nav>
        <div className="flex items-center gap-2">
          <details className="relative md:hidden">
            <summary aria-label="Open site navigation" className="icon-button list-none cursor-pointer [&::-webkit-details-marker]:hidden">
              <Icon name="menu" />
            </summary>
            <nav aria-label="Mobile site navigation" className="absolute right-0 top-12 z-20 flex w-56 flex-col rounded-xl border border-white/10 bg-[#111b2d] p-2 shadow-xl">
              {[
                ["Dashboard", "/dashboard"],
                ["Learning paths", "/learning-paths"],
                ["Challenges", "/challenges"],
                ["Projects", "/projects"],
                ["Portfolio", "/portfolio"],
                ["Prompt mastery", "/features?tab=prompt-mastery"],
                ["Community", "/features?tab=learner-space"],
                ["Productivity hub", "/features?tab=productivity-hub"],
                ["Settings", "/features?tab=settings"]
              ].map(([label, href]) => <Link key={href} href={href} className="rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/[0.05] hover:text-white">{label}</Link>)}
            </nav>
          </details>
          <Link href="/dashboard" className="button-secondary min-h-9 px-3 text-xs sm:px-4 sm:text-sm">
            Open workspace <Icon name="arrow" size={16} />
          </Link>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-28 lg:pt-24">
          <div>
            <span className="sample-label"><span className="h-1.5 w-1.5 rounded-full bg-accent" />A practical way to learn AI</span>
            <h1 className="mt-7 max-w-2xl text-4xl font-semibold leading-[1.12] tracking-[-0.045em] text-white sm:text-6xl">
              Learn AI by <span className="text-accent">making</span> things that matter.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
              Move beyond the theory. Build real skills through focused lessons, hands-on challenges, and projects you can be proud of.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dashboard" className="button-primary">Start learning <Icon name="arrow" size={17} /></Link>
              <Link href="/learning-paths" className="button-secondary">Browse learning paths</Link>
            </div>
            <p className="mt-4 text-xs text-slate-500">Open the workspace · Progress saved in this browser</p>
          </div>

          <div className="relative mx-auto w-full max-w-[500px]">
            <div className="absolute -inset-8 rounded-full bg-blue-500/[0.06] blur-3xl" aria-hidden="true" />
            <div className="surface relative p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted">YOUR LEARNING LOOP</p>
                  <p className="mt-1 font-medium text-white">From curious to capable</p>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent"><Icon name="sparkle" /></span>
              </div>
              <div className="mt-6 space-y-3">
                {steps.map((step, index) => (
                  <div key={step.number} className={`flex items-center gap-4 rounded-xl border p-4 ${index === 0 ? "border-accent/25 bg-accent/[0.06]" : "border-white/[0.06] bg-white/[0.015]"}`}>
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${index === 0 ? "bg-accent text-ink" : "bg-white/[0.05] text-slate-400"}`}>{step.number}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white">{step.title}</p>
                      <p className="mt-1 text-xs leading-5 text-muted">{step.description}</p>
                    </div>
                    {index < steps.length - 1 && <Icon name="arrow" size={16} className="hidden text-slate-600 sm:block" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/[0.06] bg-[#0d1626]">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="eyebrow">Ready when you are</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Start with a skill. Finish with something real.</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">Start learning workspace to see how your learning journey can take shape.</p>
            </div>
            <Link href="/learning-paths" className="button-primary w-fit">Explore learning paths <Icon name="arrow" size={17} /></Link>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/[0.06] px-5 py-5 text-center text-xs text-slate-500">NexusCraft · Experiential learning for an AI-powered world</footer>
    </div>
  );
}
