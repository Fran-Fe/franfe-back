import { findAll as findAllEntities, findByUuid as findOneEntityByUuid } from './cafe.js';
import CafeNotFoundError from "../../errors/cafeNotFoundError.js";

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
