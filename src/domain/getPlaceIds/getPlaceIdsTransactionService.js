import { sequelize } from '../../config/connection.js';
import { getCafePlaceIds, getCafeInfo } from './getPlaceIdsService.js';
import { throwError } from '../../errors/apiError.js';
import { googleAPIDto } from '../../routes/dtos/googleAPIDtos.js';

export async function getPlaceIdsTransactionService() {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    const allPlaceIds = await getCafePlaceIds('')
      .then((data) => {
        return data;
      });

    const allCafeInfos = [];
    for (let pid of allPlaceIds) {
      allCafeInfos.push(await getCafeInfo(pid));
    }

    await transaction.commit();

    console.log(allCafeInfos.length);

    return allCafeInfos
      //.forEach(cafeInfo => cafeInfo.map(new googleAPIDto.Response(cafeInfo.placeId, cafeInfo.name)));

  } catch (error) {
    throwError(error);
  }
}
