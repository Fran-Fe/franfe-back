import Router from "express";
import {createUser} from "../domain/userService.js";
import {ApiError} from "../errors/apiError.js";


export const router = Router();

router.get('', async function (req, res, next) {
  try {
    const created = await createUser("firstname" );
    res.send('ok');
  } catch (e) {
    // throw new ApiError(e.message);
  }
})
router.post('', async function (req, res, next) {
  try {
    const created = await createUser("firstname", 3);
    console.log(created.uuid);
    res.send('ok');
  } catch (e) {
    throw new ApiError(e.message);
  }
})
