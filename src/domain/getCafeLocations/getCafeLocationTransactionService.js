import { sequelize } from '../../config/connection.js';
import { throwApiError } from '../../errors/apiError.js';
import { getCafeLocationService } from './getCafeLocationService.js';
import { CafeDto } from '../../routes/dtos/cafeDto.js';
import { CafeLocationDto } from '../../routes/dtos/cafeLocationDto.js';

export async function getCafeLocations(req) {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    const cafes = await getCafeLocationService(req.userLng, req.userLat, req.distance);

    const res = await cafes.map((cafe) => new CafeLocationDto.Response(cafe));

    await transaction.commit();

    return res;

  } catch (error) {
    throwApiError(error);
  }
}
