import {DataTypes} from "sequelize";
import {sequelize} from "../config/connection.js";

export const User = sequelize.define("users", {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'first_name',
    },
    lastName: {
        type: DataTypes.STRING,
        field: 'last_name'
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
});