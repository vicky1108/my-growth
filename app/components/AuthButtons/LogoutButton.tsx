import styles from "./AuthButtons.module.scss";

interface LogoutButtonProps {
  onClick: () => void;
}

export const LogoutButton = ({ onClick }: LogoutButtonProps) => {
  return (
    <button onClick={onClick} className={styles.logoutButton}>
      LOGOUT
    </button>
  );
};


