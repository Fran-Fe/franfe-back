import { findAllByCategory } from '../thumbnail/cafeThumbnailS3.js';

export async function findAllByCategoryForGallery(category){
  return await findAllByCategory(category);
}
