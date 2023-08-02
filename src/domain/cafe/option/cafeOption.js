import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/connection.js";

export const CafeOption = sequelize.define("cafe_options", {
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
  option: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  optionOn: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'option_on',
    defaultValue: false,
  },
}, {
  timestamps: false,
  underscored: true,
});

export function findAllByCafeUuid(cafeUuid) {
  return CafeOption.findAll({
    attributes: ['cafeUuid', 'option', 'optionOn'],

    where: {
      cafeUuid: cafeUuid,
    }
  });
}
