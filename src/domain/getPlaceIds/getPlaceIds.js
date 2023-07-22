export function placeIdsConfig(nextPageToken){
  const config = {
    params: {
      key: process.env.GOOGLE_API_KEY,
      query: 'starbucks',
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
