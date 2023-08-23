import { throwApiError } from "../../../errors/apiError.js";
import { CafePhotoUrlDto } from "../../../routes/dtos/CafePhotoUrlDto.js";
import { findAll } from "./cafePhotoUrlService.js";
import { findAll as findAllCafes } from "../cafeService.js"
import _ from "lodash";

export async function getAllCafesPhotos() {
  try {
    const res = [];

    const cafeUuids = await findAllCafes().map(cafe => cafe.uuid);

    const allPhotoUrls = await findAll();
    const allPhotoUrlsGroupByCafeUuid = _.groupBy(allPhotoUrls, 'cafeUuid');

    for (const cafeUuid of cafeUuids) {
      const photoUrlDtos = allPhotoUrlsGroupByCafeUuid[cafeUuid].map(photoUrl => {
        return new CafePhotoUrlDto.CafePhoto(photoUrl.id, photoUrl.url);
      });

      const dto = new CafePhotoUrlDto.Response(cafeUuid, photoUrlDtos);

      res.push(dto);
    }

    return res;

  } catch (error) {
    throwApiError(error);
  }
}