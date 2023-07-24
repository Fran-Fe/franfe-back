import ApiError from './apiError';
import Api from "./errorMessages";

export default class PathParameterIsRequiredError extends ApiError {
  constructor(params) {
    super();

    const paramsString = params.toString();
    this.message = Api.PATH_PARAMETER_IS_REQUIRED + ` : params = ${paramsString}`;
  }
}
