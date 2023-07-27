import { sequelize } from '../../config/connection.js';
import { Log } from './log.js';
import { throwApiError } from '../../errors/apiError.js';
export async function postUserLogs(req){
  let transaction;
  try{
    transaction = await sequelize.transaction();

    const logs = await Log.create(req.body);


  }catch (error){
    throwApiError(error);
  }
}
