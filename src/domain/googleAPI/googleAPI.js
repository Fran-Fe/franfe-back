import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/connection.js';

export const googleAPI = sequelize.define('google-place-API',{
  place_id:{
    type: DataTypes.STRING,
    defaultValue: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

