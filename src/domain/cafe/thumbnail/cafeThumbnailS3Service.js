import { findAllByCafeUuid as findAllEntitiesByCafeUuid } from "./cafeThumbnailS3.js";
import {findAllThumbnailsByUuid as findThumbsByUuid} from "./cafeThumbnailS3.js";
export async function findAllByCafeUuid(cafeUuid) {
  return await findAllEntitiesByCafeUuid(cafeUuid);
}

export async function findAllThumbnailsByUuid(cafeUuid){
  return await findThumbsByUuid(cafeUuid);
}
