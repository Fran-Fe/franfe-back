import { Router } from 'express';
import { getAllCafes } from "../../domain/cafe/cafeTransactionService.js";


export const router = Router();

router.get('', (req) => {
  const response = getAllCafes();
  response.json(response);
});
