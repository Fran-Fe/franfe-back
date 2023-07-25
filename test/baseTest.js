import chai from "chai";
import chaiHttp from "chai-http";
import * as fs from "fs";
import Sequelize from 'sequelize';

chai.use(chaiHttp);

const drop_tables_sql_string = fs.readFileSync("test/db/drop_tables.sql", 'utf-8').toString();
const create_tables_sql_string = fs.readFileSync("test/db/app_migration.sql", 'utf-8').toString();
const init_db_sql_string = fs.readFileSync("test/db/init_db.sql", 'utf-8').toString();

const sequelize = new Sequelize('franfe', 'root', '1234', {
  host: 'localhost',
  port: 33070,
  dialect: 'mysql',
})

export async function resetTestDb() {
  try {
    await dropTables(drop_tables_sql_string);
    await createTables(create_tables_sql_string);
    await initDb(init_db_sql_string);

  } catch (error) {
    console.error(error);
    throw error;
  }

}

async function initDb(init_db_sql_string) {
  await executeQuerySplitedByTwoNewLines(init_db_sql_string);
}

async function dropTables(drop_tables_sql_string) {
  await executeQuerySplitedByOneNewLines(drop_tables_sql_string);
}

async function createTables(create_tables_sql_string) {
  await executeQuerySplitedByTwoNewLines(create_tables_sql_string);
}

async function executeQuerySplitedByTwoNewLines(sql_string_list)  {
  for (const sql_string of sql_string_list.split('\n\n')) {
    if (!sql_string){
      break;
    }

    await sequelize.query(sql_string.replace('\n', ' '));
  }
}

async function executeQuerySplitedByOneNewLines(sql_string_list) {
  for (const sql_string of sql_string_list.split('\n')) {
    if (!sql_string){
      break;
    }

    await sequelize.query(sql_string.replace('\n', ' '));
  }
}