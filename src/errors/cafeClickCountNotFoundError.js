import ApiError from './apiError.js';
import { Cafe } from "./errorMessages.js";

export default class CafeClickCountNotFoundError extends ApiError {
  constructor(cafeUuid) {
    super();
    this.message = Cafe.CLICK_COUNT_NOT_FOUND + ` : cafeUuid = ${cafeUuid}`;
  }
}
