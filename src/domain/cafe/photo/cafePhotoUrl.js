import { DataTypes, Op } from "sequelize";
import { sequelize } from "../../../config/connection.js";

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
    field: 'category_id'
  }
}, {
  timestamps: false,
  underscored: true,
});

export function findAll() {
  return CafePhotoUrl.findAll();
}

export function findById(id) {
  return CafePhotoUrl.findOne({
    where: {id: id}
  });
}

export function findAllByCafeUuid(cafeUuid) {
  return CafePhotoUrl.findAll({
    where: {
      cafeUuid: cafeUuid,
      categoryId: {
        [Op.not]: 0
      }
    }
  });
}

export function findAllGalleryPageableByCategory(category, doPage, firstId, lastId) {
  const condition = {};

  if (doPage) {
    condition.id = {
      [Op.between]: [firstId, lastId]
    }
  }

  return CafePhotoUrl.findAll({
    where: {
      category: category,
    }
  });
}

export function findAllGalleryPageable(doPage, firstId, lastId) {
  const condition = {};

  if (doPage) {
    condition.id = {
      [Op.between]: [firstId, lastId]
    }
  }

  return CafePhotoUrl.findAll({
    where: {
      category: {
        [Op.not]: 0
      },
    }
  });
}

