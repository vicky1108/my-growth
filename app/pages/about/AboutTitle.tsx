import styles from "./page.module.scss";

export const AboutTitle = () => {
  return (
    <div className={styles.titleSection}>
      <h1 className={styles.title}>
        About Kids Achievements
        <span className={styles.rainbow}>🌈</span>
      </h1>
    </div>
  );
};

