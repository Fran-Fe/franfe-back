import ApiError from './apiError';
import GoogleMap from './errorMessages';

export default class googleAPIFetchedError extends ApiError {
  constructor(message) {
    super(`${GoogleMap.NOT_FETCHED}  :  ${message}`);
  }
}
