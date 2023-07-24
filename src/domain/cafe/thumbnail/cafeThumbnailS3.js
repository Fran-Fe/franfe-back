import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/connection.js";

export const CafeThumbnailS3 = sequelize.define("cafe_thumbnail_s3", {
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
  tableName: 'cafe_thumbnail_s3',
});

export function findAllByCafeUuid(cafeUuid) {
  return CafeThumbnailS3.findAll({
    attributes: ['bucketUrl', 'cafeUuid', 'category'],

    where: {
      cafeUuid: cafeUuid,
    }
  });
}
