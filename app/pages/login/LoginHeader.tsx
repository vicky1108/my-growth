import styles from "./page.module.scss";

export const LoginHeader = () => {
  return (
    <div className={styles.header}>
      <div className={styles.sparkles}>
        <span className={styles.sparkle}>✨</span>
        <span className={styles.sparkle}>✨</span>
      </div>
      <h1 className={styles.title}>Login</h1>
      <p className={styles.subtitle}>
        Welcome back! Sign in to continue tracking achievements.
      </p>
    </div>
  );
};

