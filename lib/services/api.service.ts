
export interface IApiService {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data?: unknown): Promise<T>;
  put<T>(url: string, data?: unknown): Promise<T>;
  delete<T>(url: string): Promise<T>;
}


export class FetchApiService implements IApiService {
  private baseUrl: string;

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
  }

  async get<T>(url: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", 
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Request failed" }));
      const apiError = new Error(error.error || `HTTP error! status: ${response.status}`);
      (apiError as Error & { status?: number }).status = response.status;
      throw apiError;
    }

    return response.json();
  }

  async post<T>(url: string, data?: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Request failed" }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async put<T>(url: string, data?: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Request failed" }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async delete<T>(url: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Request failed" }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}


