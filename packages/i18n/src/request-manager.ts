/**
 * 防止同时发送多个 MTS 请求的管理器
 */
class RequestManager {
  private pendingRequests: Map<string, Promise<any>> = new Map();
  private requestCache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

  /**
   * 获取或创建请求
   * @param key 请求的唯一标识
   * @param requestFn 请求函数
   * @returns Promise<any>
   */
  async getOrCreateRequest<T>(key: string, requestFn: () => Promise<T>): Promise<T> {
    // 检查缓存
    const cached = this.requestCache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    // 检查是否有正在进行的请求
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key)!;
    }

    // 创建新请求
    const requestPromise = requestFn().then((data) => {
      // 缓存结果
      this.requestCache.set(key, {
        data,
        timestamp: Date.now(),
      });
      
      // 清理 pending 请求
      this.pendingRequests.delete(key);
      
      return data;
    }).catch((error) => {
      // 清理 pending 请求
      this.pendingRequests.delete(key);
      throw error;
    });

    this.pendingRequests.set(key, requestPromise);
    return requestPromise;
  }

  /**
   * 清除缓存
   * @param key 可选的特定键，不传则清除所有缓存
   */
  clearCache(key?: string) {
    if (key) {
      this.requestCache.delete(key);
    } else {
      this.requestCache.clear();
    }
  }

  /**
   * 清除所有 pending 请求
   */
  clearPendingRequests() {
    this.pendingRequests.clear();
  }
}

export const requestManager = new RequestManager();
