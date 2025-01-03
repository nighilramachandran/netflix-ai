import { imageCache } from "./CacheImage";
// TODO
// use this function
export const ClearCachedImage = (movieId: number) => {
  const blobUrl = imageCache.get(movieId);
  if (blobUrl) {
    URL.revokeObjectURL(blobUrl);
    imageCache.delete(movieId);
  }
};
