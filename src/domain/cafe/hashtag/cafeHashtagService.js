import { findAllByCafeUuid as findAllEntitiesByCafeUuid } from "./cafeHashtag.js";

export async function findAllByCafeUuid(cafeUuid) {
  return await findAllEntitiesByCafeUuid(cafeUuid);
}