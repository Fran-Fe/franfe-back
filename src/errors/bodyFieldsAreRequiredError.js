import ApiError from './apiError.js';
import { Api }  from "./errorMessages.js";

export default class BodyFieldsAreRequiredError extends ApiError {
  constructor(fields) {
    const fieldsString = fields.toString();
    const message = Api.BODY_FIELDS_ARE_REQUIRED + ` : fields = ${fieldsString}`;

    super(message);
    this.message = message;
  }
}
