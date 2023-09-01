import { Router } from 'express';
import { chooseAsCompare, getRankings } from "../../domain/cafe/clickCount/cafeClickCountTransactionService.js";
import PathParameterIsRequiredError from "../../errors/pathParameterIsRequiredError.js";

export const router = Router();

/**
 * @swagger
 * paths:
 *   /cafe/rankings:
 *     get:
 *       security:
 *         - securityToken: []
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
 *                             cafeName:
 *                               type: string
 *                             imageUrl:
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
 *                             cafeName:
 *                               type: string
 *                             imageUrl:
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

/**
 * @swagger
 * paths:
 *   /cafe/rankings/compare:
 *     post:
 *       security:
 *         - securityToken: []
 *       summary: Post about compare ranking for front
 *       tags: [CafeRankings]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cafeUuids:
 *                   type: array
 *                   items:
 *                     type: string
 *       responses:
 *         '200':
 *           description: Successful response
 */

router.post('/compare', async (req, res, next) => {
  try {
    if (!req.body.cafeUuids) {
      throw new PathParameterIsRequiredError(['cafeUuids']);
    }

    await chooseAsCompare(req.body.cafeUuids);

  } catch (error) {
    next(error);
  }
});

