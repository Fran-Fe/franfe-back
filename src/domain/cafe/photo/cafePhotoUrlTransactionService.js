import { throwApiError } from "../../../errors/apiError.js";
import { CafePhotoUrlDto } from "../../../routes/dtos/CafePhotoUrlDto.js";
import {findAll} from "./cafePhotoUrl.js";

export async function getAllCafesPhotos() {
  try {
    const res = [];

    const allPhotoUrls = await findAll();
    for (const photoUrl of allPhotoUrls) {
      const dto = new CafePhotoUrlDto.Response(photoUrl);

      res.push(dto);
    }

    return res;

  } catch (error) {
    throwApiError(error);
  }
}