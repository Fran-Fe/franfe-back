import { findAllByCafeUuid as findAllEntitiesByCafeUuid} from "./cafeReview.js";

export async function findAllByCafeUuid(cafeUuid) {
   return await findAllEntitiesByCafeUuid(cafeUuid);
}