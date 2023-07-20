import { Router } from "express";
import { bcd } from "../domain/googleMap/googleMapTransactionService.js";

export const router = Router();

router.get('/googleMap', (req, res) => {
  const response = bcd(req);

  res.json('Hello World!');
});