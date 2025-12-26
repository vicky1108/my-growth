import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  INavigationService,
} from "@/lib/services/navigation.service";
import {
  IViewportService,
} from "@/lib/services/viewport.service";
import { getServiceFactory } from "@/lib/services/service.factory";
import { useAuth, useLogout } from "@/app/hooks";

export interface UseHeaderHandlersReturn {
  isMenuOpen: boolean;
  user: ReturnType<typeof useAuth>["user"];
  isMobile: boolean;
  showMobileMenu: boolean;

  handleLogout: () => Promise<void>;
  handleLoginClick: () => void;
  toggleMenu: () => void;
  closeMenu: () => void;
}

export function useHeaderHandlers(): UseHeaderHandlersReturn {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { user } = useAuth();
  const { handleLogout: baseHandleLogout } = useLogout();

  const serviceFactory = getServiceFactory();
  const navigationService: INavigationService = useMemo(
    () => serviceFactory.createNavigationService(router, pathname),
    [serviceFactory, router, pathname]
  );
  const viewportService: IViewportService = useMemo(
    () => serviceFactory.createViewportService(),
    [serviceFactory]
  );

  const handleLogout = useCallback(async () => {
    setIsMenuOpen(false);
    await baseHandleLogout();
  }, [baseHandleLogout]);

  const handleLoginClick = useCallback(() => {
    navigationService.navigateTo("/pages/login");
    setIsMenuOpen(false);
  }, [navigationService]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMenuOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const updateMobileState = () => {
      setIsMobile(viewportService.isMobile());
    };

    updateMobileState();
    const cleanup = viewportService.onResize(updateMobileState);

    return cleanup;
  }, [viewportService]);

  const showMobileMenu = useMemo(() => isMobile && !!user, [isMobile, user]);

  return {
    isMenuOpen,
    user,
    isMobile,
    showMobileMenu,

    handleLogout,
    handleLoginClick,
    toggleMenu,
    closeMenu,
  };
}

