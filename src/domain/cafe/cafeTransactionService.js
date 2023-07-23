import { sequelize } from "../../config/connection.js";
import ApiError, { throwApiError } from '../../errors/apiError.js';
import { findAll } from "./cafeService.js";
import { CafeDto } from "../../routes/dtos/cafeDto.js";


export async function getAllCafes() {
  let transaction;
  try {

    transaction = await sequelize.transaction();

    const cafes = findAll();
    const res = (await (cafes))
      .map((cafe) => new CafeDto.Response(cafe))

    await transaction.commit();

    return res;

  } catch (error) {
    throwApiError(error);
  }
}
