import { Router } from 'express';
import { getAllCafes } from "../../domain/cafe/cafeTransactionService.js";

export const router = Router();

/**
 * @swagger
 * paths:
 *   /cafes:
 *     get:
 *       summary: get all cafe info for ai
 *       tags: [Cafes]
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
router.get('', async (req,res, next) => {
  try{

  const response = await getAllCafes();

  res.json(response);
  } catch (error) {
    next(error);
  }
});
