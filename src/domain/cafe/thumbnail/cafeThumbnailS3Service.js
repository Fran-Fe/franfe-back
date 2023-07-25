import { findAllByCafeUuid as findAllEntitiesByCafeUuid } from "./cafeThumbnailS3.js";

export async function findAllByCafeUuid(cafeUuid) {
  return await findAllEntitiesByCafeUuid(cafeUuid);
}