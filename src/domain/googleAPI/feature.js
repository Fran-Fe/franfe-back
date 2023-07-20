import express from 'express';
import mysql from 'mysql2';
import { sequelize } from '../../config/connection.js';

const app = express();
const connection = sequelize.connect();

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the database!');
});

// API 엔드포인트 구현
