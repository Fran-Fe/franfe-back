import ApiError from './apiError';
import Cafe from "./errorMessages";

export default class CafeNotFoundError extends ApiError {
  constructor(uuid) {
    super();
    this.message = Cafe.NOT_FOUND + ` : uuid = ${uuid}`;
  }
}
