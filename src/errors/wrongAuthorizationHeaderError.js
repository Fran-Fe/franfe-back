import ApiError from './apiError.js';
import { Api } from "./errorMessages.js";

export default class WrongAuthorizationHeaderError extends ApiError {
  constructor() {
    const message = Api.WRONG_AUTHORIZATION_ERROR;

    super(message);
    this.message = message;
  }
}
