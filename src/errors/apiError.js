export default class ApiError extends Error {
  constructor(message) {
    super(`api error : ${message}`);
  }
}

export function throwError(error){
  if (error instanceof ApiError){
    throw error;
  }
  throw new ApiError(error.message);
}
