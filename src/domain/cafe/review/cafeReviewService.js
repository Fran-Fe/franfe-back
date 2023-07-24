import { findAllByCafeUuid as findAllEntitiesByCafeUuid} from "./cafeReview.js";
import CafeHashtagNotFoundError from "../../../errors/c.js";

export async function findAllByCafeUuid(cafeUuid, booleanValidate) {
  const reviews = await findAllEntitiesByCafeUuid(cafeUuid);

  if(booleanValidate && reviews == null) {
    throw new CafeHashtagNotFoundError(cafeUuid);
  }

  return reviews;
}