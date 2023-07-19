import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

const apiKey = process.env.GOOGLE_API_KEY;

async function getCafePlaceIds(){
    try{
        const response = await axios.get(
            'https://maps.googleapis.com/maps/api/place/textsearch/json',
            {
                params: {
                    key: apiKey,
                    query: 'cafe'
                },
            }
        );
        console.log(apiKey);
        const placeIds = response.data.results.map((result) => result.place_id);

        for(const placesId of placeIds){
            console.log('Cafe place_id : ' ,placesId);
            const cafeInfo = await getCafeInfo(placesId);
            console.log('Cafe Name : ', cafeInfo);
        }

    }
    catch (error){
        console.log('Error fetching data from Google Places API: ', error.message);
    }
}

async function getCafeInfo(placeId){
    try{
        const response = await axios.get(
            'https://maps.googleapis.com/maps/api/place/details/json',
            {
                params: {
                    key: apiKey,
                    place_id: placeId,
                    fields: 'name',
                }
            }
        );
    }
    catch (error){
        console.error('Error fetching cafe info from Google Places API: ',error);
    }
}

getCafePlaceIds();
