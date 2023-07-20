import { Router } from 'express';
import { bcd } from '../domain/googleMap/googleMapTransactionService';

let router;
export default router = Router();

router.get('/googleMap', (req) => {
  const response = bcd(req);
  response.json(response);
});
