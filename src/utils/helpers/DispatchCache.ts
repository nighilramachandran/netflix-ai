import { FetchAndCacheImage } from "./FetchAndCacheImage";

const isImageCached = (id: number, cacheMap: Map<number, string>): boolean => {
  return cacheMap.has(id);
};

export const DipatchCache = async <T>(
  data: T[] = [],
  idKey: keyof T,
  imagePathKey: keyof T,
  cacheMap: Map<number, string>
): Promise<void> => {
  if (data.length > 0) {
    await Promise.all(
      data.map(async (item) => {
        const id = item[idKey] as unknown as number;
        const imagePath = item[imagePathKey] as unknown as string;

        if (!isImageCached(id, cacheMap) && imagePath) {
          try {
            await FetchAndCacheImage(id, imagePath, cacheMap);
          } catch (error) {
            console.error(`Failed to cache image for item ID ${id}:`, error);
          }
        }
      })
    );
  }
};
