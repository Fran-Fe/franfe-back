import { Router } from 'express';
import { getCafeDetailInfo } from "../../domain/cafe/cafeTransactionService.js";
import PathParameterIsRequiredError from "../../errors/pathParameterIsRequiredError.js";
import QueryParameterIsRequiredError from "../../errors/queryParameterIsRequiredError.js";

export const router = Router();

/**
 * @swagger
 * paths:
 *   /cafe/infos/{cafeUuid}:
 *     get:
 *       summary: get detail cafe info for front
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
router.get('/:cafeUuid', async (req, res, next) => {
  try {
    if (!req.params.cafeUuid) {
      throw new PathParameterIsRequiredError(['cafeUuid']);

    } else if (!req.query.isWin || (req.query.isWin !== '0' && req.query.isWin !== '1')) {
      throw new QueryParameterIsRequiredError(['isWin']);
    }

    const response = await getCafeDetailInfo(req.params.cafeUuid, req.query.isWin === '1');

    res.json(response);
  } catch (error) {
    next(error);
  }
});
