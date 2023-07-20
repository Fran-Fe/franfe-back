import express from 'express';
import mysql from 'mysql2';

const app = express();

// 데이터베이스 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'sam',
  password: '1234',
  database: 'testDB',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the database!');
});

// API 엔드포인트 구현
