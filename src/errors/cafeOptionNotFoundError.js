import ApiError from './apiError';
import Cafe from "./errorMessages";

export default class CafeOptionNotFoundError extends ApiError {
  constructor(cafeUuid) {
    super();
    this.message = Cafe.OPTION_NOT_FOUND + ` : cafeUuid = ${cafeUuid}`;
  }
}
