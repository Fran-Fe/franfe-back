import { findAllByCafeUuid as findAllEntitiesByCafeUuid } from "./cafeHashtag.js";
import CafeHashtagNotFoundError from "../../../errors/cafeHashtagNotFoundError.js";

export async function findAllByCafeUuid(cafeUuid, booleanValidate) {
  const hashTags = await findAllEntitiesByCafeUuid(cafeUuid);

  if(booleanValidate && hashTags == null) {
    throw new CafeHashtagNotFoundError(cafeUuid);
  }

  return hashTags;
}