import styles from "./page.module.scss";

export const MissionCard = () => {
  return (
    <div className={styles.card}>
      <h2 className={`${styles.cardTitle} ${styles.purple}`}>Our Mission</h2>
      <p className={styles.cardContent}>
        Kids Achievements is dedicated to helping parents celebrate and document their children&apos;s milestones, accomplishments, and special moments. We believe every achievement, no matter how small, deserves to be recognized and celebrated!
      </p>
    </div>
  );
};

