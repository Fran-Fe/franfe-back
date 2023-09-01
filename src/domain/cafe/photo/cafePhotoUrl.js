import { DataTypes, Op } from "sequelize";
import { sequelize } from "../../../config/connection.js";
import { page } from "../../../utils/pageable.js";

export const CafePhotoUrl = sequelize.define("cafe_photo_urls", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cafeUuid: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'cafe_uuid'
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 4,
    field: 'category_id'
  }
}, {
  timestamps: false,
  underscored: true,
});

export function findAll() {
  return CafePhotoUrl.findAll({
    where: {
      categoryId: {
        [Op.not]: 4
      }
    }
  });
}

export function findAllByCafeUuid(cafeUuid) {
  return CafePhotoUrl.findAll({
    where: {
      cafeUuid: cafeUuid,
      categoryId: {
        [Op.not]: 4
      }
    }
  });
}

export function findAllGalleryPageableByCategory(category, req) {
  const {offset, limit} = page(req)

  return CafePhotoUrl.findAll({
    where: {
      categoryId: category
    },
    order: [
      ['id', 'ASC']
    ],
    offset: offset,
    limit: limit
  });
}

export function findAllGalleryPageable(req) {
  const {offset, limit} = page(req)

  return CafePhotoUrl.findAll({
    where: {
      categoryId: {
        [Op.not]: 4
      }
    },
    order: [
      ['id', 'ASC']
    ],
    offset: offset,
    limit: limit
  });
}

export function findOneInteriorPhotoByCafeUuid(cafeUuid) {
  return CafePhotoUrl.findOne({
    where: {
      cafeUuid: cafeUuid,
      categoryId: 3
    }
  });
}

