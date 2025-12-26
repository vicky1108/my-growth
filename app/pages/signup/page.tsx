"use client";

import styles from "./page.module.scss";
import { useSignup } from "./useSignup";
import { SignupHeader } from "./SignupHeader";
import { SignupForm } from "./SignupForm";
import { LoginLink } from "./LoginLink";

export default function Signup() {
  const {
    formData,
    error,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useSignup();

  return (
    <div className={styles.signup}>
      <div className={styles.card}>
        <SignupHeader />
        <SignupForm
          formData={formData}
          error={error}
          isLoading={isLoading}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
        <LoginLink />
      </div>
    </div>
  );
}
