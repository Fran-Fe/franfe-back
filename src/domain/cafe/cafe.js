import { DataTypes, Op, Sequelize } from "sequelize";
import { sequelize } from "../../config/connection.js";
import { page } from "../../utils/pageable.js";

export const Cafe = sequelize.define("cafes", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lat: {
    type: DataTypes.DECIMAL(10, 7),
    allowNull: false,
    defaultValue: 123.1234567,
  },
  lng: {
    type: DataTypes.DECIMAL(10, 7),
    allowNull: false,
    defaultValue: 123.1234567,
  },
  placeName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'place_name'
  },
  overview: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rating: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: false,
    defaultValue: 5.0,
  }
}, {
  timestamps: false,
  underscored: true,
});

export function findAll() {
  return Cafe.findAll();
}

export function findByUuid(uuid) {
  return Cafe.findOne({
    where: {uuid: uuid}
  });
}

export function findEntityByPosition(req, userLat, userLng, distance, search) {
  const {offset, limit} = page(req)

  const condition = {};

  if (!search) {
    condition.placeName = {
      [Op.like]: `%${search}%`
    }
  }

  return Cafe.findAll({
    where: {
      [Op.and]: [
        condition,
        sequelize.literal(`ST_Distance_Sphere(POINT(lng, lat), POINT(${userLng}, ${userLat})) <= ${distance}`)
      ]
    },
    order: [
      ['id', 'ASC']
    ],
    offset: offset,
    limit: limit
  });
}
