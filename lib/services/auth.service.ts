
import { IAuthApiService } from "./auth-api.service";

export interface User {
  id: string;
  name: string;
  email: string;
  dateOfBirth?: string | null;
}

export interface IAuthService {
  getCurrentUser(): Promise<User | null>;
  logout(): Promise<void>;
}


export class AuthService implements IAuthService {
  constructor(private authApiService: IAuthApiService) {}

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await this.authApiService.getCurrentUser();
      if (response.success && response.data?.user) {
        return response.data.user;
      }
      return null;
    } catch (error) {
      console.error("Unexpected error getting current user:", error);
      return null;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.authApiService.logout();
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  }
}

