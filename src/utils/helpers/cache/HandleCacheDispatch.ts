import { DipatchCache } from "./DispatchCache";

export const handleCacheDispatch = async <T>(
  data: T[] = [],
  idKey: keyof T,
  imagePathKey: keyof T,
  cacheMap: Map<number, string>
) => {
  await DipatchCache<T>(data, idKey, imagePathKey, cacheMap);
};
