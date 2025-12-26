
export interface IViewportService {
  isMobile(): boolean;
  onResize(callback: () => void): () => void; 
}


export class BrowserViewportService implements IViewportService {
  private checkIsMobile: () => boolean;

  constructor(checkIsMobileFn: () => boolean) {
    this.checkIsMobile = checkIsMobileFn;
  }

  isMobile(): boolean {
    return this.checkIsMobile();
  }

  onResize(callback: () => void): () => void {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", callback);
      return () => {
        window.removeEventListener("resize", callback);
      };
    }
    return () => {}; 
  }
}


