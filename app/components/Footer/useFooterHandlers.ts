import { useMemo } from "react";
import { useAuth } from "@/app/hooks";

export interface UseFooterHandlersReturn {
  currentYear: number;
  user: ReturnType<typeof useAuth>["user"];
}

export function useFooterHandlers(): UseFooterHandlersReturn {
  const { user } = useAuth();
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return {
    currentYear,
    user,
  };
}

