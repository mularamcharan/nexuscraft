"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="surface mx-auto my-12 max-w-xl p-8 text-center">
      <p className="eyebrow">Workspace error</p>
      <h1 className="mt-2 text-2xl font-semibold text-white">This page could not load.</h1>
      <p className="mt-3 text-sm leading-6 text-muted">Your browser-saved learning progress is unchanged. Try loading this page again.</p>
      <button type="button" onClick={() => retry()} className="button-primary mt-6">Try again</button>
    </main>
  );
}