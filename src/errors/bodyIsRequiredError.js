import ApiError from './apiError.js';
import { Api }  from "./errorMessages.js";

export default class BodyIsRequiredError extends ApiError {
  constructor(params) {
    const paramsString = params.toString();
    const message = Api.BODY_IS_REQUIRED;

    super(message);
    this.message = message;
  }
}
