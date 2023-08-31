import {
  findAll as findAllEntities,
  findAllByCafeUuid as findAllEntitiesByCafeUuid,
  findAllGalleryPageableByCategory as findAllGalleryEntitiesPageableByCategory,
  findAllGalleryPageable as findAllGalleryEntitiesPageable,
} from "./cafePhotoUrl.js";

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

  if (category === 0) {
    return await findAllGalleryEntitiesPageable(req);
  } else {
    return await findAllGalleryEntitiesPageableByCategory(category, req);
  }
}
