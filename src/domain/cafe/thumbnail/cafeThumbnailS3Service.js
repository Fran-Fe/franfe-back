import { findAllByCafeUuid as findAllEntitiesByCafeUuid } from "./cafeThumbnailS3.js";
import {findAll as findAllTumbNails} from "./cafeThumbnailS3.js";
export async function findAllByCafeUuid(cafeUuid) {
  return await findAllEntitiesByCafeUuid(cafeUuid);
}

export async function findAll(){
  return await findAllTumbNails();
}
