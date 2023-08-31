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
  optionName: {
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

export function findAllByCafeUuidAndOptionOnIsTrue(cafeUuid) {
  return CafeOption.findAll({
    attributes: ['cafeUuid', 'optionName', 'optionOn'],

    where: {
      cafeUuid: cafeUuid,
      optionOn: true
    }
  });
}


export function findOneByCafeUuid(cafeUuid) {
  return CafeOption.findAll({
    attributes: ['cafeUuid', 'optionName', 'optionOn'],

    where: {
      cafeUuid: cafeUuid,
    }
  });
}
