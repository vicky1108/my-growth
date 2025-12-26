import Link from "next/link";
import styles from "./AuthButtons.module.scss";

export const SignupLink = () => {
  return (
    <Link href="/pages/signup" className={styles.signupLink}>
      SIGN UP
    </Link>
  );
};

