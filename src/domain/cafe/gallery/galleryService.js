import { findAllByCategoryInPagination } from '../thumbnail/cafeThumbnailS3.js';

export async function findAllByCategoryForGallery(req){
  const offset = Number((req.pageNum- 1) * req.pageSize);
  return await findAllByCategoryInPagination(req.category,req.pageSize,offset);
}


