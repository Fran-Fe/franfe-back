import axios from 'axios';
import { throwError } from '../../errors/apiError.js';
import { URL_PLACE_DETAILS_IN_JSON, URL_TEXT_SEARCH_IN_JSON } from '../../../urls/googleMapUrls.js';
import { cafeInfoConfig, placeIdsConfig } from './getPlaceIds.js';
export async function getCafePlaceIds(pageToken){
  try{
    const allPlaceIds = [];
    let nextPageToken = pageToken;
    let tmpPageToken = nextPageToken;
    let page = 1;
    do{
      const response = await axios.get(
        URL_TEXT_SEARCH_IN_JSON,
        placeIdsConfig(nextPageToken),
      )

      await pushPlaceIds(allPlaceIds,response);
      nextPageToken = response.data.next_page_token;

      if(nextPageToken) {
        tmpPageToken = nextPageToken;
        page++;
      }
      else{
        nextPageToken = tmpPageToken;
        tmpPageToken = null;
      }

    }while((tmpPageToken === null && nextPageToken === null) || page < 5)

    return allPlaceIds;

  }catch (error){
    throwError(error);
  }
}

function pushPlaceIds(allPlaceIds, response){
  try{
    const results = response.data.results;
    const placeIds = results.map((result) => result.place_id);
    allPlaceIds.push(...placeIds);
  }catch (error){
    throwError(error);
  }
}

export async function getCafeInfo(placeId){
  try{
    const response = await axios.get(
      URL_PLACE_DETAILS_IN_JSON,
      cafeInfoConfig(placeId,`name`),
    )

    const cafeInfo = response.data.result;

    return {
      placeId : placeId,
      name : cafeInfo.name,
    }
  }catch (error){
    throwError(error);
  }

}
