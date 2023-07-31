import { findAllByCafeUuid as findAllEntitiesByCafeUuid } from "./cafeHashtag.js";

export async function findAllHashTagByCafeUuid(cafeUuid) {
  return await findAllEntitiesByCafeUuid(cafeUuid);
}
