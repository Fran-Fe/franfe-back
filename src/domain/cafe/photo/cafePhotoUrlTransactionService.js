import { throwApiError } from "../../../errors/apiError.js";
import { CafePhotoUrlDto } from "../../../routes/dtos/CafePhotoUrlDto.js";
import { findAll, update } from "./cafePhotoUrlService.js";
import { findAll as findAllCafes } from "../cafeService.js"
import _ from "lodash";
import { sequelize } from "../../../config/connection.js";
import CafePhotoUrlNotFoundError from "../../../errors/cafePhotoUrlNotFoundError.js";
import { galleryDto } from "../../../routes/dtos/galleryDto.js";
import { findAllGalleryPageableByCategory } from "./cafePhotoUrlService.js";
import BodyFieldsAreRequiredError from "../../../errors/bodyFieldsAreRequiredError.js";

export async function getAllCafesPhotos() {
  try {
    const res = [];

    const cafeUuids = (await findAllCafes()).map(cafe => cafe.uuid)

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

    await assignCategoryIds(body)

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
    if (photo.urlId == null || photo.categoryId == null) {
      throw new BodyFieldsAreRequiredError(['urlId', 'categoryId']);
    }

    await assignNewCategoryId(photo, allPhotoUrls);
  }
}

async function assignNewCategoryId(photo, allPhotoUrls) {
  const urlId = Number(photo.urlId);
  const categoryId = Number(photo.categoryId);
  const photoUrl = allPhotoUrls.find((item) => item.key === Number(urlId));

  if (photoUrl == null) {
    throw new CafePhotoUrlNotFoundError(`Not found photoUrl by id: ${urlId}`);
  }

  photoUrl.value.categoryId = photo.categoryId;

  await update(photoUrl);
}

export async function getGalleryThumbnails(req, reqCategory) {
  try {
    const request = await new galleryDto.Request(req, reqCategory);
    const thumbnails = await findAllGalleryPageableByCategory(request);
    const galleryObjects = thumbnails.map(thumbnail => new galleryDto.thumbnail(thumbnail));
    shuffleArray(galleryObjects);
    return await new galleryDto.Response(request.category, randomShuffledGalleryObjects);

  } catch (error) {
    throwApiError(error);
  }
}
