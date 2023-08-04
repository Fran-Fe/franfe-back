import { findAllByCategoryInPagination } from '../thumbnail/cafeThumbnailS3.js';

export async function findAllByCategoryForGallery(category,pageSize,offset){
  return await findAllByCategoryInPagination(category,pageSize,offset);
}


