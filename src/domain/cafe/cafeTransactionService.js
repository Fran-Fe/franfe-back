import ApiError from "../../errors/apiError.js";
import { findAll, findByUuid } from "./cafeService.js";
import { CafeDto } from "../../routes/dtos/cafeDto.js";
import BooleanValidate from "../../utils/booleanValidate.js";
import { findByCafeUuid as findOptionByCafeUuid } from "./option/cafeOptionService.js";
import { findAllByCafeUuid as findAllHashtagsByCafeUuid } from "./hashtag/cafeHashtagService.js";
import { findAllByCafeUuid as findAllReviewsByCafeUuid } from "./review/cafeReviewService.js";
import { findAllByCafeUuid as findAllThumbnailsByCafeUuid } from "./thumbnail/cafeThumbnailS3Service.js";


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
    try {

        const {cafe, cafeOptions, cafeHashtags, cafeReviews, cafeThumbnailS3} = await getCafeDetailInfo();
        //cafeOption 은 리스트, cafeHashtags 는 리스트, cafeReviews 는 리스트, cafeThumbnailS3 는 리스트
        const res = new CafeDto.DetailResponse(cafe, cafeOptions, cafeHashtags, cafeReviews, cafeThumbnailS3);

        return res;

    } catch (error) {
        if (error instanceof ApiError) {
        throw error;
        }

        throw new ApiError(error.message);
    }

}

async function getCafeDetailInfo() {
  const cafe = await findByUuid(cafeUuid, BooleanValidate.TRUE);
  const cafeOptions = await findOptionByCafeUuid(cafeUuid, BooleanValidate.TRUE);
  const cafeHashtags = await findAllHashtagsByCafeUuid(cafeUuid, BooleanValidate.FALSE);
  const cafeReviews = await findAllReviewsByCafeUuid(cafeUuid, BooleanValidate.FALSE);
  const cafeThumbnailS3 = await findAllThumbnailsByCafeUuid(cafeUuid, BooleanValidate.FALSE);

  return {cafe, cafeOptions, cafeHashtags: cafeHashtags, cafeReviews, cafeThumbnailS3};
}