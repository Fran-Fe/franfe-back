import { findAllByCafeUuid as findAllEntitiesByCafeUuid} from "./cafePhoto.js";

export async function findAllByCafeUuid(cafeUuid) {
  return await findAllEntitiesByCafeUuid(cafeUuid);
}
