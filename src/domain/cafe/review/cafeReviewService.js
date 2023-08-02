import { findAllByCafeUuid as findAllEntitiesByCafeUuid, findAll as findAllEntities} from "./cafeReview.js";

export async function findAllReviewByCafeUuid(cafeUuid) {
   return await findAllEntitiesByCafeUuid(cafeUuid);
}

export async function findAll() {
   return await findAllEntities()
}