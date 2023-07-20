import { GoogleMapDto } from "../../routes/dtos/googleMapDtos.js";
import { abc } from "./googleMapService.js";
import { sequelize } from "../../config/connection.js";
import ApiError from "../../errors/apiError.js";

export async function bcd(request) {
  let transaction;
  try {

    transaction = await sequelize.transaction();
    const res = abc(request);

    await transaction.commit();

    return new GoogleMapDto.Response();

  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(error.message);
  }
}
