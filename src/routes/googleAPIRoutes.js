import { Router } from 'express';
import { transactionGoogleAPI } from '../domain/googleAPI/googleAPITransactionService.js';

export const router = Router();
router.get('/api/data', async (req, res) => {
  const response = await transactionGoogleAPI(req)
    .then((data) => {
      return data;
    })

  res.json(response);
});

