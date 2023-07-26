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
 *
 */

router.get('',async (req,res) => {
  const request = new CafeLocationDto.Request(req.query);
  const response = await getCafeLocations(request);

  res.json(response);
})

//swagger , next , path , error 처리 'cafeInfoRoutes' , Dto Response
