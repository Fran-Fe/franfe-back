import { Router } from 'express';
import { transactioinGoogleAPI } from '../domain/googleAPI/googleAPITransactionService.js';

export const router = Router();
router.get('/api/data', async (req, res) => {
  const response = await transactioinGoogleAPI(req)
    .then((data) => {
      return data;
    })

  res.json(response);
});

