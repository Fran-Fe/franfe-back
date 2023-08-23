import { Router } from 'express';
import { getAllCafesPhotos } from "../../domain/cafe/photo/cafePhotoUrlTransactionService.js";

export const router = Router();

/**
 * @swagger
 * paths:
 *   /cafes/photos:
 *     get:
 *       summary: get all photo urls for each cafes for ai
 *       tags: [Cafes]
 *       responses:
 *         "200":
 *           description: A list of cafes.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     url:
 *                       type: string
 *
 */
router.get('/photos', async (req, res, next) => {
    try {
      const response = await getAllCafesPhotos();

      res.json(response);

    } catch (error) {
      next(error);
    }
  }
);
