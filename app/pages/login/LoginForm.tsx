import styles from "./page.module.scss";
import { ErrorMessage, FormInput, SubmitButton } from "@/app/components/Forms";
import { LoginFormData } from "./useLogin";

interface LoginFormProps {
  formData: LoginFormData;
  error: string;
  isLoading: boolean;
  onInputChange: (field: keyof LoginFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

export const LoginForm = ({
  formData,
  error,
  isLoading,
  onInputChange,
  onSubmit,
}: LoginFormProps) => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      {error && <ErrorMessage message={error} />}

      <FormInput
        id="email"
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={(value) => onInputChange("email", value)}
        placeholder="parent@example.com"
        required
      />

      <FormInput
        id="password"
        label="Password"
        type="password"
        value={formData.password}
        onChange={(value) => onInputChange("password", value)}
        placeholder="••••••••"
        required
      />

      <SubmitButton isLoading={isLoading} loadingText="Logging in...">
        <span>Log In</span>
        <span>💖</span>
      </SubmitButton>
    </form>
  );
};

