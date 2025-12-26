import Link from "next/link";
import styles from "./page.module.scss";

export const LoginLink = () => {
  return (
    <p className={styles.loginLink}>
      Already have an account?{" "}
      <Link href="/pages/login">Log in</Link>
    </p>
  );
};

