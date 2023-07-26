import { Router } from 'express';
import { chooseAsCompare } from "../../domain/cafe/clickCount/cafeClickCountTransactionService.js";
import PathParameterIsRequiredError from "../../errors/PathParameterIsRequiredError.js";
import QueryParameterIsRequiredError from "../../errors/QueryParameterIsRequiredError.js";

export const router = Router();

/**
 * @swagger
 * paths:
 *   /cafe-infos:
 *     get:
 *       summary: get all cafe rankings for front
 *       tags: [CafeInfo]
 *       parameters:
 *         - in: query
 *           name: isWin
 *           description: is front calling this api after user choose as win? true -> 1, false -> 0
 *           required: true
 *           schema:
 *             type: string
 *         - in: path
 *           name: cafeUuid
 *           description: cafe uuid
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         "200":
 *           description: detail info about cafe.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   uuid:
 *                     type: integer
 *                   address:
 *                     type: string
 *                   lat:
 *                     type: number
 *                   lng:
 *                     type: number
 *                   placeName:
 *                     type: string
 *                   overView:
 *                     type: string
 *                   rating:
 *                     type: number
 *                   options:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         option:
 *                           type: string
 *                         optionOn:
 *                           type: boolean
 *                   hashtags:
 *                     type: array
 *                     items:
 *                       type: string
 *                   reviews:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         authorName:
 *                           type: string
 *                         rating:
 *                           type: number
 *                         relativeTimeDescription:
 *                           type: string
 *                         text:
 *                           type: string
 *                   thumbnailS3List:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         bucketUrl:
 *                           type: string
 *                         category:
 *                           type: integer
 *
 */
router.post('', async (req, res, next) => {
  try {
    if (!req.body.cafeUuids) {
      throw new PathParameterIsRequiredError(['cafeUuids']);
    }

    const response = await chooseAsCompare(req.body.cafeUuids);

    res.json(response);
  } catch (error) {
    next(error);
  }
});
