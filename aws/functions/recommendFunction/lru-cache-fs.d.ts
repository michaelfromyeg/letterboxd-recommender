declare module "lru-cache-fs" {
  interface LRUCacheFsOptions<K, V> extends Record<K, V> {
    max: number;
    ttl: number;
    cacheName: string;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  class LRUCacheFs<K = any, V = any> extends Record<K, V> {
    constructor(options: LRUCacheFsOptions<K, V>);
    get(key: K): V | undefined;
    set(key: K, value: V): void;
  }

  export = LRUCacheFs;
}
