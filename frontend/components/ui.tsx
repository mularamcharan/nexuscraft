import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/icon";

export function PageHeading({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function SectionHeading({ title, description, href, linkLabel = "View all" }: {
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      {href && <Link className="text-sm font-medium text-accent hover:text-white" href={href}>{linkLabel}</Link>}
    </div>
  );
}

export function ButtonLink({ href, children, secondary = false }: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link className={secondary ? "button-secondary" : "button-primary"} href={href}>
      {children}<Icon name="arrow" size={17} />
    </Link>
  );
}

export function ProgressBar({ value, label }: { value: number; label?: string }) {
  return (
    <div>
      {label && <div className="mb-2 flex justify-between text-xs text-muted"><span>{label}</span><span>{value}%</span></div>}
      <div
        aria-label={label ? `${label}: ${value}% complete` : `${value}% complete`}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={value}
        className="h-1.5 overflow-hidden rounded-full bg-slate-700/80"
        role="progressbar"
      >
        <div className="h-full rounded-full bg-accent" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function SampleLabel() {
  return <span className="sample-label"><span className="h-1.5 w-1.5 rounded-full bg-accent" />Sample preview</span>;
}
