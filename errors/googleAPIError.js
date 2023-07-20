import {ApiError} from "./apiError.js";
import {GoogleMap} from "./errorMessages.js";

export class googleAPIConnectedError extends ApiError{
    constructor(message) {
        super(GoogleMap.NOT_CONNECTED + " " + message);
    }
}

export class googleAPIFetchedError extends ApiError{
    constructor(message) {
        super(GoogleMap.NOT_FETCHED +" : " + message);
    }
}