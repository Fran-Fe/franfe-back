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
});

export function findAllByCafeUuid(cafeUuid) {
  return CafeOption.findAll({
    where: {
        cafeUuid: cafeUuid,
    }
  });
}
