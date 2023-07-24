import ApiError from './apiError.js';
import { Api }  from "./errorMessages.js";

export default class QueryParameterIsRequiredError extends ApiError {
  constructor(params) {
    super();

    const paramsString = params.toString();
    this.message = Api.QUERY_PARAMETER_IS_REQUIRED + ` : params = ${paramsString}`;
  }
}
