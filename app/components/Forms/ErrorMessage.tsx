import styles from "./Forms.module.scss";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <div className={styles.errorMessage}>
      <span>⚠️</span>
      <span>{message}</span>
    </div>
  );
};


