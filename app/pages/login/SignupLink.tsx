import Link from "next/link";
import styles from "./page.module.scss";

export const SignupLink = () => {
  return (
    <p className={styles.signupLink}>
      Don&apos;t have an account?{" "}
      <Link href="/pages/signup">Create Account</Link>
    </p>
  );
};

