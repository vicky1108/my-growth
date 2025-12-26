import styles from "./AchievementsChart.module.scss";
import { SelectedPoint as SelectedPointType } from "./useAchievementsChart";

interface SelectedPointProps {
  point: SelectedPointType;
  onClose: () => void;
}

export const SelectedPoint = ({ point, onClose }: SelectedPointProps) => {
  return (
    <div className={styles.selectedPoint}>
      <div className={styles.selectedPointContent}>
        <p className={styles.title}>{point.title}</p>
        <p className={styles.date}>
          {new Date(point.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <button onClick={onClose} className={styles.closeButton}>
        ✕
      </button>
    </div>
  );
};


