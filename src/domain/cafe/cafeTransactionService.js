import ApiError from "../../errors/apiError.js";
import { findAll, findByUuid } from "./cafeService.js";
import { CafeDto } from "../../routes/dtos/cafeDto.js";
import BooleanValidate from "../../utils/booleanValidate.js";
import { findAllByCafeUuid as findOptionByCafeUuid } from "./option/cafeOptionService.js";
import { findAllByCafeUuid as findAllHashtagsByCafeUuid } from "./hashtag/cafeHashtagService.js";
import { findAllByCafeUuid as findAllReviewsByCafeUuid } from "./review/cafeReviewService.js";
import { findAllByCafeUuid as findAllThumbnailsByCafeUuid } from "./thumbnail/cafeThumbnailS3Service.js";
import { findOneByCafeReviewId as findOneCafeReviewTextByCafeReviewId } from "./review/text/cafeReviewTextService.js";


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


    return new CafeDto.DetailResponse(cafe, cafeOptions, cafeHashtags, cafeReviews, cafeThumbnailS3);

  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(error.message);
  }

}

async function getCafeDetailInfo(cafeUuid) {
  const cafe = await findByUuid(cafeUuid, BooleanValidate.TRUE);
  const cafeOptions = await getCafeOptionsDto(cafeUuid);
  const cafeHashtags = await getCafeHashtags(cafeUuid);
  const cafeReviews = await getCafeReviews(cafeUuid);
  const cafeThumbnailS3 = await getCafeThumbnailS3(cafeUuid);

  return {cafe, cafeOptions, cafeHashtags, cafeReviews, cafeThumbnailS3};
}

async function getCafeOptionsDto(cafeUuid) {
  const options = await findOptionByCafeUuid(cafeUuid);
  return options.map((option) => new CafeDto.DetailResponse.CafeOption(option));
}

async function getCafeHashtags(cafeUuid) {
  const hashtags = await findAllHashtagsByCafeUuid(cafeUuid);
  return hashtags.map((hashtag) => hashtag.hashtag);
}

async function getCafeReviews(cafeUuid) {
  const reviews = await findAllReviewsByCafeUuid(cafeUuid);
  return reviews.map(async (review) => {
    const reviewText = await findOneCafeReviewTextByCafeReviewId(review.id, BooleanValidate.TRUE);

    return new CafeDto.DetailResponse.CafeReview(review, reviewText);
  });
}

async function getCafeThumbnailS3(cafeUuid) {
  const thumbnails = await findAllThumbnailsByCafeUuid(cafeUuid);
  return thumbnails.map((thumbnail) => new CafeDto.DetailResponse.CafeThumbnailS3(thumbnail));
}
