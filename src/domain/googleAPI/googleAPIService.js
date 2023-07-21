import { sequelize } from '../../config/connection.js';
import ApiError from '../../errors/apiError.js';

export async function googleAPIService() {
  const query = 'SELECT * FROM cafes';
  try {
    let result;
    await sequelize.query(query)
      .then((data) => {
        result = data;
      });

    return result;

  } catch (error){
    if (error instanceof ApiError){
      throw error;
    }
    throw new ApiError(error.message);
  }
}
// 함수를 호출하여 데이터 가져오기
