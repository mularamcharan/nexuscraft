"use client";

import dynamic from "next/dynamic";
import type { ActiveTab } from "@/src/types";
import styles from "./features.module.css";

const LearningFeatures = dynamic(() => import("@/src/App"), {
  ssr: false,
  loading: () => <div className={styles.loading} role="status">Loading learning tools…</div>
});

export default function FeatureClient({ initialTab }: { initialTab: ActiveTab }) {
  return (
    <div className={styles.features}>
      <LearningFeatures embedded initialTab={initialTab} />
    </div>
  );
}
