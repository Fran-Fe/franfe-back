import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/connection.js";

export const CafeHashtag = sequelize.define("cafe_hashtags", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  cafeUuid: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'cafe_uuid'
  },
  hashtag: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
  underscored: true,
});

export function findAllByCafeUuid(cafeUuid) {
  return CafeHashtag.findAll({
    attributes: ['cafeUuid', 'hashtag'],

    where: {
      cafeUuid: cafeUuid,
    }
  });
}
