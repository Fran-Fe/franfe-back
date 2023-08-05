import { Router } from 'express';
import { getCafeLocations } from '../../domain/cafe/cafeTransactionService.js';
import { CafeListDto } from '../dtos/cafeListDto.js';
import QueryParameterIsRequiredError from "../../errors/QueryParameterIsRequiredError.js";

export const router = Router();

/**
 * @swagger
 * paths:
 *   /cafe/list:
 *     get:
 *       summary: get cafe info for front
 *       tags: [cafe]
 *       parameters:
 *         - in: query
 *           name: userLat
 *           description: is user current Latitude
 *           required: true
 *           schema:
 *             type: string
 *         - in: query
 *           name: userLng
 *           description: is user current Longitude
 *           required: true
 *           schema:
 *             type: string
 *         - in: query
 *           name: radius
 *           description: is for detecting around radius as meter
 *           schema:
 *             type: string
 *         - in: query
 *           name: search
 *           description: search value
 *           required: false
 *           schema:
 *             type: string
 *         - in: query
 *           name: options
 *           description: option list with string
 *           required: false
 *           schema:
 *             type: array
 *             items:
 *               type: string
 *         - in: query
 *           name: hashtags
 *           description: hashtag list with string
 *           required: false
 *           schema:
 *             type: array
 *             items:
 *               type: string
 *         - in: query
 *           name: pageNumber
 *           description: pageNumber with string
 *           required: false
 *           schema:
 *             type: string
 *         - in: query
 *           name: pageSize
 *           description: pageSize with string
 *           required: false
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

//search, hashtag, option