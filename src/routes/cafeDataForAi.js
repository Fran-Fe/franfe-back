import connection, { Router } from 'express';

let router;
export default router = Router();

router.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM your_table_name'; // 데이터베이스에서 원하는 데이터를 가져오는 SQL 쿼리
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query: ', err); // eslint-disable-line no-console
      res.status(500).json({ error: 'Error fetching data from the database' });
    } else {
      res.json(results); // 데이터베이스에서 가져온 결과를 프론트엔드에 응답으로 보냄
    }
  });
});
