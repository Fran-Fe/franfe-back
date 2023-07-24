import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/connection.js";

export const CafeReview = sequelize.define("cafe_hashtags", {
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
  authorName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'author_name'
  },
  rating: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: false,
  },
  relativeTimeDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

export function findAllByCafeUuid(cafeUuid) {
  return CafeReview.findAll({
    where: {
      cafeUuid: cafeUuid,
    }
  });
}
