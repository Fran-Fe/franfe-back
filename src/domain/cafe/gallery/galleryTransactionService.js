import { sequelize } from '../../../config/connection.js';
import ApiError from '../../../errors/apiError.js';

export async function getGalleryThumbnails(req){
  try{
    const transaction = await sequelize.transaction();



    await transaction.commit();
  }catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(error.stackTrace);
  }
}
