import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/connection.js';

export const Log = sequelize.define('logs', {
  ip: {
    type : DataTypes.STRING,
    allowNull : false,
  },
  log: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  }
});

