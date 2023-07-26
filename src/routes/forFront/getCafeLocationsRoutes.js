import { Router } from 'express';
import {
  getCafeLocations
} from '../../domain/getCafeLocations/getCafeLocationTransactionService.js';
import { CafeLocationDto } from '../dtos/cafeLocationDto.js';

export const router = Router();

router.get('/cafeLocation',async (req,res) => {
  const request = new CafeLocationDto.Request(req.query);
  const response = await getCafeLocations(request);

  res.json(response);
})

//swagger , next , path , error 처리 'cafeInfoRoutes' , Dto Response
