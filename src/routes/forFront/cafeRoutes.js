import { Router } from 'express';
import { getCafeLocations } from '../../domain/cafe/cafeTransactionService.js';
import { CafeListDto } from '../dtos/cafeListDto.js';
import QueryParameterIsRequiredError from "../../errors/queryParameterIsRequiredError.js";

export const router = Router();

/**
 * @swagger
 * paths:
 *   /cafe/list:
 *     get:
 *       security:
 *         - securityToken: []
 *       summary: Get cafe information for the front-end
 *       tags: [cafe]
 *       parameters:
 *         - in: query
 *           name: userLat
 *           description: User's current latitude
 *           required: true
 *           schema:
 *             type: string
 *         - in: query
 *           name: userLng
 *           description: User's current longitude
 *           required: true
 *           schema:
 *             type: string
 *         - in: query
 *           name: radius
 *           description: Radius to detect cafes around, in meters
 *           schema:
 *             type: string
 *         - in: query
 *           name: search
 *           description: Search value
 *           required: false
 *           schema:
 *             type: string
 *         - in: query
 *           name: options
 *           description: List of options as strings
 *           required: false
 *           schema:
 *             type: array
 *             items:
 *               type: string
 *         - in: query
 *           name: hashtags
 *           description: List of hashtags as strings
 *           required: false
 *           schema:
 *             type: array
 *             items:
 *               type: string
 *         - in: query
 *           name: pageNumber
 *           description: Page number as string
 *           required: false
 *           schema:
 *             type: string
 *         - in: query
 *           name: pageSize
 *           description: Page size as string
 *           required: false
 *           schema:
 *             type: string
 *       responses:
 *         "200":
 *           description: A list of cafes.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   cafeInfoList:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         uuid:
 *                           type: string
 *                         lat:
 *                           type: number
 *                         lng:
 *                           type: number
 *                         address:
 *                           type: string
 *                         placeName:
 *                           type: string
 *                         rating:
 *                           type: number
 *                         reviewCount:
 *                           type: number
 *                         thumbnails:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               category:
 *                                 type: integer
 *                               url:
 *                                 type: string
 *                         hashTags:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               hashtag:
 *                                 type: string
 *                   topCountHashtags:
 *                     type: array
 *                     items:
 *                       type: string
 */

router.get('', async (req, res, next) => {
  try {

    if (!req.query.userLat || !req.query.userLng) {
      throw new QueryParameterIsRequiredError(['userLat', 'userLng', 'radius']);
    }

    const request = new CafeListDto.Request(req.query);
    const response = await getCafeLocations(request);

    res.json(response);
  } catch (e) {
    next(e);
  }
})
