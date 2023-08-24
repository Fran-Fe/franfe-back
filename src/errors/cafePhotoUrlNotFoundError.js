import ApiError from './apiError.js';
import { Cafe } from "./errorMessages.js";

export default class CafePhotoUrlNotFoundError extends ApiError {
  constructor(id) {
    const message = Cafe.NOT_FOUND + ` : id = ${id.toString()}`;

    super(message);
    this.message = message;
  }
}
