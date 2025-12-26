import styles from "./page.module.scss";
import { Achievement } from "./useAchievements";

interface AchievementCardProps {
  achievement: Achievement;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const AchievementCard = ({
  achievement,
  onEdit,
  onDelete,
}: AchievementCardProps) => {
  return (
    <div className={styles.achievementCard}>
      <div className={styles.achievementContent}>
        <div className={styles.icon}>🏆</div>
        <div className={styles.info}>
          <h3>{achievement.title}</h3>
          <p className={styles.date}>
            <span>📅</span>
            <span>
              {new Date(achievement.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </p>
        </div>
      </div>
      <div className={styles.achievementActions}>
        <button
          onClick={() => onEdit(achievement.id)}
          className={`${styles.actionButton} ${styles.edit}`}
        >
          ✏️ Modify
        </button>
        <button
          onClick={() => onDelete(achievement.id)}
          className={`${styles.actionButton} ${styles.delete}`}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

