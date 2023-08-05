import { logger } from "../logger/winston.js";

export default class ApiError extends Error {
  constructor(message = "") {
    super(`api error : ${message}`);
  }
}
