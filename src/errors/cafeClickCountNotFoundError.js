import ApiError from './apiError';
import Cafe from "./errorMessages";

export default class CafeClickCountNotFoundError extends ApiError {
  constructor(cafeUuid) {
    super();
    this.message = Cafe.CLICK_COUNT_NOT_FOUND + ` : cafeUuid = ${cafeUuid}`;
  }
}
