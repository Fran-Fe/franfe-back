import { Router } from 'express';
import { getAllCafesPhotos, updatePhotoCategoryId } from "../../domain/cafe/photo/cafePhotoUrlTransactionService.js";
import BodyIsRequiredError from "../../errors/bodyIsRequiredError.js";

export const router = Router();

/**
 * @swagger
 * paths:
 *   /cafes/photos:
 *     get:
 *       summary: post all photo urls for each cafes for ai
 *       tags: [Cafes]
 *       responses:
 *         "200":
 *           description: A list of cafes with photo URLs.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     cafeUuid:
 *                       type: string
 *                     photos:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           url:
 *                             type: string
 *
 * */

router.get('/photos', async (req, res, next) => {
    try {
      const response = await getAllCafesPhotos();

      res.json(response);

    } catch (error) {
      next(error);
    }
  }
);


/**
 * @swagger
 * paths:
 *   /cafes/photos:
 *     post:
 *       summary: get all photo urls for each cafes for ai
 *       tags: [Cafes]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   urlId:
 *                     type: integer
 *                   categoryId:
 *                     type: integer
 *       responses:
 *         "200":
 *           description: post categoryId successfully.
 *
 */
router.post('/photos', async (req, res, next) => {
    try {
      if (!req.body) {
        throw new BodyIsRequiredError('body is empty');
      }

      await updatePhotoCategoryId(req.body);

    } catch (error) {
      next(error);
    }
  }
);
