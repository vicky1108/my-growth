import styles from "./page.module.scss";
import { Greeting } from "./Greeting";
import { AddButton } from "./AddButton";

interface AchievementsHeaderProps {
  userName: string;
  onAddClick: () => void;
}

export const AchievementsHeader = ({
  userName,
  onAddClick,
}: AchievementsHeaderProps) => {
  return (
    <div className={styles.headerTop}>
      <div className={styles.headerContent}>
        <h1>ACHIEVEMENTS</h1>
        <Greeting userName={userName} />
      </div>
      <AddButton onClick={onAddClick} />
    </div>
  );
};

