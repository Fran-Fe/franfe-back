import { Router } from 'express';
import { getRankings } from "../../domain/cafeRanking/cafeClickCountTransactionService.js";

/**
 * @swagger
 * tags:
 *  name: Cafes For AI
 *  description: Cafe API
 */
export const router = Router();

/**
 * @swagger
 * paths:
 *   /cafes:
 *     get:
 *       summary: get cafe ranking info for front
 *       tags: [CafeRankings]
 *       responses:
 *         "200":
 *           description: A list of cafes.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 properties:
 *                   uuid:
 *                     type: string
 *                   address:
 *                     type: string
 *                   placeName:
 *                     type: string
 *                 example:
 *                   [
 *                     {"uuid": "uuid1", "address": "address1", "placeName": "placeName1"},
 *                     {"uuid": "uuid2", "address": "address2", "placeName": "placeName2"},
 *                   ]
 *
 */
router.get('', async (req,res, next) => {
  try{

    const response = await getRankings();

    res.json(response);
  } catch (error) {
    next(error);
  }
});
