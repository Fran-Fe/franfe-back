export default class ApiError extends Error {
  constructor(message) {
    super(`api error : ${message}`);
  }
}
