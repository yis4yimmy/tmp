import LRUCache from "lru-cache";

const createCache = () => {
  const newCache = new LRUCache<string, any>({ max: 100 });

  return newCache;
};

declare global {
  var cache: LRUCache<string, any> | undefined;
}

(() => {
  if (global.cache) {
    return global.cache;
  }

  const newCache = createCache();

  global.cache = newCache;

  return global.cache;
})();

export const getCachedContent = async <Value>(
  key: string,
  fetchFuntion: () => Promise<Value>
): Promise<Value | undefined> => {
  try {
    const item = global.cache?.get(key);

    if (item) {
      console.info("Found in cache:", key);
      return item;
    } else {
      throw new Error("NOT_IN_CACHE");
    }
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_IN_CACHE") {
      const fetchedItem = await fetchFuntion();

      if (fetchedItem) {
        global.cache?.set(key, fetchedItem);

        return fetchedItem;
      }
    }

    console.error(error);

    return undefined;
  }
};

export const checkCache = (key: string) => !!global.cache?.has(key);

export const getAllKeys = () => {
  const allKeys = global.cache?.keys();

  if (allKeys) {
    return [...allKeys];
  }

  return [];
};

export const dropItLikeItsHot = (key: string) => {
  const result = global.cache?.delete(key);

  return result;
};
