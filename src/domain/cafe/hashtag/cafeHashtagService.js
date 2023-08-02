import { findAllByCafeUuid as findAllEntitiesByCafeUuid, findAll as findAllEntities} from "./cafeHashtag.js";

export async function findAllHashTagByCafeUuid(cafeUuid) {
  return await findAllEntitiesByCafeUuid(cafeUuid);
}

export async function findAll() {
  return await findAll()
}
