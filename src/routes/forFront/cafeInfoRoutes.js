import { Router } from 'express';
import { getCafeDetailInfo } from "../../domain/cafe/cafeTransactionService.js";

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

    const cafeUuid = req.query.cafeUuid;

    const response = await getCafeDetailInfo();

    res.json(response);
  } catch (error) {
    next(error);
  }
});
