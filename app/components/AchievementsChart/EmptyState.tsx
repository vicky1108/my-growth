import styles from "./AchievementsChart.module.scss";

export const EmptyState = () => {
  return (
    <div className={styles.emptyState}>
      <p>No data available for chart. Add some achievements first!</p>
    </div>
  );
};


