import ApiError from './apiError.js';
import {Api} from "./errorMessages.js";

export default class PathParameterIsRequiredError extends ApiError {
  constructor(params) {
    super();

    const paramsString = params.toString();
    this.message = Api.PATH_PARAMETER_IS_REQUIRED + ` : params = ${paramsString}`;
  }
}
