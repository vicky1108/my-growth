import { useState, useEffect } from "react";
import { isMobile as checkIsMobile } from "@/lib/utils";


export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() => checkIsMobile());

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
}

