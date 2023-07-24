import { Router } from 'express';
import { getCafeDetailInfo } from "../../domain/cafe/cafeTransactionService.js";
import PathParameterIsRequiredError from "../../errors/PathParameterIsRequiredError.js";
import QueryParameterIsRequiredError from "../../errors/QueryParameterIsRequiredError.js";

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
router.get('/:cafeUuid', async (req, res, next) => {
  if (!req.params.cafeUuid) {
    throw new PathParameterIsRequiredError(['cafeUuid']);

  } else if (!req.query.isWin) {
    throw new QueryParameterIsRequiredError(['isWin']);
  }

  try {
    const response = await getCafeDetailInfo(req.params.cafeUuid, req.query.isWin);

    res.json(response);
  } catch (error) {
    next(error);
  }
});
