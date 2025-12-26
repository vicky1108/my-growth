"use client";

import { useEffect } from "react";
import styles from "./page.module.scss";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Achievements page error:", error);
  }, [error]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.emptyState}>
          <div className={styles.icon}>⚠️</div>
          <h2 className={styles.title}>Something went wrong!</h2>
          <p className={styles.description}>
            {error.message || "An unexpected error occurred while loading your achievements."}
          </p>
          <button
            onClick={reset}
            className={styles.formButton}
            style={{ marginTop: "1rem", padding: "0.75rem 1.5rem" }}
          >
            Try again
          </button>
        </div>
      </main>
    </div>
  );
}

