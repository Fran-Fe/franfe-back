import { Router } from 'express';
import {sequelize} from '../config/connection.js';

export const router = Router();
router.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM cafes'; // 데이터베이스에서 원하는 데이터를 가져오는 SQL 쿼리
  //check wrong query that what user want
  sequelize.query(query).then(res_db => {
    console.log('Connection has been established successfully.');
    res.json(res_db[0]);
  }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
  })
});

