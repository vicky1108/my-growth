import Link from "next/link";
import styles from "./AuthButtons.module.scss";

export const LoginLink = () => {
  return (
    <Link href="/pages/login" className={styles.loginLink}>
      LOGIN
    </Link>
  );
};

