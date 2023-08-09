import ApiError from './apiError.js';
import { Cafe } from "./errorMessages.js";

export default class CafeNotFoundError extends ApiError {
  constructor(uuid) {
    const message = Cafe.NOT_FOUND + ` : uuid = ${uuid}`;

    super(message);
    this.message = message;
  }
}
