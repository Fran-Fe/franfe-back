import { findAllByCafeUuid as findAllEntitiesByCafeUuid} from "./cafeReview.js";

export async function findAllByCafeUuid(cafeUuid) {
   await findAllEntitiesByCafeUuid(cafeUuid);
}