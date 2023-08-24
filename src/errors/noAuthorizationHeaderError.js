import ApiError from './apiError.js';
import { Api } from "./errorMessages.js";

export default class NoAuthorizationHeaderError extends ApiError {
  constructor() {
    const message = Api.NO_AUTHORIZATION_ERROR;

    super(message);
    this.message = message;
  }
}
