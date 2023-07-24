import { findAllByCafeUuid as findAllEntitiesByCafeUuid} from "./cafeReview.js";
import CafeHashtagNotFoundError from "../../../errors/c.js";

export async function findAllByCafeUuid(cafeUuid) {
   await findAllEntitiesByCafeUuid(cafeUuid);
}