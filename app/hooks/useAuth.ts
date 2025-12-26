import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { User } from "@/lib/services/auth.service";
import { getServiceFactory } from "@/lib/services/service.factory";
import { IEventService } from "@/lib/services/event.service";
import { IAuthService } from "@/lib/services/auth.service";

export interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
}


function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function useAuth(): UseAuthReturn {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const hasCheckedRef = useRef(false);

  const serviceFactory = getServiceFactory();
  const authService: IAuthService = serviceFactory.createAuthService();
  const eventService: IEventService = serviceFactory.createEventService();

  const checkAuth = useCallback(async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
      hasCheckedRef.current = true;
    }
  }, [authService]);

  const debouncedCheckAuth = useRef(
    debounce(() => {
      if (hasCheckedRef.current) {
        checkAuth();
      }
    }, 1000) 
  ).current;

  useEffect(() => {
    checkAuth();
  }, [pathname, checkAuth]);

  useEffect(() => {
    const handleAuthStateChanged = () => {
      checkAuth();
    };

    const handleFocus = () => {
      debouncedCheckAuth();
    };

    eventService.addEventListener("auth-state-changed", handleAuthStateChanged);
    eventService.addEventListener("focus", handleFocus);

    return () => {
      eventService.removeEventListener("auth-state-changed", handleAuthStateChanged);
      eventService.removeEventListener("focus", handleFocus);
    };
  }, [checkAuth, eventService, debouncedCheckAuth]);

  return {
    user,
    isLoading,
    checkAuth,
  };
}

