import styles from "./AuthButtons.module.scss";
import { LoginLink } from "./LoginLink";
import { SignupLink } from "./SignupLink";

export const AuthLinks = () => {
  return (
    <div className={styles.authLinks}>
      <LoginLink />
      <SignupLink />
    </div>
  );
};


