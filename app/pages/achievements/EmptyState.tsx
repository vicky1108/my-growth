import styles from "./page.module.scss";

export const EmptyState = () => {
  return (
    <div className={styles.emptyState}>
      <div className={styles.icon}>🎯</div>
      <p className={styles.title}>No achievements yet!</p>
      <p className={styles.description}>Click &quot;Add Achievement&quot; to get started! ✨</p>
    </div>
  );
};

