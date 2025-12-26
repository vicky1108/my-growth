
import { IApiService } from "./api.service";

export interface Achievement {
  id: string;
  title: string;
  date: string;
  createdAt: string;
}

export interface AchievementsApiResponse {
  success: boolean;
  data?: Achievement[];
  error?: string;
}

export interface AchievementApiResponse {
  success: boolean;
  data?: Achievement;
  error?: string;
}

export interface IAchievementsApiService {
  getAll(): Promise<Achievement[]>;
  getById(id: string): Promise<Achievement>;
  create(title: string, date: string): Promise<Achievement>;
  update(id: string, title: string, date: string): Promise<Achievement>;
  delete(id: string): Promise<void>;
}

export class AchievementsApiService implements IAchievementsApiService {
  constructor(private apiService: IApiService) {}

  async getAll(): Promise<Achievement[]> {
    const response = await this.apiService.get<AchievementsApiResponse>("/api/achievements");
    if (!response.success || !response.data) {
      throw new Error(response.error || "Failed to fetch achievements");
    }
    return response.data;
  }

  async getById(id: string): Promise<Achievement> {
    const response = await this.apiService.get<AchievementApiResponse>(`/api/achievements/${id}`);
    if (!response.success || !response.data) {
      throw new Error(response.error || "Failed to fetch achievement");
    }
    return response.data;
  }

  async create(title: string, date: string): Promise<Achievement> {
    const response = await this.apiService.post<AchievementApiResponse>("/api/achievements", {
      title,
      date,
    });
    if (!response.success || !response.data) {
      throw new Error(response.error || "Failed to create achievement");
    }
    return response.data;
  }

  async update(id: string, title: string, date: string): Promise<Achievement> {
    const response = await this.apiService.put<AchievementApiResponse>(`/api/achievements/${id}`, {
      title,
      date,
    });
    if (!response.success || !response.data) {
      throw new Error(response.error || "Failed to update achievement");
    }
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await this.apiService.delete(`/api/achievements/${id}`);
  }
}


