import { throwApiError } from '../../errors/apiError.js';
import { findAll, findByUuid } from "./findByPosition.js";
import { CafeDto } from "../../routes/dtos/cafeDto.js";
import BooleanValidate from "../../utils/booleanValidate.js";
import { findAllByCafeUuid as findOptionByCafeUuid } from "./option/cafeOptionService.js";
import {
  findAll as findAllHashTags,
  findAllHashTagByCafeUuid as findAllHashtagsByCafeUuid
} from "./hashtag/cafeHashtagService.js";
import {
  findAll as findAllCafeReviews,
  findAllReviewByCafeUuid as findAllReviewsByCafeUuid
} from "./review/cafeReviewService.js";
import {
  findAll as findAllThumbnails,
  findAllByCafeUuid as findAllThumbnailsByCafeUuid
} from "./thumbnail/cafeThumbnailS3Service.js";
import { sequelize } from "../../config/connection.js";
import { addCompareWinCount } from "./clickCount/cafeClickCountService.js";
import { findByPosition } from "./findByPosition.js";
import { CafeLocationDto } from "../../routes/dtos/cafeLocationDto.js";
import _ from "lodash";


export async function getAllCafes() {
  try {

    const cafes = await findAll();
    const res = (await (cafes))
      .map((cafe) => new CafeDto.Response(cafe))

    return res;

  } catch (error) {
    throwApiError(error);
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
    throwApiError(error);
  }
}

export async function getCafeLocations(req) {
  try {
    const cafes = await findByPosition(req.userLat, req.userLng, req.distance);

    const {allThumbnails, allReviews, allHashtags} = getCachesForCafe();

    const res = await Promise.all(cafes.map(
      async (cafe) => {
        const distance = getDistance(cafe, req);

        const thumbnailObjects = getThumbnailObjects(allThumbnails, cafe);
        const reviewCount = allReviews[cafe.uuid].length;
        const hashtags = allHashtags[cafe.uuid]
          .map((hashtag) => hashtag.hashtag);

        return new CafeLocationDto.Response(cafe, thumbnailObjects, hashtags, distance, reviewCount);
      }
    ));
    return res;

  } catch (error) {
    throwApiError(error);
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
    return new CafeDto.DetailResponse.Review(review);
  });

  return Promise.all(reviewPromises);
}

async function getCafeThumbnailS3(cafeUuid) {
  const thumbnails = await findAllThumbnailsByCafeUuid(cafeUuid);
  return thumbnails.map((thumbnail) => new CafeDto.DetailResponse.thumbnailS3(thumbnail));
}

function getDistance(cafe, req) {
  return Math.sqrt(((req.userLat - cafe.lat) ** 2) + ((req.userLng - cafe.lng) ** 2));
}

async function getCachesForCafe() {
  const allThumbnails = _.groupBy(await findAllThumbnails(), "cafeUuid");
  const allReviews = _.groupBy(await findAllCafeReviews(), "cafeUuid");
  const allHashtags = _.groupBy(await findAllHashTags(), "cafeUuid");

  return {allThumbnails, allReviews, allHashtags};
}

function getThumbnailObjects(allThumbnails, cafe) {
  const thumbnails = allThumbnails[cafe.uuid];
  return thumbnails.map((thumbnail) => new CafeLocationDto.Thumbnail(thumbnail));
}
