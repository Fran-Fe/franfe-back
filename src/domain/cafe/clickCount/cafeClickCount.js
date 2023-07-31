import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/connection.js";

export const CafeClickCount = sequelize.define("cafe_click_counts", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  cafeUuid: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'cafe_uuid'
  },
  userComparisonCount: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: 'user_comparison_count'
  },
  userCompareWinCount: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'user_compare_win_count'
  },
}, {
  timestamps: false,
  underscored: true,
});

export function findAll() {
  return CafeClickCount.findAll();
}

export function findOneByCafeUuid(cafeUuid) {
  return CafeClickCount.findOne({
    where: {
      cafeUuid: cafeUuid,
    }
  });
}

export function createWhenWin(cafeUuid) {
return CafeClickCount.create({
    cafeUuid: cafeUuid,
    userComparisonCount: 0,
    userCompareWinCount: 1,
  });

}

export function createWhenCompare(cafeUuid) {
  return CafeClickCount.create({
    cafeUuid: cafeUuid,
    userComparisonCount: 1,
    userCompareWinCount: 0,
  });

}
