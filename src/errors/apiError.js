import { logger } from "../logger/winston.js";

export default class ApiError extends Error {
  constructor(message = "") {
    super(`api error : ${message}`);
  }
}

export function throwApiError(error){
  if (error instanceof ApiError) {
    throw error;
  }

  throw new ApiError(error.message);
}
