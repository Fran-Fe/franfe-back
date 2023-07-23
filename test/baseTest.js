import chai from "chai";
import chaiHttp from "chai-http";
import * as fs from "fs";
import Sequelize from 'sequelize';

chai.use(chaiHttp);

const drop_tables_sql_string = fs.readFileSync("test/db/drop_tables.sql", 'utf-8').toString();
const create_tables_sql_string = fs.readFileSync("test/db/app_migration.sql", 'utf-8').toString();

const sequelize = new Sequelize('franfe', 'root', '1234', {
  host: 'localhost',
  port: 33070,
  dialect: 'mysql',
})

export async function resetTestDb() {
  try {
    await dropTables(drop_tables_sql_string);
    await createTables(create_tables_sql_string);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    sequelize.close();
  }

}

async function dropTables(drop_tables_sql_string) {
  for (const drop_table_sql of drop_tables_sql_string.split('\n')) {
    if (!drop_table_sql){
      break;
    }

    await sequelize.query(drop_table_sql);
  }
}

async function createTables(create_tables_sql_string) {
  for (const create_table_sql of create_tables_sql_string.split('\n\n')) {
    if (!create_table_sql){
      break;
    }

    await sequelize.query(create_table_sql.replace('\n', ' '));
  }
}
