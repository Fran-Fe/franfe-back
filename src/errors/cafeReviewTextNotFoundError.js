import ApiError from './apiError.js';
import { Cafe } from "./errorMessages.js";

export default class CafeReviewTextNotFoundError extends ApiError {
  constructor(cafeUuid, reviewId) {
    const message = Cafe.REVIEW_TEXT_NOT_FOUND + ` : cafeUuid = ${cafeUuid}, reviewId = ${reviewId}`;

    super(message);
    this.message = message;
  }
}
