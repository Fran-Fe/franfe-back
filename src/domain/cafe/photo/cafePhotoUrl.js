import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/connection.js";

export const CafePhotoUrl = sequelize.define("cafe-photo-urls", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cafeUuid: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'cafe_uuid'
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: false,
  underscored: true,
});

export function findAll() {
  return CafePhotoUrl.findAll();
}
