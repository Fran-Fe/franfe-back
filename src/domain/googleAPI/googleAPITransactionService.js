import { sequelize } from '../../config/connection.js';
import { googleAPIService } from './googleAPIService.js';
import ApiError from '../../errors/apiError.js';

export async function transactioinGoogleAPI(request){
  let transaction;
  try{

    transaction = await sequelize.transaction();

    let res;
    const response = await googleAPIService().then((data) => {
      res = data;

      return res;
    });

    await transaction.commit();

    return response;

  }catch (error){
    if(error instanceof ApiError){
      throw error;
    }

    throw new ApiError(error.message);
  }
}
