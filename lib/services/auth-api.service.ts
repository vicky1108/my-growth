
import { IApiService } from "./api.service";
import { apiCache } from "./api-cache.service";

export interface AuthApiResponse {
  success: boolean;
  data?: {
    user: {
      id: string;
      name: string;
      email: string;
      dateOfBirth?: string | null;
    };
  };
  error?: string;
}

export interface IAuthApiService {
  login(email: string, password: string): Promise<AuthApiResponse>;
  signup(name: string, email: string, password: string): Promise<AuthApiResponse>;
  getCurrentUser(): Promise<AuthApiResponse>;
  logout(): Promise<void>;
  updateProfile(data: { dateOfBirth?: string }): Promise<AuthApiResponse>;
  invalidateUserCache(): void;
}

export class AuthApiService implements IAuthApiService {
  private readonly USER_CACHE_KEY = "/api/auth/me";
  private readonly USER_CACHE_TTL = 10000; 

  constructor(private apiService: IApiService) {}

  async login(email: string, password: string): Promise<AuthApiResponse> {
    const response = await this.apiService.post<AuthApiResponse>("/api/auth/login", { email, password });
    this.invalidateUserCache();
    return response;
  }

  async signup(name: string, email: string, password: string): Promise<AuthApiResponse> {
    const response = await this.apiService.post<AuthApiResponse>("/api/auth/signup", { name, email, password });
    this.invalidateUserCache();
    return response;
  }

  async getCurrentUser(): Promise<AuthApiResponse> {
    try {
      return await apiCache.get(
        this.USER_CACHE_KEY,
        () => this.apiService.get<AuthApiResponse>(this.USER_CACHE_KEY),
        this.USER_CACHE_TTL
      );
    } catch (error: unknown) {
      const errorStatus = (error as { status?: number })?.status;
      if (errorStatus === 401) {
        const UNAUTHORIZED_CACHE_KEY = `${this.USER_CACHE_KEY}:401`;
        const UNAUTHORIZED_CACHE_TTL = 2000; 
        try {
          return await apiCache.get(
            UNAUTHORIZED_CACHE_KEY,
            () => Promise.resolve({
              success: false,
              error: "Not authenticated",
            } as AuthApiResponse),
            UNAUTHORIZED_CACHE_TTL
          );
        } catch {
          return {
            success: false,
            error: "Not authenticated",
          } as AuthApiResponse;
        }
      }
      throw error;
    }
  }

  async logout(): Promise<void> {
    await this.apiService.post("/api/auth/logout");
    this.invalidateUserCache();
  }

  async updateProfile(data: { dateOfBirth?: string }): Promise<AuthApiResponse> {
    const response = await this.apiService.put<AuthApiResponse>("/api/auth/profile", data);
    this.invalidateUserCache();
    return response;
  }

  invalidateUserCache(): void {
    apiCache.invalidate(this.USER_CACHE_KEY);
  }
}

