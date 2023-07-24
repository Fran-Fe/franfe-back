import { findOneByCafeReviewId as findOneEntityByCafeReviewId} from "./cafeReviewText.js";
import CafeReviewTextNotFoundError from "../../../../errors/cafeReviewTextNotFoundError.js";

export async function findOneByCafeReviewId(cafeUuid, booleanValidate) {
  const reviewText = await findOneEntityByCafeReviewId(cafeUuid);

  if (booleanValidate && !reviewText) {
    throw new CafeReviewTextNotFoundError();
  }

  return reviewText;
}