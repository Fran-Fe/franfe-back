import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/connection.js';

export const CafeInfo = sequelize.define('cafes', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lat: {
    type: DataTypes.DECIMAL(10, 7),
    allowNull: false,
    defaultValue: 55,
  },
  lng: {
    type: DataTypes.DECIMAL(10, 7),
    allowNull: false,
    defaultValue: 55,
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
});

export function findByPosition(userLat,userLng, distance) {
  return CafeInfo.findAll({
    where: sequelize.literal(`ST_Distance_Sphere(POINT(lng, lat), POINT(${userLng},${userLat})) <= ${distance}`
    )
  });
}
