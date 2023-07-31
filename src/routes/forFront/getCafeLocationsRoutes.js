import { Router } from 'express';
import {
  getCafeLocations
} from '../../domain/getCafeLocations/getCafeLocationTransactionService.js';
import { CafeLocationDto } from '../dtos/cafeLocationDto.js';

export const router = Router();

/**
 * @swagger
 * paths:
 *   /cafes:
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
 *        - in: path
 *          name: userLng
 *          description: is user current Longitude
 *          required: true
 *          schema:
 *            type: string
 *        - in: path
 *          name: distance
 *          description: is for detecting around distance as meter
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
 *                       type: decimal
 *                     countReviews:
 *                       type: string
 *                     thumbnails:
 *                       type: array
 *                         category:
 *                           type: integer
 *                         url:
 *                           type: string
 *                     hashTags:
 *                       type: array
 *                         hashtag:
 *                           type: string
 *
 *
 *
 */

router.get('',async (req,res) => {
  const request = new CafeLocationDto.Request(req.query);
  const response = await getCafeLocations(request);

  res.json(response);
})

//swagger , next , path , error 처리 'cafeInfoRoutes' , Dto Response
