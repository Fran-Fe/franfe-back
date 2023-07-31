import { sequelize } from '../../config/connection.js';
import { throwApiError } from '../../errors/apiError.js';
import { getCafeLocationService } from './getCafeLocationService.js';
import { CafeLocationDto } from '../../routes/dtos/cafeLocationDto.js';
import { findAllThumbnailsByUuid } from '../cafe/thumbnail/cafeThumbnailS3Service.js';
import { findAllReviewByCafeUuid } from '../cafe/review/cafeReviewService.js';

export async function getCafeLocations(req) {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    const cafes = await getCafeLocationService(req.userLat, req.userLng, req.distance);

    const res = await Promise.all(cafes.map(
      async (cafe) => {
        const thumbnails = await findAllThumbnailsByUuid(cafe.uuid);
        const thumbnailObjects = thumbnails.map((e) => new CafeLocationDto.Thumbnail(e));
        const reviews = await findAllReviewByCafeUuid(cafe.uuid);
        const count = await reviews.length;
        return new CafeLocationDto.Response(cafe, thumbnailObjects, count);
      }
    ));
    await transaction.commit();

    return res;

  } catch (error) {
    throwApiError(error);
  }
}
