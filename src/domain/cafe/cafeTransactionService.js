import ApiError from "../../errors/apiError.js";
import { findAll, findByUuid } from "./cafeService.js";
import { CafeDto } from "../../routes/dtos/cafeDto.js";
import BooleanValidate from "../../utils/booleanValidate.js";
import { findAllByCafeUuid as findOptionByCafeUuid } from "./option/cafeOptionService.js";
import { findAllByCafeUuid as findAllHashtagsByCafeUuid } from "./hashtag/cafeHashtagService.js";
import { findAllByCafeUuid as findAllReviewsByCafeUuid } from "./review/cafeReviewService.js";
import { findAllByCafeUuid as findAllThumbnailsByCafeUuid } from "./photo/thumbnail/cafeThumbnailS3Service.js";
import { findOneByCafeReviewId as findOneCafeReviewTextByCafeReviewId } from "./review/text/cafeReviewTextService.js";
import { sequelize } from "../../config/connection.js";
import { addCompareWinCount } from "./clickCount/cafeClickCountService.js";
import { findAllByCafeUuid } from "./photo/cafePhotoService.js";
import { CafePhotoDto } from "../../routes/dtos/CafePhotoDto.js";


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

export async function getCafeDetailInfo(cafeUuid, isWin) {
  try {
    const transaction = await sequelize.transaction();

    await addCompareWinCountOfCafe(cafeUuid, isWin);
    const {cafe, cafeOptions, cafeHashtags, cafeReviews, cafeThumbnailS3List} = await getCafeDetailDtoInfo(cafeUuid);

    await transaction.commit();

    return new CafeDto.DetailResponse(cafe, cafeOptions, cafeHashtags, cafeReviews, cafeThumbnailS3List);

  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(error.stackTrace);
  }

}

export async function getAllCafesPhotos(cafeUuid) {
  try {
    const transaction = await sequelize.transaction();

    const cafeUuids = (await findAllByCafeUuid(cafeUuid)).map((cafe) => cafe.uuid);

    const res = [];

    for (const cafeUuid of cafeUuids) {
      const photoS3List = await findAllByCafeUuid(cafeUuid);
      res.push(new CafePhotoDto.Response(cafeUuid, photoS3List));
      }

    await transaction.commit();

    return res;

  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(error.stackTrace);
  }
}

async function addCompareWinCountOfCafe(cafeUuid, isWin) {
  if (isWin) {
    await addCompareWinCount(cafeUuid, BooleanValidate.FALSE);
  }
}

async function getCafeDetailDtoInfo(cafeUuid) {
  const cafe = await findByUuid(cafeUuid, BooleanValidate.TRUE);
  const cafeOptions = await getCafeOptionsDto(cafeUuid);
  const cafeHashtags = await getCafeHashtags(cafeUuid);
  const cafeReviews = await getCafeReviews(cafeUuid);
  const cafeThumbnailS3List = await getCafeThumbnailS3(cafeUuid);

  return {cafe, cafeOptions, cafeHashtags, cafeReviews, cafeThumbnailS3List};
}

async function getCafeOptionsDto(cafeUuid) {
  const options = await findOptionByCafeUuid(cafeUuid);
  return options.map((option) => new CafeDto.DetailResponse.Option(option));
}

async function getCafeHashtags(cafeUuid) {
  const hashtags = await findAllHashtagsByCafeUuid(cafeUuid);
  return hashtags.map((hashtag) => hashtag.hashtag);
}

async function getCafeReviews(cafeUuid) {
  const reviews = await findAllReviewsByCafeUuid(cafeUuid);
  const reviewPromises = reviews.map(async (review) => {
    const reviewText = await findOneCafeReviewTextByCafeReviewId(review.id, BooleanValidate.TRUE).then(e => e.text);
    //fixme: 만약 여기에서 시간이 많이 걸린다면 caching 을 고려할것

    return new CafeDto.DetailResponse.Review(review, reviewText);
  });

  return Promise.all(reviewPromises);
}

async function getCafeThumbnailS3(cafeUuid) {
  const thumbnails = await findAllThumbnailsByCafeUuid(cafeUuid);
  return thumbnails.map((thumbnail) => new CafeDto.DetailResponse.thumbnailS3(thumbnail));
}
