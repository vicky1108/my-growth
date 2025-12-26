import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


export interface INavigationService {
  navigateTo(path: string): void;
  refresh(): void;
  getCurrentPath(): string;
}


export class NextJsNavigationService implements INavigationService {
  private router: AppRouterInstance;
  private pathname: string;

  constructor(router: AppRouterInstance, pathname: string) {
    this.router = router;
    this.pathname = pathname;
  }

  navigateTo(path: string): void {
    this.router.push(path);
  }

  refresh(): void {
    this.router.refresh();
  }

  getCurrentPath(): string {
    return this.pathname;
  }
}


