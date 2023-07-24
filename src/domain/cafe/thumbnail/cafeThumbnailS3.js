import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/connection.js";

export const CafeThumbnailS3 = sequelize.define("cafe_hashtags", {
  bucketUrl: {
    type: DataTypes.STRING,
    unique: true
  },
  cafeUuid: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'cafe_uuid'
  },
  category: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: false,
  underscored: true,
});

export function findAllByCafeUuid(cafeUuid) {
  return CafeThumbnailS3.findAll({
    attributes: ['bucketUrl', 'cafeUuid', 'category'],

    where: {
      cafeUuid: cafeUuid,
    }
  });
}
