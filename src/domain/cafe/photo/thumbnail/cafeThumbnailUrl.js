import { DataTypes } from "sequelize";
import { sequelize } from "../../../../config/connection.js";

export const CafeThumbnailUrl = sequelize.define("cafe_thumbnail_urls", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cafePhotoUrlId: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'cafe_photo_url_id'
  },
  category_id: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'cafe_uuid'
  },
  category: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: false,
  underscored: true,
  tableName: 'cafe_thumbnail_s3',
});

export function findAllByCafeUuid(cafeUuid) {
  return CafeThumbnailUrl.findAll({
    attributes: ['bucketUrl', 'cafeUuid', 'category'],
    where: {
      cafeUuid: cafeUuid,
    }
  });
}

export function findAll() {
  return CafeThumbnailUrl.findAll({
    attributes: ['bucketUrl', 'cafeUuid', 'category']
  });
}

export function findAllByCategoryInPagination(category, pageSize, offset) {
  return CafeThumbnailUrl.findAll({
    where: {
      category: category,
    },
    limit: pageSize,
    offset: offset
  });
}
