import { sequelize } from "../../config/connection.js";
import ApiError from "../../errors/apiError.js";
import { findAll } from "./cafeService.js";
import { CafeDto } from "../../routes/dtos/cafeDto.js";


export async function getAllCafes() {
  try {

    const cafes = findAll();
    const res = (await (cafes))
      .map((cafe) => new CafeDto.Response(cafe))

    return res;

  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(error.message);
  }
}
