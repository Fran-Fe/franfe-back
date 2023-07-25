import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/connection.js';

export const logStatement = sequelize.define('logs')
