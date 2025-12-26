"use client";

import { useAuthButtons } from "./useAuthButtons";
import { UserActions } from "./UserActions";
import { AuthLinks } from "./AuthLinks";

export default function AuthButtons() {
  const { user, isLoading, handleLogout } = useAuthButtons();

  if (isLoading) {
    return null;
  }

  if (user) {
    return <UserActions userName={user.name} onLogout={handleLogout} />;
  }

  return <AuthLinks />;
}

