import styles from "./AuthButtons.module.scss";
import { UserInfo } from "./UserInfo";
import { LogoutButton } from "./LogoutButton";

interface UserActionsProps {
  userName: string;
  onLogout: () => void;
}

export const UserActions = ({ userName, onLogout }: UserActionsProps) => {
  return (
    <div className={styles.container}>
      <UserInfo userName={userName} />
      <LogoutButton onClick={onLogout} />
    </div>
  );
};


