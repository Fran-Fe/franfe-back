import { sequelize } from '../../../config/connection.js';
import ApiError, { throwApiError } from '../../../errors/apiError.js';
import { findAllByCategoryForGallery } from './galleryService.js';
import { galleryDto } from '../../../routes/dtos/galleryDto.js';
import { checkGalleryRequest } from './checkGalleryReqService.js';

export async function getGalleryThumbnails(req){
  try{
    const transaction = await sequelize.transaction();

    const request = await new galleryDto.Request(req);
    const data = await findAllByCategoryForGallery(request);
    const thumbnails = await data.map((d) => new galleryDto.thumbnail(d));
    const response = await new galleryDto.Response(req.category, thumbnails);

    await transaction.commit();

    return response

  }catch (error) {
    throwApiError(error);
  }
}
