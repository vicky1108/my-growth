import styles from "./page.module.scss";

export const SignupHeader = () => {
  return (
    <div className={styles.header}>
      <div className={styles.sparkles}>
        <span className={styles.sparkle}>✨</span>
        <span className={styles.sparkle}>✨</span>
      </div>
      <h1 className={styles.title}>Create Account</h1>
      <p className={styles.subtitle}>
        Join us to start celebrating achievements!
      </p>
    </div>
  );
};

