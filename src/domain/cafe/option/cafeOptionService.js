import {
  findOneByCafeUuid as findOneEntityByCafeUuid,
  findAllByCafeUuidAndOptionOnIsTrue as findOneEntityByCafeUuidAndOptionOnIsTrue
} from "./cafeOption.js";
import { compare } from "../../../utils/comparer.js";

export async function findAllByCafeUuid(cafeUuid, booleanValidate) {
  return await findOneEntityByCafeUuid(cafeUuid);
}

export async function validateOptionList(options, cafeUuid) {
  const cafeOptions = await findOneEntityByCafeUuidAndOptionOnIsTrue(cafeUuid);

  const compareResult = compare(cafeOptions, options, (entity, option) => entity.option === option);

  return compareResult.newRequests.length === 0;
}
