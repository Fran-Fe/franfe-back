import axios from "axios";
import {URL_TEXT_SEARCH_IN_JSON} from "../urls/googleMapUrls.js";
import {URL_PLACE_DETAILS_IN_JSON} from "../urls/googleMapUrls.js";
import {googleAPIFetchedError} from "../errors/googleAPIError.js";

const apiKey = process.env.GOOGLE_API_KEY;

async function getCafePlaceIds(pageToken){
    try{
        const allPlaceIds = [];
        let nextPageToken = pageToken;
        let tmpPageToken = nextPageToken;

        do{
            const response = await axios.get(
                URL_TEXT_SEARCH_IN_JSON,
                {
                    params:{
                        key: apiKey,
                        query: 'cafe',
                        location: '37.7749,-122.4194', //San Francisco latitude , longitude
                        radius: 5000, //meters
                        pagetoken: nextPageToken,
                    }
                }
            )
            const results = response.data.results;
            const placeIds = results.map((result) => result.place_id);
            allPlaceIds.push(...placeIds);
            nextPageToken = response.data.next_page_token;

            //console.log('page : ', nextPageToken, '\n');

            // Add a delay before fetching next page
            if(nextPageToken){
                await new Promise(resolve => setTimeout(resolve, 3000)); //wait for 3 seconds
            }
            if(nextPageToken != null) tmpPageToken === nextPageToken;

        }while(nextPageToken);

        //console.log(allPlaceIds);
        //console.log(allPlaceIds.length);

        return {
             allPlaceIds : allPlaceIds,
            currentPageToken : tmpPageToken,
        };
    }
    catch (error){
        console.error(googleAPIFetchedError,error);
    }
}

async function getCafeInfo(placeId){
    try{
        const response = await axios.get(
            URL_PLACE_DETAILS_IN_JSON,
            {
                params: {
                    key: apiKey,
                    place_id: placeId,
                    fields: `name,formatted_address,reviews`, //가게 이름만 가져오게 호출함
                }
            }
        );

        const placeTempInfo = response.data.result;

        return {
            name : placeTempInfo.name,
            address : placeTempInfo.formatted_address,
            reviews : placeTempInfo.reviews,
        }
    }
    catch (error){
        console.error(googleAPIFetchedError,error);
    }
}

function getAllCafePlaceIds(){
    const totalPlaceIds = [];
    let currentPageToken = null;

    do{
        const tempPlaceIds = getCafePlaceIds(currentPageToken);

        totalPlaceIds.push(...tempPlaceIds.allPlaceIds);
        currentPageToken = tempPlaceIds.currentPageToken;

    }while(currentPageToken)

    return totalPlaceIds;
}

getCafePlaceIds();

