import styles from "../../page.module.scss";

export const WelcomeSection = () => {
  return (
    <section className={styles.welcomeSection}>
      <div className={styles.welcomeContent}>
        <div className={styles.welcomeHeading}>
          <span className={styles.star}>⭐</span>
          <h1>Welcome to My growth!</h1>
          <span className={styles.star}>⭐</span>
        </div>
        <p className={styles.tagline}>
          Celebrate every milestone, big or small!
        </p>
      </div>
    </section>
  );
};

