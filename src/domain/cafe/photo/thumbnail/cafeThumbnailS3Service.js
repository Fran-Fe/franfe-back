import { findAllByCafeUuid as findAllEntitiesByCafeUuid, findAllByCategoryInPagination } from "./cafeThumbnailS3.js";
import {findAll as findAllTumbNails} from "./cafeThumbnailS3.js";
export async function findAllByCafeUuid(cafeUuid) {
  return await findAllEntitiesByCafeUuid(cafeUuid);
}

export async function findAll(){
  return await findAllTumbNails();
}

export async function findAllByCategoryForGallery(req){
  const offset = Number((req.pageNum- 1) * req.pageSize);
  return await findAllByCategoryInPagination(req.category,req.pageSize,offset);
}


