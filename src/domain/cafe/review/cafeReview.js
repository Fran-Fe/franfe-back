import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/connection.js";

export const CafeReview = sequelize.define("cafe_reviews", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  cafeUuid: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'cafe_uuid'
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
  underscored: true,
});

export function findAllByCafeUuid(cafeUuid) {
  return CafeReview.findAll({
    attributes:['id', 'cafeUuid', 'text'],
    where: {
      cafeUuid: cafeUuid,
    }
  });
}

export function findAll() {
  return CafeReview.findAll({
  })
}
