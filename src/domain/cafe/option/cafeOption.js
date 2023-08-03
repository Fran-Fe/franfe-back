import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/connection.js";

export const CafeOption = sequelize.define("cafe_options", {
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

export function findAllByCafeUuidAndOptionOnIsTrue(cafeUuid) {
  return CafeOption.findAll({
    attributes: ['cafeUuid', 'option', 'optionOn'],

    where: {
      cafeUuid: cafeUuid,
      optionOn: true
    }
  });
}


export function findOneByCafeUuid(cafeUuid) {
  return CafeOption.findAll({
    attributes: ['cafeUuid', 'option', 'optionOn'],

    where: {
      cafeUuid: cafeUuid,
    }
  });
}
