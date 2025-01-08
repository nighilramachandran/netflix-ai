// TODO

import { posterImageCache } from "./CacheImage";

// use this function
export const ClearCachedImage = (movieId: number) => {
  const blobUrl = posterImageCache.get(movieId);
  if (blobUrl) {
    URL.revokeObjectURL(blobUrl);
    posterImageCache.delete(movieId);
  }
};
