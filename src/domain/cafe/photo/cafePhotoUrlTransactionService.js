import { throwApiError } from "../../../errors/apiError.js";
import { CafePhotoUrlDto } from "../../../routes/dtos/CafePhotoUrlDto.js";
import { findAll, findById as findPhotoUrlById, update } from "./cafePhotoUrlService.js";
import { findAll as findAllCafes } from "../cafeService.js"
import _ from "lodash";
import { sequelize } from "../../../config/connection.js";
import CafePhotoUrlNotFoundError from "../../../errors/cafePhotoUrlNotFoundError.js";
import { galleryDto } from "../../../routes/dtos/galleryDto.js";
import { findAllGalleryPageableByCategory } from "./cafePhotoUrlService.js";
import BooleanValidate from "../../../utils/booleanValidate.js";

export async function getAllCafesPhotos() {
  try {
    const res = [];

    const cafeUuids = await findAllCafes().map(cafe => cafe.uuid);

    const allPhotoUrls = await findAll();
    const allPhotoUrlsGroupByCafeUuid = _.groupBy(allPhotoUrls, 'cafeUuid');

    for (const cafeUuid of cafeUuids) {
      const photoUrlDtos = (allPhotoUrlsGroupByCafeUuid[cafeUuid] || []).map(photoUrl => {
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

export async function updatePhotoCategoryId(body) {
  try {
    const transaction = await sequelize.transaction();

    assignCategoryIds(body)

    await transaction.commit();

  } catch (error) {
    throwApiError(error);
  }

}

async function assignCategoryIds(body) {
  const allPhotoUrls = (await findAll()).map((photoUrl) => ({
    key: photoUrl.id,
    value: photoUrl,
  }));

  for (const photo of body) {
    await assignNewCategoryId(photo, allPhotoUrls);
  }
}

async function assignNewCategoryId(photo, allPhotoUrls) {
  const photoUrl = allPhotoUrls.find((item) => item.key === photo.urlId);

  if (photoUrl == null) {
    throw new CafePhotoUrlNotFoundError(`Not found photoUrl by id: ${photo.urlId}`);
  }

  photoUrl.value.categoryId = photo.categoryId;

  await update(photoUrl);
}

export async function getGalleryThumbnails(req, reqCategory){
  try{
    const request = await new galleryDto.Request(req, reqCategory);
    const thumbnails = await findAllGalleryPageableByCategory(request);
    const galleryObjects = thumbnails.map(async (thumbnail) => {
      const photoUrl = await findPhotoUrlById(thumbnail.cafePhotoUrlId, BooleanValidate.TRUE).url;

      return new galleryDto.thumbnail(thumbnail, photoUrl)
    });
    return await new galleryDto.Response(request.category, galleryObjects);

  }catch (error) {
    throwApiError(error);
  }
}
