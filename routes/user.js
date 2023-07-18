import Router from "express";
import {createUser} from "../domain/userService.js";
import {ApiError} from "../errors/apiError.js";


export const router = Router();

router.get('', async function (req, res, next) {
  try {
    const created = await createUser("firstname" );
    console.log(created.uuid);
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
    // throw new ApiError(e.message);
  }
})
router.get('/test', function (req, res, next) {
  // throw new ApiError(400, 'This is a bad request.');
  res.send('respond with a resource');
});
