import { Router } from 'express';
import { getCafePlaceIds } from '../domain/getPlaceIds/getPlaceIdsService.js';
import {
  getPlaceIdsTransactionService
} from '../domain/getPlaceIds/getPlaceIdsTransactionService.js';
export const router = Router();
router.get('/get/place_id', async (req,res) => {
  const response = await getPlaceIdsTransactionService();
  res.json(response);
})
