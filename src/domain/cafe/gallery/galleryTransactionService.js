import { sequelize } from '../../../config/connection.js';
import ApiError from '../../../errors/apiError.js';
import { findAllByCategoryForGallery } from './galleryService.js';

export async function getGalleryThumbnails(req){
  try{
    const transaction = await sequelize.transaction();
    const request = req.body;
    
    const response = await findAllByCategoryForGallery()

    await transaction.commit();
  }catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(error.stackTrace);
  }
}
