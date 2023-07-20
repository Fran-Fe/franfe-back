import chai from "chai";
import chaiHttp from "chai-http";
import * as fs from "fs";
import Sequelize from 'sequelize';

chai.use(chaiHttp);

const drop_tables_sql_string = fs.readFileSync("test/db/drop_tables.sql", 'utf-8');
const create_tables_sql_string = fs.readFileSync("test/db/app_migration.sql", 'utf-8');

const sequelize = new Sequelize('franfe', 'root', '1234', {
  host: 'localhost',
  port: 33070,
  dialect: 'mysql',
})

export async function resetTestDb() {
  try{
    await sequelize.query(drop_tables_sql_string);
    await sequelize.query(create_tables_sql_string);
  } catch (error) {
    console.error(error);
  }  finally {
    sequelize.close();
  }

}
