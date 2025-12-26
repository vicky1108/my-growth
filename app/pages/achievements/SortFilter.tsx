import styles from "./page.module.scss";
import { SortOrder } from "./useAchievements";

interface SortFilterProps {
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
}

export const SortFilter = ({ sortOrder, onSortChange }: SortFilterProps) => {
  return (
    <div className={styles.sortFilter}>
      <label>
        <span>🔀</span>
        <span>Sort by:</span>
      </label>
      <select
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value as SortOrder)}
      >
        <option value="newest">Newest First ⭐</option>
        <option value="oldest">Oldest First 📅</option>
        <option value="title">Title (A-Z) 🔤</option>
      </select>
    </div>
  );
};

