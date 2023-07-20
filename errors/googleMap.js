import {ApiError} from "./apiError.js";

export class GoogleMapBadConnectionError extends ApiError {
    constructor(message) {
        super();
        this.message = "Bad connection with " + message;
    }
}