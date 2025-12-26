import styles from "./page.module.scss";
import { AchievementFormData } from "./useAchievements";

interface AchievementModalProps {
  isOpen: boolean;
  isEditing: boolean;
  formData: AchievementFormData;
  submitting: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onInputChange: (field: keyof AchievementFormData, value: string) => void;
}

export const AchievementModal = ({
  isOpen,
  isEditing,
  formData,
  submitting,
  onClose,
  onSubmit,
  onInputChange,
}: AchievementModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.icon}>{isEditing ? "✏️" : "➕"}</div>
          <h2>{isEditing ? "MODIFY" : "ADD"} ACHIEVEMENT</h2>
        </div>
        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">
              <span>📝</span>
              <span>Title</span>
            </label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e) => onInputChange("title", e.target.value)}
              placeholder="Enter achievement title"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="date">
              <span>📅</span>
              <span>Date</span>
            </label>
            <input
              type="date"
              id="date"
              required
              value={formData.date}
              onChange={(e) => onInputChange("date", e.target.value)}
            />
          </div>
          <div className={styles.formActions}>
            <button
              type="button"
              onClick={onClose}
              className={`${styles.formButton} ${styles.cancel}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`${styles.formButton} ${styles.submit}`}
            >
              {submitting ? "Saving... ⏳" : isEditing ? "Update ✏️" : "Save 💾"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

