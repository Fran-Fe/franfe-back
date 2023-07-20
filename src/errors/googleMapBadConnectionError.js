import ApiError from './apiError';
import GoogleMapBadConnection from './errorMessages';

export default class GoogleMapBadConnectionError extends ApiError {
  constructor(message) {
    super();
    this.message = GoogleMapBadConnection.BAD_CONNECTION + message;
  }
}
