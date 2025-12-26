"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>⚠️</div>
          <h1 style={{ marginBottom: "1rem", color: "var(--red)" }}>
            Something went wrong!
          </h1>
          <p style={{ marginBottom: "2rem", color: "var(--gray-medium)", maxWidth: "500px" }}>
            {error.message || "An unexpected error occurred. Please try again."}
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
              fontSize: "1rem",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}

