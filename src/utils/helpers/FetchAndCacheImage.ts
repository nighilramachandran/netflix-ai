import { IMG_URL, PROXY_URL } from "../constants/Global";
import { imageCache } from "./CacheImage";

export const FetchAndCacheImage = async (
  movieId: number,
  path: string
): Promise<string> => {
  if (imageCache.has(movieId)) {
    return imageCache.get(movieId) as string;
  }
  try {
    const response = await fetch(PROXY_URL + IMG_URL + path);
    if (!response.ok) throw new Error("Failed to fetch image");
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    imageCache.set(movieId, blobUrl);
    return blobUrl;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
};
