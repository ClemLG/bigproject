import {DataTypes} from 'sequelize'
import sequelize from '../config/db.js'
import eventModel from "./eventModel.js";

const User = sequelize.define('user',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        token: {
            type: DataTypes.CHAR(255)
        }
    }
)

export default User