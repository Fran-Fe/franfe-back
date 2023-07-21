import { Router } from 'express';
import { bcd } from '../domain/googleMap/googleMapTransactionService';

let router;
export default router = Router();

router.get('/googleMap/:id', (req) => {
  const requestUuid = req.query.uuid;
  const response = bcd(req);
  response.json(response);
});

router.post('/googleMap/:id', (req) => {
  const requestUuid = req.query.uuid;
  /* #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Informações do usuário',
          schema: { $ref: "#/definitions/AddUser" }
   } */
  const request = req.body;
  const response = bcd(req);
  response.json(response);
});
