import Router from "express";
import {createUser} from "../domain/userService.js";
import {ApiError} from "../errors/apiError.js";
import {UserDto} from "./dtos/userDto.js";


export const router = Router();

router.get('', async function (req, res, next) {
  try {
    const created = await createUser("firstname" );
    res.json(new UserDto.Request());
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
