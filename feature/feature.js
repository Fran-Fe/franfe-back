import express from "express";
import mysql from "mysql2";
import {port} from "./config.js";

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
app.get('/api/data', (req, res) => {
    const query = 'SELECT * FROM your_table_name'; // 데이터베이스에서 원하는 데이터를 가져오는 SQL 쿼리
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query: ', err);
            res.status(500).json({ error: 'Error fetching data from the database' });
        } else {
            res.json(results); // 데이터베이스에서 가져온 결과를 프론트엔드에 응답으로 보냄
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
