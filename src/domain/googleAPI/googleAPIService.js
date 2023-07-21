import { sequelize } from '../../config/connection.js';

export async function googleAPIService() {
  const query = 'SELECT * FROM cafes';
  try {
    let result;
    await sequelize.query(query)
      .then((data) => {
        result = data;
      });

    return result;

  } catch (error) {
    console.error('Error fetching data from the database:', error);
    throw error; // 에러를 상위 호출자로 던집니다.
  }
}
// 함수를 호출하여 데이터 가져오기
