import ApiError from './apiError.js';
import { Cafe } from "./errorMessages.js";

export default class CafeClickCountNotFoundError extends ApiError {
  constructor(cafeUuid) {
    const message = Cafe.CLICK_COUNT_NOT_FOUND + ` : cafeUuid = ${cafeUuid}`;

    super(message);
    this.message = message;
  }
}
