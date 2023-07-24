import { findAllByCafeUuid } from "./cafeReview.js";
import CafeHashtagNotFoundError from "../../../errors/c.js";

export async function findAllByCafeUuid(cafeUuid, booleanValidate) {
  const reviews = await findAllByCafeUuid(cafeUuid);

  if(booleanValidate && reviews == null) {
    throw new CafeHashtagNotFoundError(cafeUuid);
  }

  return reviews;
}