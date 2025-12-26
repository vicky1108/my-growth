import { useMemo } from "react";
import styles from "../Header.module.scss";

export interface UseAuthButtonProps {
  isLoggedIn: boolean;
  variant?: "desktop" | "mobile" | "mobile-inline";
}

export interface UseAuthButtonReturn {
  buttonClass: string;
}

export function useAuthButton({
  isLoggedIn,
  variant = "desktop",
}: UseAuthButtonProps): UseAuthButtonReturn {
  const buttonClass = useMemo(() => {
    if (variant === "mobile") {
      return styles.mobileLogoutButton;
    }
    if (variant === "mobile-inline") {
      return styles.mobileLoginButtonInline;
    }
    return isLoggedIn ? styles.logoutButton : styles.loginButton;
  }, [isLoggedIn, variant]);

  return {
    buttonClass,
  };
}

