import { throwApiError } from '../../errors/apiError.js';
import { findAll, findByUuid, cafeService } from "./cafeService.js";
import { CafeDto } from "../../routes/dtos/cafeDto.js";
import BooleanValidate from "../../utils/booleanValidate.js";
import { findAllByCafeUuid as findOptionByCafeUuid, validateOptionList } from "./option/cafeOptionService.js";
import {
  findAll as findAllHashTags,
  findAllHashTagByCafeUuid as findAllHashtagsByCafeUuid, validateHashtagList
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
import { CafeListDto } from "../../routes/dtos/cafeListDto.js";
import _ from "lodash";


export async function getAllCafes() {
  try {

    const cafes = await findAll();
    return (await (cafes))
      .map((cafe) => new CafeDto.Response(cafe));

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
    const cafes = await cafeService(req);

    const {allThumbnails, allReviews, allHashtags} = getCachesForCafe();

    const res = await Promise.all(cafes.map(
      async (cafe) => {
        if (!await validatePageable(req, cafe)) {
          return;
        }

        const distance = getDistance(cafe, req);
        const thumbnailObjects = getThumbnailObjects(allThumbnails, cafe);
        const reviewCount = allReviews[cafe.uuid].length;
        const hashtags = allHashtags[cafe.uuid]
          .map((hashtag) => hashtag.hashtag);

        return new CafeListDto.Response(cafe, thumbnailObjects, hashtags, distance, reviewCount);
      }
    ));

    return res.sort((a, b) => a.distance - b.distance);

  } catch (error) {
    throwApiError(error);
  }
}

async function validatePageable(req, cafe) {
  return await validateWithOption(req, cafe) && await validateWithHashtag(req, cafe);
}

async function validateWithOption(req, cafe) {
  if (req.options.length > 0) {
    return await validateOptionList(req.options, cafe.uuid);
  }
}

async function validateWithHashtag(req, cafe) {
  if (req.hashtags.length > 0) {
    return await validateHashtagList(req.hashtags, cafe.uuid);
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
  return thumbnails.map((thumbnail) => new CafeListDto.Thumbnail(thumbnail));
}
