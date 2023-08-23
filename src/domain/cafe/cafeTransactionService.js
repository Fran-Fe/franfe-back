import { throwApiError } from '../../errors/apiError.js';
import { findAll, findByUuid, findAllPageableCafesByPosition } from "./findAllPageableCafesByPosition.js";
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
} from "./photo/thumbnail/cafeThumbnailS3Service.js";
import { addCompareWinCount } from "./clickCount/cafeClickCountService.js";
import { CafeListDto } from "../../routes/dtos/cafeListDto.js";
import _ from "lodash";
import { CafePhotoDto } from "../../routes/dtos/CafePhotoDto.js";
import { findAllByCafeUuid } from "./photo/cafePhoto.js";


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
    await addCompareWinCountOfCafe(cafeUuid, isWin);
    const {cafe, cafeOptions, cafeHashtags, cafeReviews, cafeThumbnailS3List} = await getCafeDetailDtoInfo(cafeUuid);

    return new CafeDto.DetailResponse(cafe, cafeOptions, cafeHashtags, cafeReviews, cafeThumbnailS3List);

  } catch (error) {
    throwApiError(error);
  }
}

export async function getCafeLocations(req) {
  try {
    const cafes = await findAllPageableCafesByPosition(req);

    const {allThumbnails, allReviews, allHashtags} = await getCachesForCafe();

    const topCountHashtags = [];
    const cafeInfos = await Promise.all(cafes.map(
      async (cafe) => {
        if (await validatePageable(req, cafe)) {
          return await createCafeInfoDtos(cafe, req, allThumbnails, allReviews, allHashtags, topCountHashtags);
        }
      }
    ));

    cafeInfos.sort((a, b) => a.distance - b.distance);

    return new CafeListDto.Response(cafeInfos, topCountHashtags);

  } catch (error) {
    throwApiError(error);
  }
}

async function createCafeInfoDtos(cafe, req, allThumbnails, allReviews, allHashtags, topCountHashtags) {
  const distance = getDistance(cafe, req);
  const thumbnailObjects = getThumbnailObjects(allThumbnails, cafe);
  const reviewCount = allReviews[cafe.uuid].length;
  const hashtagsHashMap = new Map();

  const hashtags = allHashtags[cafe.uuid]
    .map((hashtag) => {
      addInHashMap(hashtagsHashMap, hashtag);
      return hashtag.hashtag
    });
  topCountHashtags = getTopCountHashtags(hashtagsHashMap);

  return {
    cafeList: new CafeListDto.CafeInfo(cafe, thumbnailObjects, hashtags, distance, reviewCount),
    topCountHashtags
  };
}

function getTopCountHashtags(hashtagsHashMap) {
  const entriesArray = Array.from(hashtagsHashMap.entries());
  entriesArray.sort((first, second) => second[1] - first[1]);
  return entriesArray.slice(0, 30)
    .map((hashtagHashMap) => hashtagHashMap[0]);
}

function addInHashMap(hashMap, hashtag) {
  hashMap.has(hashtag.hashtag) ? hashMap.set(hashtag.hashtag, hashMap.get(hashtag.hashtag) + 1) : hashMap.set(hashtag.hashtag, 1);
}

async function validatePageable(req, cafe) {
  return await validateWithOption(req, cafe) && await validateWithHashtag(req, cafe);
}

async function validateWithOption(req, cafe) {
  if (req.options.length > 0) {
    return await validateOptionList(req.options, cafe.uuid);
  }

  return true;
}

async function validateWithHashtag(req, cafe) {
  if (req.hashtags.length > 0) {
    return await validateHashtagList(req.hashtags, cafe.uuid);
  }

  return true;
}

export async function getAllCafesPhotos() {
  try {
    const transaction = await sequelize.transaction();

    const cafeUuids = (await findAll())
      .map((cafe) => cafe.uuid);

    const res = [];

    for (const cafeUuid of cafeUuids) {
      const photoS3List = await findAllByCafeUuid(cafeUuid);
      const photoS3UrlList = photoS3List.map((photo) => photo.bucketUrl);
      res.push(new CafePhotoDto.Response(cafeUuid, photoS3UrlList));
    }

    await transaction.commit();

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

  if (!thumbnails || thumbnails.length === 0) {
    return [];
  }

  return thumbnails.map((thumbnail) => new CafeListDto.Thumbnail(thumbnail));
}
