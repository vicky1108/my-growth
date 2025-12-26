import { useAuthButton } from "./useAuthButton";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";

interface AuthButtonProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
  variant?: "desktop" | "mobile" | "mobile-inline";
  showText?: boolean;
}

export const AuthButton = ({
  isLoggedIn,
  onLogin,
  onLogout,
  variant = "desktop",
  showText = false,
}: AuthButtonProps) => {
  const { buttonClass } = useAuthButton({ isLoggedIn, variant });

  if (isLoggedIn) {
    return (
      <LogoutButton
        onClick={onLogout}
        className={buttonClass}
        showText={showText}
      />
    );
  }

  return <LoginButton onClick={onLogin} className={buttonClass} />;
};

