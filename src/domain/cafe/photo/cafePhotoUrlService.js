import {
  findAll as findAllEntities,
  findAllByCafeUuid as findAllEntitiesByCafeUuid,
  findAllGalleryPageableByCategory as findAllGalleryEntitiesPageableByCategory,
  findAllGalleryPageable as findAllGalleryEntitiesPageable,
} from "./cafePhotoUrl.js";
import { page } from "../../../utils/pageable.js";

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
  const {doPage, firstId, lastId} = page(req);

  if (category === 0) {
    return await findAllGalleryEntitiesPageable(doPage, firstId, lastId);
  } else {
    return await findAllGalleryEntitiesPageableByCategory(category, doPage, firstId, lastId);
  }
}
