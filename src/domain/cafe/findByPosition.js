import { findAll as findAllEntities, findByUuid as findOneEntityByUuid } from './cafe.js';
import CafeNotFoundError from "../../errors/cafeNotFoundError.js";
import { findEntityByPosition } from "./cafe.js";

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

export function findByPosition(userLat, userLng, distance) {
  return findEntityByPosition(userLat, userLng, distance);
}
