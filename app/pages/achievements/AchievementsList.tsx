import styles from "./page.module.scss";
import { Achievement } from "./useAchievements";
import { AchievementCard } from "./AchievementCard";

interface AchievementsListProps {
  achievements: Achievement[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const AchievementsList = ({
  achievements,
  onEdit,
  onDelete,
}: AchievementsListProps) => {
  return (
    <div className={styles.achievementsList}>
      {achievements.map((achievement) => (
        <AchievementCard
          key={achievement.id}
          achievement={achievement}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

