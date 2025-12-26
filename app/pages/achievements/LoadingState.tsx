import styles from "./page.module.scss";

export const LoadingState = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingIcon}>⏳</div>
    </div>
  );
};

