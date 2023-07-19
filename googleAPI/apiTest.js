import axios from "axios";

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

        const placeIds = response.data.results.map((result) => result.place_id);

        console.log('Cafe Name : ' , (await getCafeInfo(placeIds[0])).name);
        console.log('Reviews Num : ',(await getCafeInfo(placeIds[0])).reviews.length);
        for(const review of (await getCafeInfo(placeIds[0])).reviews){
            console.log(review.text,`\n`);
        }

        /*for(const placesId of placeIds){

            console.log('Cafe place_id : ' ,placesId);
            const cafeInfo = await getCafeInfo(placesId);
            console.log('Cafe Name : ', cafeInfo.name);
            console.log('Cafe Address : ', cafeInfo.address);
        }*/
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
        console.error('Error fetching cafe info from Google Places API: ',error);
    }
}

getCafePlaceIds();
