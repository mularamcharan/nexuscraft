"use client";

import { useEffect, useState } from "react";
import { QuizSection } from "@/src/components/QuizSection";
import { DemoWorkspace } from "@/components/demo-workspace";

type LearningSection = "path" | "quizzes";

function isQuizScores(value: unknown): value is Record<string, number> {
  return typeof value === "object"
    && value !== null
    && Object.values(value).every((score) =>
      typeof score === "number" && Number.isFinite(score) && score >= 0 && score <= 100
    );
}

export function LearningPathsWorkspace({ initialSection = "path" }: { initialSection?: LearningSection }) {
  const [activeSection, setActiveSection] = useState<LearningSection>(initialSection);
  const [completedQuizzes, setCompletedQuizzes] = useState<Record<string, number>>({});
  const [storageError, setStorageError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedScores = localStorage.getItem("nexus_learning_path_quiz_scores");
      if (!savedScores) return;
      const parsed: unknown = JSON.parse(savedScores);
      if (!isQuizScores(parsed)) {
        setStorageError("Saved quiz progress is invalid. Complete a quiz to replace it.");
        return;
      }
      setCompletedQuizzes(parsed);
    } catch (error) {
      setStorageError(error instanceof Error ? error.message : "Quiz progress could not be loaded.");
    }
  }, []);

  function completeQuiz(quizId: string, score: number) {
    const updatedScores = { ...completedQuizzes, [quizId]: score };
    setCompletedQuizzes(updatedScores);
    try {
      localStorage.setItem("nexus_learning_path_quiz_scores", JSON.stringify(updatedScores));
      setStorageError(null);
    } catch (error) {
      setStorageError(error instanceof Error ? error.message : "Quiz progress could not be saved.");
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Learn and practice</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Learning paths</h1>
          <p className="mt-2 text-sm text-muted">Follow a guided path, then check what you have learned with a quiz.</p>
        </div>
        <div className="flex rounded-xl border border-white/10 bg-white/[0.03] p-1" role="tablist" aria-label="Learning sections">
          <button
            id="learning-path-tab"
            type="button"
            role="tab"
            aria-selected={activeSection === "path"}
            aria-controls="learning-path-panel"
            onClick={() => setActiveSection("path")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${activeSection === "path" ? "bg-accent text-ink" : "text-muted hover:text-white"}`}
          >
            Learning path
          </button>
          <button
            id="learning-quizzes-tab"
            type="button"
            role="tab"
            aria-selected={activeSection === "quizzes"}
            aria-controls="learning-quizzes-panel"
            onClick={() => setActiveSection("quizzes")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${activeSection === "quizzes" ? "bg-accent text-ink" : "text-muted hover:text-white"}`}
          >
            Quizzes
          </button>
        </div>
      </div>

      {storageError && (
        <p role="alert" className="mb-5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-200">
          {storageError}
        </p>
      )}

      {activeSection === "path" ? (
        <section id="learning-path-panel" role="tabpanel" aria-labelledby="learning-path-tab">
          <DemoWorkspace view="paths" />
        </section>
      ) : (
        <section id="learning-quizzes-panel" role="tabpanel" aria-labelledby="learning-quizzes-tab">
          <QuizSection
            completedQuizzes={completedQuizzes}
            onCompleteQuiz={(quizId, score) => completeQuiz(quizId, score)}
          />
        </section>
      )}
    </main>
  );
}
