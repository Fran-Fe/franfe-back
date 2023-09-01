import {
  findAll as findAllEntities,
  findAllByCafeUuid as findAllEntitiesByCafeUuid,
  findAllGalleryPageableByCategory as findAllGalleryEntitiesPageableByCategory,
  findAllGalleryPageable as findAllGalleryEntitiesPageable,
  findOneInteriorPhotoByCafeUuid as findOneInteriorPhotoEntityByCafeUuid
} from "./cafePhotoUrl.js";
import CafePhotoUrlNotFoundError from "../../../errors/cafePhotoUrlNotFoundError.js";

export async function findAll() {
  return await findAllEntities();
}

export async function findAllThumbnailsByCafeUuid(cafeUuid) {
  return await findAllEntitiesByCafeUuid(cafeUuid);
}

export async function update(photo) {
  await photo.save();
}

export async function findAllGalleryPageableByCategory(req) {
  const category = req.category;

  if (category === 4) {
    return await findAllGalleryEntitiesPageable(req);
  } else {
    return await findAllGalleryEntitiesPageableByCategory(category, req);
  }
}

export async function findOneInteriorPhotoByCafeUuid(cafeUuid, booleanValidate) {
  const url =  await findOneInteriorPhotoEntityByCafeUuid(cafeUuid);

  if (booleanValidate && url === null) {
    throw new CafePhotoUrlNotFoundError(cafeUuid);
  }

  return url;
}
