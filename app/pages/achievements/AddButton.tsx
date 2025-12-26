import styles from "./page.module.scss";

interface AddButtonProps {
  onClick: () => void;
}

export const AddButton = ({ onClick }: AddButtonProps) => {
  return (
    <button onClick={onClick} className={styles.addButton}>
      <span>➕</span>
      <span>Add Achievement</span>
    </button>
  );
};

