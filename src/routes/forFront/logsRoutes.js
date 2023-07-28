import { Router } from 'express';
import { throwApiError } from '../../errors/apiError.js';
import { postUserLogs } from '../../domain/log/logTransactionService.js';

export const router = Router();

router.post('', (req,res) => {
  try{
    postUserLogs(req);

  }catch(error){
    throwApiError(error);
  }
})
