
export function isMobile(): boolean {
  if (typeof window === 'undefined') {
    return false; 
  }
  return window.innerWidth <= 375;
}


export function getViewportWidth(): number {
  if (typeof window === 'undefined') {
    return 0;
  }
  return window.innerWidth;
}


export function useIsMobile(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.innerWidth <= 375;
}

