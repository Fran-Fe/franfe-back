import { Router } from 'express';
import { getCafeLocations } from '../../domain/getCafeLocations/getCafeLocationTransactionService.js';
import { CafeLocationDto } from '../dtos/cafeLocationDto.js';
import QueryParameterIsRequiredError from "../../errors/QueryParameterIsRequiredError.js";

export const router = Router();

/**
 * @swagger
 * paths:
 *   /cafe/location:
 *     get:
 *       summary: get cafe info for front
 *       tags: [cafeLocation]
 *       parameters:
 *         - in: path
 *           name: userLat
 *           description: is user current Latitude
 *           required: true
 *           schema:
 *             type: string
 *         - in: path
 *           name: userLng
 *           description: is user current Longitude
 *           required: true
 *           schema:
 *             type: string
 *         - in: path
 *           name: distance
 *           description: is for detecting around distance as meter
 *           schema:
 *             type: string
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
 *                     uuid:
 *                       type: string
 *                     address:
 *                       type: string
 *                     placeName:
 *                       type: string
 *                     rating:
 *                       type: number
 *                     reviewCount:
 *                       type: number
 *                     thumbnails:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           category:
 *                             type: integer
 *                           bucketUrl:
 *                             type: string
 *                     hashTags:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           hashtag:
 *                             type: string
 *
 *
 *
 */

router.get('', async (req, res, next) => {
  try {

    if (!req.query.userLat || !req.query.userLng) {
      throw new QueryParameterIsRequiredError(['userLat', 'userLng', 'distance']);
    }

    const request = new CafeLocationDto.Request(req.query);
    const response = await getCafeLocations(request);

    res.json(response);
  } catch (e) {
    next(e);
  }
})
