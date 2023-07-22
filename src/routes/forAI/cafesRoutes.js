import { Router } from 'express';
import { getAllCafes } from "../../domain/cafe/cafeTransactionService.js";

/**
 * @swagger
 * tags:
 *  name: Cafes
 *  description: Cafe API
 */
export const router = Router();

/**
 * @swagger
 * paths: /cafes:
 *  get:
 *    summary: get all cafe info for ai
 *    tags: [Cafes]
 *    responses:
 *      "200":
 *        description: A list of cafes.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              properties:
 *                uuid:
 *                  type: string
 *                address:
 *                  type: string
 *                 placeName:
 *                   type: string
 *
 */
router.get('', (req) => {
  const response = getAllCafes();
  response.json(response);

});
