import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { getServiceFactory } from "@/lib/services/service.factory";
import { IAuthService } from "@/lib/services/auth.service";
import { IEventService } from "@/lib/services/event.service";
import { INavigationService } from "@/lib/services/navigation.service";

export interface UseLogoutReturn {
  handleLogout: () => Promise<void>;
}

export function useLogout(): UseLogoutReturn {
  const router = useRouter();

  const serviceFactory = getServiceFactory();
  const authService: IAuthService = serviceFactory.createAuthService();
  const eventService: IEventService = serviceFactory.createEventService();
  const navigationService: INavigationService = serviceFactory.createNavigationService(router, "");

  const handleLogout = useCallback(async () => {
    try {
      await authService.logout();
      eventService.dispatchEvent("auth-state-changed");
      navigationService.navigateTo("/");
      navigationService.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [authService, eventService, navigationService]);

  return {
    handleLogout,
  };
}

