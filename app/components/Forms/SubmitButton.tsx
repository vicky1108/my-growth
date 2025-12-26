import styles from "./Forms.module.scss";

interface SubmitButtonProps {
  isLoading: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export const SubmitButton = ({
  isLoading,
  loadingText,
  children,
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={styles.submitButton}
    >
      {isLoading ? loadingText || "Loading..." : children}
    </button>
  );
};


