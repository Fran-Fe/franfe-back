export function placeIdsConfig(nextPageToken){
  const config = {
    params: {
      key: process.env.GOOGLE_API_KEY,
      query: 'cafe',
      location: '37.7749,-122.4194', //San Francisco latitude , longitude
      radius: 5000, //meters
      pagetoken: nextPageToken,
    }
  }
  return config;
}

export function cafeInfoConfig(placeId,fields){
  const config = {
    params: {
      key: process.env.GOOGLE_API_KEY,
      place_id: placeId,
      fields: fields,
    }
  }
  return config;
}
