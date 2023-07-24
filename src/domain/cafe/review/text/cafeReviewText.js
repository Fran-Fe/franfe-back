import { DataTypes } from "sequelize";
import { sequelize } from "../../../../config/connection.js";

export const CafeReviewText = sequelize.define("cafe_review_texts", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  cafeReviewId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: 'cafe_review_id'
  },
  text:  {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export function findOneByCafeReviewId(cafeReviewId) {
  return CafeReviewText.findOne({
    where: {
      cafeReviewId: cafeReviewId,
    }
  });
}
