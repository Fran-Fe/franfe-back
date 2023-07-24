import ApiError from './apiError';
import Cafe from "./errorMessages";

export default class CafeReviewTextNotFoundError extends ApiError {
  constructor(cafeUuid, reviewId) {
    super();
    this.message = Cafe.REVIEW_TEXT_NOT_FOUND + ` : cafeUuid = ${cafeUuid}, reviewId = ${reviewId}`;
  }
}
