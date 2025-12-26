import styles from "./page.module.scss";

interface GreetingProps {
  userName: string;
}

export const Greeting = ({ userName }: GreetingProps) => {
  return (
    <p className={styles.greeting}>
      <span>👋</span>
      <span>Hello, {userName}!</span>
      <span>💖</span>
    </p>
  );
};

