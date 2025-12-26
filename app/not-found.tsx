import Link from "next/link";

export default function NotFound() {
  return (
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
      <div style={{ fontSize: "6rem", marginBottom: "1rem" }}>🔍</div>
      <h1 style={{ marginBottom: "1rem", color: "var(--purple)" }}>
        Page Not Found
      </h1>
      <p style={{ marginBottom: "2rem", color: "var(--gray-medium)", maxWidth: "500px" }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        style={{
          padding: "0.75rem 1.5rem",
          background: "var(--purple)",
          color: "white",
          textDecoration: "none",
          borderRadius: "0.5rem",
          fontWeight: 600,
          fontSize: "1rem",
        }}
      >
        Go back home
      </Link>
    </div>
  );
}

