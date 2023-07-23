import { Router } from 'express';
import {
  getCafeLocations
} from '../../domain/getCafeLocations/getCafeLocationTransactionService.js';
import { CafeLocationDto } from '../dtos/cafeLocationDto.js';

export const router = Router();

router.get('/cafeLocation',(req,res) => {
  const request = new CafeLocationDto.Request(req.query);
  const response = getCafeLocations(request);

  res.json(response);
})

