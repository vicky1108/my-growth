"use client";

import styles from "./page.module.scss";
import { useLogin } from "./useLogin";
import { LoginHeader } from "./LoginHeader";
import { LoginForm } from "./LoginForm";
import { SignupLink } from "./SignupLink";

export default function Login() {
  const {
    formData,
    error,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useLogin();

  return (
    <div className={styles.login}>
      <div className={styles.card}>
        <LoginHeader />
        <LoginForm
          formData={formData}
          error={error}
          isLoading={isLoading}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
        <SignupLink />
      </div>
    </div>
  );
}
