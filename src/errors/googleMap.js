import {ApiError} from "./apiError.js";
import {GoogleMap} from "./errorMessages.js";

export class GoogleMapBadConnectionError extends ApiError {
    constructor(message) {
        super();
        this.message = GoogleMap.BAD_CONNECTION + message;
    }
}