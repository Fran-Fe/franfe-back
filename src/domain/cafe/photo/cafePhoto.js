import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/connection.js";

export const CafePhotoS3 = sequelize.define("cafe_photos_s3", {
  bucketUrl: {
    type: DataTypes.STRING,
    unique: true
  },
  cafeUuid: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'cafe_uuid'
  },
}, {
  timestamps: false,
  underscored: true,
  tableName: 'cafe_photos_s3',
});

export function findAllByCafeUuid(cafeUuid) {
  return CafePhotoS3.findAll({
    attributes: ['bucketUrl', 'cafeUuid'],

    where: {
      cafeUuid: cafeUuid,
    }
  });
}
