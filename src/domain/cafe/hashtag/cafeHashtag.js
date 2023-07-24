import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/connection.js";

export const CafeHashtag = sequelize.define("cafe_hashtags", {
  cafeUuid: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'cafe_uuid'
  },
  hashtag: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export function findAllByCafeUuid(cafeUuid) {
  return CafeHashtag.findAll({
    where: {
      cafeUuid: cafeUuid,
    }
  });
}
