import {User} from "./user.js";
import {sequelize} from "../config/connection.js";
import {ApiError} from "../errors/apiError.js";

export async function createUser(firstName ,age ) {
    await sequelize.sync();
    try {
        const res = await User.create({
            firstName: firstName,
            age: age
        });
        console.log("user created");
        return res;
    } catch (err) {
        throw new ApiError("user not created");
    }
}

