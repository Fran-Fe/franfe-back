import { Router } from 'express';
import QueryParameterIsRequiredError from '../../errors/QueryParameterIsRequiredError.js';
import { getGalleryThumbnails } from '../../domain/cafe/gallery/galleryTransactionService.js';

export const router = Router();

router.get('',async (req,res,next) => {
  try{
    if(!req.query.pageSize || !req.query.pageNum)
      throw new QueryParameterIsRequiredError(['pageSize','pageNum']);

    const response = await getGalleryThumbnails(req);

    res.json(response);

  }catch(error){
    next(error)
  }
})


