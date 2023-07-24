import {findAllByCafeUuid as findOneEntityByCafeUuid} from "./cafeOption.js";

export async function findAllByCafeUuid(cafeUuid, booleanValidate) {
  return await findOneEntityByCafeUuid(cafeUuid);
}