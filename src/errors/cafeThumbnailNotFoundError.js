import ApiError from './apiError';
import Cafe from "./errorMessages";

export default class CafeThumbnailNotFoundError extends ApiError {
  constructor(cafeUuid) {
    super();
    this.message = Cafe.THUMBNAIL_NOT_FOUND + ` : cafeUuid = ${cafeUuid}`;
  }
}
