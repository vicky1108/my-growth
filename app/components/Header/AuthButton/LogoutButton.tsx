import styles from "../Header.module.scss";
import { LogoutIcon } from "../LogoutIcon";

interface LogoutButtonProps {
  onClick: () => void;
  className: string;
  showText?: boolean;
}

export const LogoutButton = ({
  onClick,
  className,
  showText = false,
}: LogoutButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={className}
      aria-label="Logout"
      title="Logout"
    >
      <LogoutIcon className={styles.logoutIcon} />
      {showText && <span>Logout</span>}
    </button>
  );
};


