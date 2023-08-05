import ApiError, { throwApiError } from '../../../../errors/apiError.js';
import { findAllByCategoryForGallery } from './cafeThumbnailS3Service.js';
import { galleryDto } from '../../../../routes/dtos/galleryDto.js';

export async function getGalleryThumbnails(req){
  try{
    const request = await new galleryDto.Request(req);
    const data = await findAllByCategoryForGallery(request);
    const thumbnails = data.map((thumbnail) => new galleryDto.thumbnail(thumbnail));
    return await new galleryDto.Response(req.category, thumbnails);

  }catch (error) {
    throwApiError(error);
  }
}

export function checkGalleryRequest(req){
  return req.query.pageNum == null || req.query.category == null || req.query.pageSize == null;
}
