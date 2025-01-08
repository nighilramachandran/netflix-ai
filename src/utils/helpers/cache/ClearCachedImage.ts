import { posterImageCache } from "./cache/CacheImage";
// TODO
// use this function
export const ClearCachedImage = (movieId: number) => {
  const blobUrl = posterImageCache.get(movieId);
  if (blobUrl) {
    URL.revokeObjectURL(blobUrl);
    posterImageCache.delete(movieId);
  }
};
