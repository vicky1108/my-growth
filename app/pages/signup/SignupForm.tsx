import styles from "./page.module.scss";
import { ErrorMessage, FormInput, SubmitButton } from "@/app/components/Forms";
import { SignupFormData } from "./useSignup";

interface SignupFormProps {
  formData: SignupFormData;
  error: string;
  isLoading: boolean;
  onInputChange: (field: keyof SignupFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

export const SignupForm = ({
  formData,
  error,
  isLoading,
  onInputChange,
  onSubmit,
}: SignupFormProps) => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      {error && <ErrorMessage message={error} />}

      <FormInput
        id="name"
        label="Full Name"
        type="text"
        value={formData.name}
        onChange={(value) => onInputChange("name", value)}
        placeholder="Your full name"
        required
      />

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

      <FormInput
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        value={formData.confirmPassword}
        onChange={(value) => onInputChange("confirmPassword", value)}
        placeholder="••••••••"
        required
      />

      <SubmitButton isLoading={isLoading} loadingText="Creating Account...">
        <span>Create Account</span>
        <span>🎉</span>
      </SubmitButton>
    </form>
  );
};

