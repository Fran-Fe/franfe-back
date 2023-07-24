import ApiError from './apiError';
import Api from "./errorMessages";

export default class ParameterIsRequiredError extends ApiError {
  constructor(params) {
    super();

    const paramsString = params.toString();
    this.message = Api.PARAMETER_IS_REQUIRED + ` : params = ${paramsString}`;
  }
}
