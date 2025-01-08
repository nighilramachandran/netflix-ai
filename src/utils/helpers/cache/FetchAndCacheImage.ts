import { IMG_URL } from "../../constants/Global";

export const FetchAndCacheImage = async (
  movieId: number,
  path: string,
  cacheMap: Map<number, string>
): Promise<string> => {
  if (cacheMap.has(movieId)) {
    return cacheMap.get(movieId) as string;
  }
  try {
    const response = await fetch(IMG_URL + path);
    if (!response.ok) throw new Error("Failed to fetch image");
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    cacheMap.set(movieId, blobUrl);
    return blobUrl;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
};
