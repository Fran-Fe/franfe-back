import {findByCafeUuid as findOneEntityByCafeUuid} from "./cafeOption.js";
import CafeOptionNotFoundError from "../../../errors/cafeOptionNotFoundError.js";

export async function findByCafeUuid(cafeUuid, booleanValidate) {
  const cafeOption = await findOneEntityByCafeUuid(cafeUuid);

    if (booleanValidate && cafeOption == null) {
        throw new CafeOptionNotFoundError(cafeUuid);
    }

    return cafeOption;
}