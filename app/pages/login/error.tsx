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
    console.error("Login page error:", error);
  }, [error]);

  return (
    <div className={styles.login}>
      <div className={styles.card}>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚠️</div>
          <h2 style={{ marginBottom: "1rem", color: "var(--red)" }}>
            Something went wrong!
          </h2>
          <p style={{ marginBottom: "1.5rem", color: "var(--gray-medium)" }}>
            {error.message || "An error occurred. Please try again."}
          </p>
          <button
            onClick={reset}
            style={{
              padding: "0.75rem 1.5rem",
              background: "var(--purple)",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

