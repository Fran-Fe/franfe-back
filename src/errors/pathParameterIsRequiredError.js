import ApiError from './apiError.js';
import {Api} from "./errorMessages.js";

export default class PathParameterIsRequiredError extends ApiError {
  constructor(params) {
    const paramsString = params.toString();
    const message = Api.PATH_PARAMETER_IS_REQUIRED + ` : params = ${paramsString}`;

    super(message);
    this.message = message
  }
}
