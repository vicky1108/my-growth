import styles from "./page.module.scss";

export default function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingIcon}>⏳</div>
      <p>Loading your achievements...</p>
    </div>
  );
}

