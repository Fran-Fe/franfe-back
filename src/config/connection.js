import { Sequelize } from 'sequelize';
import ApiError from "../errors/apiError.js";
import { logger } from "../logger/winston.js";

export const sequelize = new Sequelize(
  'franfe',
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    logging: (sql, options) => {
      logger.debug(sql);
    },
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    define: {
      timestamps: false,
    },
  },
);

export function connect() {
  sequelize.authenticate().then(() => {
    logger.info('Connection has been established successfully.');
  }).catch((error) => {
    throw new ApiError(error.message);
  });
}
