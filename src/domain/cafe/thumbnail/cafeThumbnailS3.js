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
});

export function findAllByCafeUuid(cafeUuid) {
  return CafeThumbnailS3.findAll({
    where: {
      cafeUuid: cafeUuid,
    }
  });
}
