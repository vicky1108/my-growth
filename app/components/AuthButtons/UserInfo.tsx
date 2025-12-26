import styles from "./AuthButtons.module.scss";

interface UserInfoProps {
  userName: string;
}

export const UserInfo = ({ userName }: UserInfoProps) => {
  return <span className={styles.userName}>{userName}</span>;
};


