import { findAllByCafeUuid as findAllEntitiesByCafeUuid} from "./cafeReview.js";

export async function findAllReviewByCafeUuid(cafeUuid) {
   return await findAllEntitiesByCafeUuid(cafeUuid);
}
