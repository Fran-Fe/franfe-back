import { findAll as findAllEntities, findByUuid as findOneEntityByUuid } from './cafe.js';
import CafeNotFoundError from "../../errors/cafeNotFoundError.js";
import { findEntityByPosition } from "./cafe.js";
import { page } from "../../utils/pageable.js";

export async function findAll() {
  return await findAllEntities();
}

export async function findByUuid(uuid, booleanValidate) {
  const cafe = await findOneEntityByUuid(uuid);

  if (booleanValidate && cafe == null) {
    throw new CafeNotFoundError(uuid);
  }

  return cafe;
}

export function cafeService(req) {
  const {doPage, firstId, lastId} = page(req);

  return findEntityByPosition(req.userLat, req.userLng, req.radius, doPage, firstId, lastId, req.options, req.hashtags, req.search);
}
