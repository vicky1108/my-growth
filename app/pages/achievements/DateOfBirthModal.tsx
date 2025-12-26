import styles from "./page.module.scss";

interface DateOfBirthModalProps {
  isOpen: boolean;
  dateOfBirth: string;
  saving: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onDateChange: (date: string) => void;
}

export const DateOfBirthModal = ({
  isOpen,
  dateOfBirth,
  saving,
  onSubmit,
  onDateChange,
}: DateOfBirthModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modal} ${styles.blue}`}>
        <div className={styles.modalHeader}>
          <div className={styles.icon}>🎂</div>
          <h2>SET YOUR BIRTH DATE</h2>
          <p className={styles.subtitle}>
            Please set your date of birth to view achievements chart from birth to now.
          </p>
        </div>
        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="dateOfBirth">
              <span>📅</span>
              <span>Date of Birth</span>
            </label>
            <input
              type="date"
              id="dateOfBirth"
              required
              value={dateOfBirth}
              onChange={(e) => onDateChange(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="blue"
            />
          </div>
          <button
            type="submit"
            disabled={saving || !dateOfBirth}
            className={`${styles.formButton} ${styles.blue}`}
          >
            {saving ? "Saving... ⏳" : "Save 💾"}
          </button>
        </form>
      </div>
    </div>
  );
};

