import { findAllByCafeUuid as findAllEntitiesByCafeUuid, findAll as findAllEntities} from "./cafeHashtag.js";
import { findAllByCafeUuid as findOneEntityByCafeUuid } from "../option/cafeOption.js";
import { compare } from "../../../utils/comparer.js";

export async function findAllHashTagByCafeUuid(cafeUuid) {
  return await findAllEntitiesByCafeUuid(cafeUuid);
}

export async function findAll() {
  return await findAllEntities()
}

export async function validateHashtagList(hashtags, cafeUuid) {
  const cafeOptions = await findOneEntityByCafeUuid(cafeUuid);

  const compareResult = compare(cafeOptions, hashtags, (entity, option) => entity.hashtag === option);

  return compareResult.newRequests.length === 0;
}
