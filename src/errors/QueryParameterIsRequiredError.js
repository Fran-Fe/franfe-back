import ApiError from './apiError';
import Api from "./errorMessages";

export default class QueryParameterIsRequiredError extends ApiError {
  constructor(params) {
    super();

    const paramsString = params.toString();
    this.message = Api.QUERY_PARAMETER_IS_REQUIRED + ` : params = ${paramsString}`;
  }
}
