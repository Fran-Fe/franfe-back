import { findAll as findAllEntities, findByUuid as findOneEntityByUuid } from './cafe.js';
import CafeNotFoundError from "../../errors/cafeNotFoundError.js";
import { findEntityByPosition } from "./cafe.js";
import { page } from "../../utils/pageable.js";

export function findAll() {
  return findAllEntities();
}

export function findByUuid(uuid, booleanValidate) {
  const cafe = findOneEntityByUuid(uuid);

  if (booleanValidate && cafe == null) {
    throw new CafeNotFoundError(uuid);
  }

  return cafe;
}

export function findPageableList(req) {
  const {doPage, firstId, lastId} = page(req);

  if (doPage) {
    return findEntityByPosition(req.userLat, req.userLng, req.distance, doPage, firstId, lastId, req.options, req.hashtags);
  } else {
    return findEntityByPosition(req.userLat, req.userLng, req.distance);
  }
}
