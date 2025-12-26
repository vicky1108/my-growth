interface CacheEntry<T> {
  data: T;
  timestamp: number;
  promise?: Promise<T>;
}

class ApiCacheService {
  private cache: Map<string, CacheEntry<unknown>> = new Map();
  private pendingRequests: Map<string, Promise<unknown>> = new Map();
  private readonly DEFAULT_TTL = 5000; 

  async get<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl: number = this.DEFAULT_TTL,
    shouldCacheErrors: boolean = false
  ): Promise<T> {
    const now = Date.now();
    const cached = this.cache.get(key);

    if (cached && now - cached.timestamp < ttl) {
      return cached.data as T;
    }

    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key)! as Promise<T>;
    }

    const promise = fetcher()
      .then((data) => {
        this.cache.set(key, {
          data,
          timestamp: now,
        });
        this.pendingRequests.delete(key);
        return data;
      })
      .catch((error) => {
        this.pendingRequests.delete(key);
        if (shouldCacheErrors) {
          this.cache.set(key, {
            data: error,
            timestamp: now,
          });
        }
        throw error;
      });

    this.pendingRequests.set(key, promise);
    return promise;
  }

  invalidate(key: string): void {
    this.cache.delete(key);
    this.pendingRequests.delete(key);
  }

  clear(): void {
    this.cache.clear();
    this.pendingRequests.clear();
  }
}

export const apiCache = new ApiCacheService();
