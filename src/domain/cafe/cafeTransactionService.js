import { throwApiError } from '../../errors/apiError.js';
import { findByUuid, findAllPageableCafesByPosition } from "./cafeService.js";
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
  findAllThumbnailsByCafeUuid as findAllThumbnailsByCafeUuid
} from "./photo/cafePhotoUrlService.js"
import { addCompareWinCount } from "./clickCount/cafeClickCountService.js";
import { CafeListDto } from "../../routes/dtos/cafeListDto.js";
import _ from "lodash";
import { findAll as findAllPhotos } from "./photo/cafePhotoUrlService.js";


export async function getCafeDetailInfo(cafeUuid, isWin) {
  try {
    await addCompareWinCountOfCafe(cafeUuid, isWin);
    const {cafe, cafeOptions, cafeHashtags, cafeReviews, cafeThumbnails} = await getCafeDetailDtoInfo(cafeUuid);

    return new CafeDto.DetailResponse(cafe, cafeOptions, cafeHashtags, cafeReviews, cafeThumbnails);

  } catch (error) {
    throwApiError(error);
  }
}

export async function getCafeLocations(req) {
  try {
    const cafes = await findAllPageableCafesByPosition(req);

    const {allThumbnails, allReviews, allHashtags} = await getCachesForCafe();

    const totalHashTags = [];
    const cafeInfos = await Promise.all(cafes.map(
      async (cafe) => {
        if (await validatePageable(req, cafe)) {
          const cafeInfo = await createCafeInfoDtos(cafe, req, allThumbnails, allReviews, allHashtags);

          totalHashTags.push(...cafeInfo.hashTags);

          return cafeInfo;
        }
      }
    ));

    const topCountHashtags = getTopCountHashtags(addInHashMap(new Map(), totalHashTags));
    cafeInfos.sort((a, b) => a.distance - b.distance);

    return new CafeListDto.Response(cafeInfos, topCountHashtags);

  } catch (error) {
    throwApiError(error);
  }
}

async function createCafeInfoDtos(cafe, req, allThumbnails, allReviews, allHashtags) {
  const distance = getDistance(cafe, req);
  const thumbnailObjects = getThumbnailObjects(allThumbnails, cafe);
  const reviewCount = (allReviews[cafe.uuid] || []).length;

  const hashtags = (allHashtags[cafe.uuid] || [])
    .map((hashtag) => {
      return hashtag.hashtag
    });

  return new CafeListDto.CafeInfo(cafe, thumbnailObjects, hashtags, distance, reviewCount);
}

function getTopCountHashtags(hashtagsHashMap) {
  const entriesArray = Array.from(hashtagsHashMap.entries());
  entriesArray.sort((first, second) => second[1] - first[1]);
  return entriesArray.slice(0, 30)
    .map((hashtagHashMap) => hashtagHashMap[0]);
}

function addInHashMap(hashMap, hashtags) {
  for (const hashtag of hashtags) {
    hashMap.has(hashtag) ? hashMap.set(hashtag, hashMap.get(hashtag) + 1) : hashMap.set(hashtag, 1);
  }

  return hashMap;
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
  const cafeThumbnails = await getCafeThumbnails(cafeUuid);

  return {cafe, cafeOptions, cafeHashtags, cafeReviews, cafeThumbnails};
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

async function getCafeThumbnails(cafeUuid) {
  return (await findAllThumbnailsByCafeUuid(cafeUuid)).map((thumbnail) => {
    return new CafeDto.DetailResponse.Thumbnail(thumbnail);
  });
}

function getDistance(cafe, req) {
  return Math.sqrt(((req.userLat - cafe.lat) ** 2) + ((req.userLng - cafe.lng) ** 2));
}

async function getCachesForCafe() {
  const allThumbnails = _.groupBy(await findAllPhotos(), "cafeUuid");
  const allReviews = _.groupBy(await findAllCafeReviews(), "cafeUuid");
  const allHashtags = _.groupBy(await findAllHashTags(), "cafeUuid");

  return {allThumbnails, allReviews, allHashtags};
}

function getThumbnailObjects(allThumbnails, cafe) {
  const thumbnails = allThumbnails[cafe.uuid] || [];

  if (!thumbnails || thumbnails.length === 0) {
    return [];
  }

  return thumbnails.map((thumbnail) => new CafeListDto.Thumbnail(thumbnail));
}
