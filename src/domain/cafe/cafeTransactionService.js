import ApiError from "../../errors/apiError.js";
import { findAll, findByUuid } from "./cafeService.js";
import { CafeDto } from "../../routes/dtos/cafeDto.js";
import BooleanValidate from "../../utils/booleanValidate.js";
import { findByCafeUuid as findOptionByCafeUuid } from "./option/cafeOptionService.js";
import { findAllByCafeUuid as findAllHashtagsByCafeUuid } from "./hashtag/cafeHashtagService.js";
import { findAllByCafeUuid as findAllReviewsByCafeUuid } from "./review/cafeReview.js";


export async function getAllCafes() {
  try {

    const cafes = await findAll();
    const res = (await (cafes))
      .map((cafe) => new CafeDto.Response(cafe))

    return res;

  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(error.message);
  }
}

export async function getCafeDetailInfo(cafeUuid) {

  const cafe = await findByUuid(cafeUuid, BooleanValidate.TRUE);
  const cafeOption = await findOptionByCafeUuid(cafeUuid, BooleanValidate.TRUE);
  const cafeHashTags = await findAllHashtagsByCafeUuid(cafeUuid, BooleanValidate.FALSE);
  const cafeReviews = await findAllReviewsByCafeUuid(cafeUuid, BooleanValidate.FALSE);

}
