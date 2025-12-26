import styles from "./page.module.scss";
import { AchievementsHeader } from "./AchievementsHeader";
import { SortFilter } from "./SortFilter";
import { EmptyState } from "./EmptyState";
import { AchievementsList } from "./AchievementsList";
import dynamic from "next/dynamic";

const AchievementsChart = dynamic(
  () => import("@/app/components/AchievementsChart"),
  {
    ssr: false,
    loading: () => (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Loading chart...
      </div>
    ),
  }
);

interface AchievementsContentProps {
  userName: string;
  dateOfBirth: string | null | undefined;
  achievements: Array<{
    id: string;
    title: string;
    date: string;
    createdAt: string;
  }>;
  filteredAchievements: Array<{
    id: string;
    title: string;
    date: string;
    createdAt: string;
  }>;
  sortOrder: "newest" | "oldest" | "title";
  isMobile: boolean;
  onAddClick: () => void;
  onSortChange: (order: "newest" | "oldest" | "title") => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const AchievementsContent = ({
  userName,
  dateOfBirth,
  achievements,
  filteredAchievements,
  sortOrder,
  isMobile,
  onAddClick,
  onSortChange,
  onEdit,
  onDelete,
}: AchievementsContentProps) => {
  return (
    <div className={styles.header}>
      <AchievementsHeader userName={userName} onAddClick={onAddClick} />

      {achievements.length > 0 && (
        <SortFilter sortOrder={sortOrder} onSortChange={onSortChange} />
      )}

      {achievements.length > 0 && !isMobile && (
        <div className={styles.chartWrapper} key="chart-wrapper">
          <AchievementsChart
            key={`chart-${achievements.length}`}
            achievements={achievements}
            dateOfBirth={dateOfBirth}
          />
        </div>
      )}

      {filteredAchievements.length === 0 ? (
        <EmptyState />
      ) : (
        <AchievementsList
          achievements={filteredAchievements}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

