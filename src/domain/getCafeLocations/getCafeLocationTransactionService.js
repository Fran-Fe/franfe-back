import { sequelize } from '../../config/connection.js';
import { throwApiError } from '../../errors/apiError.js';
import { findByPosition } from './findByPosition.js';
import { CafeLocationDto } from '../../routes/dtos/cafeLocationDto.js';
import { findAll as findAllThumbnails } from '../cafe/thumbnail/cafeThumbnailS3Service.js';
import { findAll as findAllCafeReviews } from '../cafe/review/cafeReviewService.js';
import { findAll as findAllHashTags } from '../cafe/hashtag/cafeHashtagService.js';
import _ from 'lodash';

export async function getCafeLocations(req) {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    const cafes = await findByPosition(req.userLat, req.userLng, req.distance);

    const allThumbnails = _.groupBy(await findAllThumbnails(), "cafeUuid");
    const allReviews = _.groupBy(await findAllCafeReviews(), "cafeUuid");
    const allHashtags = _.groupBy(await findAllHashTags(), "cafeUuid");

    const res = await Promise.all(cafes.map(
      async (cafe) => {
        const thumbnails = allThumbnails[cafe.uuid];
        const thumbnailObjects = thumbnails.map((thumbnail) => new CafeLocationDto.Thumbnail(thumbnail));

        const reviewCount = allReviews[cafe.uuid].length;
        const hashtags = allHashtags[cafe.uuid]
          .map((hashtag) => hashtag.hashtag);

        return new CafeLocationDto.Response(cafe, thumbnailObjects, reviewCount, hashtags);
      }
    ));
    await transaction.commit();

    return res;

  } catch (error) {
    throwApiError(error);
  }
}
