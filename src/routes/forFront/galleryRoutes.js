import { Router } from 'express';
import QueryParameterIsRequiredError from '../../errors/QueryParameterIsRequiredError.js';
import { getGalleryThumbnails } from '../../domain/cafe/gallery/galleryTransactionService.js';
import { checkGalleryRequest } from '../../domain/cafe/gallery/checkGalleryReqService.js';
import { throwApiError } from '../../errors/apiError.js';

export const router = Router();
/**
 * @swagger
 * paths:
 *   /gallery:
 *     get:
 *       summary: get thumbnails by category
 *       tags: [CafeInfo]
 *       parameters:
 *         - in: query
 *           name: category
 *           description: select category what you want to get
 *           required: true
 *           schema:
 *             type: number
 *         - in: query
 *           name: pageSize
 *           description: how many data you want to get in one request
 *           required: true
 *           schema:
 *             type: number
 *         - in: query
 *           name: pageNum
 *           description: Which number are we going to start with
 *           required: true
 *           schema:
 *             type: number
 *       responses:
 *         "200":
 *           description: detail info about cafe.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   category:
 *                     type: integer
 *                   thumbnails:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         uuid:
 *                           type: string
 *                         url:
 *                           type: boolean
 *
 */
router.get('',async (req,res,next) => {
  try{
    if(checkGalleryRequest(req))
      new QueryParameterIsRequiredError(['pageSize','pageNum','category']);

    const response = await getGalleryThumbnails(req);

    res.json(response);

  }catch(error){
    next(error)
  }
})


