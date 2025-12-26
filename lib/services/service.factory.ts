


import { IApiService, FetchApiService } from "./api.service";
import { IAuthService, AuthService } from "./auth.service";
import { IAuthApiService, AuthApiService } from "./auth-api.service";
import { IAchievementsApiService, AchievementsApiService } from "./achievements-api.service";
import { IEventService, BrowserEventService } from "./event.service";
import { INavigationService, NextJsNavigationService } from "./navigation.service";
import { IViewportService, BrowserViewportService } from "./viewport.service";
import { isMobile as checkIsMobile } from "@/lib/utils";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface ServiceFactory {
  createApiService(): IApiService;
  createAuthService(): IAuthService;
  createAuthApiService(): IAuthApiService;
  createAchievementsApiService(): IAchievementsApiService;
  createEventService(): IEventService;
  createNavigationService(router: AppRouterInstance, pathname: string): INavigationService;
  createViewportService(): IViewportService;
}


export class DefaultServiceFactory implements ServiceFactory {
  createApiService(): IApiService {
    return new FetchApiService();
  }

  createAuthApiService(): IAuthApiService {
    return new AuthApiService(this.createApiService());
  }

  createAuthService(): IAuthService {
    return new AuthService(this.createAuthApiService());
  }

  createAchievementsApiService(): IAchievementsApiService {
    return new AchievementsApiService(this.createApiService());
  }

  createEventService(): IEventService {
    return new BrowserEventService();
  }

  createNavigationService(router: AppRouterInstance, pathname: string): INavigationService {
    return new NextJsNavigationService(router, pathname);
  }

  createViewportService(): IViewportService {
    return new BrowserViewportService(checkIsMobile);
  }
}


let serviceFactoryInstance: ServiceFactory | null = null;

export function getServiceFactory(): ServiceFactory {
  if (!serviceFactoryInstance) {
    serviceFactoryInstance = new DefaultServiceFactory();
  }
  return serviceFactoryInstance;
}


export function setServiceFactory(factory: ServiceFactory): void {
  serviceFactoryInstance = factory;
}

