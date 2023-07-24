import { findAll as findAllEntities, findByUuid as findOneEntityByUuid } from './cafe.js';
import CafeNotFoundError from "../../errors/cafeNotFoundError.js";

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
