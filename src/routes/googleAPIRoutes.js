import { Router } from 'express';
import { transactionGoogleAPI } from '../domain/googleAPI/googleAPITransactionService.js';

export const router = Router();


//Get Image Data
router.get('/api/getImagedata', async (req, res) => {
  const response = await transactionGoogleAPI(req)
    .then((data) => {
      return data;
    })
  res.json(response);
});

