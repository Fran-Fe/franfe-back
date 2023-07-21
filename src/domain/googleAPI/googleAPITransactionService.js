import { sequelize } from '../../config/connection.js';
import { googleAPIService } from './googleAPIService.js';
import ApiError from '../../errors/apiError.js';

export async function transactionGoogleAPI(request){
  let transaction;
  try{

    transaction = await sequelize.transaction();

    const response = await googleAPIService().then((data) => {
      return data;
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
