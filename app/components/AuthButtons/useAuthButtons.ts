import { useAuth, useLogout } from "@/app/hooks";

export interface UseAuthButtonsReturn {
  user: ReturnType<typeof useAuth>["user"];
  isLoading: ReturnType<typeof useAuth>["isLoading"];
  handleLogout: ReturnType<typeof useLogout>["handleLogout"];
}

export function useAuthButtons(): UseAuthButtonsReturn {
  const { user, isLoading } = useAuth();
  const { handleLogout } = useLogout();

  return {
    user,
    isLoading,
    handleLogout,
  };
}

