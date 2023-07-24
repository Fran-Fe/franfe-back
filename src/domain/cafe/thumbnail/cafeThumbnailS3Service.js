import CafeThumbnailNotFoundError from "../../../errors/cafeThumbnailNotFoundError.js.js";
import { findAllByCafeUuid as findAllEntitiesByCafeUuid } from "./cafeThumbnailS3.js";

export async function findAllByCafeUuid(cafeUuid, booleanValidate) {
  const thumbnails = await findAllEntitiesByCafeUuid(cafeUuid);

  if(booleanValidate && thumbnails == null) {
    throw new CafeThumbnailNotFoundError(cafeUuid);
  }

  return thumbnails;
}