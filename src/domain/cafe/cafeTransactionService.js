import { sequelize } from "../../config/connection.js";
import ApiError from "../../errors/apiError.js";
import { getAllCafes } from "./cafeService.js";
import { CafeDto } from "../../routes/dtos/cafeDto.js";


export async function getAllCafes() {
  let transaction;
  try {

    transaction = await sequelize.transaction();
    const cafes = getAllCafes();
    const res = (await (cafes))
      .map((cafe) => new CafeDto.Response(cafe))

    await transaction.commit();

    return res;

  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(error.message);
  }
}
