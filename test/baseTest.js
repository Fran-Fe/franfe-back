import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import * as fs from "fs";
import Sequelize from 'sequelize';

chai.use(chaiHttp);

const sql_string = fs.readFileSync("/db/app_migration.sql", 'utf-8');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  port: 33060,
  dialect: 'mysql',
})

export function resetTestDb() {
  sequelize.query(sql_string);
}
