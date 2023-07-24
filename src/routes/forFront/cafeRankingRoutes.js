import { Router } from 'express';
import { getRankings } from "../../domain/cafeRanking/cafeClickCountTransactionService.js";

export const router = Router();

/**
 * @swagger
 * paths:
 *   /cafe-rankings:
 *     get:
 *       summary: get all cafe rankings for front
 *       tags: [CafeRankings]
 *       responses:
 *         "200":
 *           description: Lists of Cafe Rankings.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   userComparisonRank:
 *                     type: object
 *                     properties:
 *                       list:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             rank:
 *                               type: integer
 *                             cafeUuid:
 *                               type: string
 *                   userCompareWinRank:
 *                     type: object
 *                     properties:
 *                       list:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             rank:
 *                               type: integer
 *                             cafeUuid:
 *                               type: string
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
