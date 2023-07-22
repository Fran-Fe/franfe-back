import { Router } from 'express';
import {
  getPlaceIdsTransactionService
} from '../domain/getPlaceIds/getPlaceIdsTransactionService.js';

export const router = Router();
router.get('/get/place_id', async (req, res) => {
  const response = await getPlaceIdsTransactionService();

  res.json(response);
});
