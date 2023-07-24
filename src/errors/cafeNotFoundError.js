import ApiError from './apiError.js';
import { Cafe } from "./errorMessages.js";

export default class CafeNotFoundError extends ApiError {
  constructor(uuid) {
    super();
    this.message = Cafe.NOT_FOUND + ` : uuid = ${uuid}`;
  }
}
