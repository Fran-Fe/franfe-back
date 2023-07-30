import { sequelize } from '../../config/connection.js';
import { throwApiError } from '../../errors/apiError.js';
import { getCafeLocationService } from './getCafeLocationService.js';
import { CafeLocationDto } from '../../routes/dtos/cafeLocationDto.js';

export async function getCafeLocations(req) {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    const cafes = await getCafeLocationService(req.userLat, req.userLng, req.distance);

    const res = cafes.map((cafe) => new CafeLocationDto.Response(cafe));

    await transaction.commit();

    return res;

  } catch (error) {
    throwApiError(error);
  }
}
