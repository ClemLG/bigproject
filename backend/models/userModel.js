import {DataTypes} from 'sequelize'
import sequelize from '../config/db.js'

const User = sequelize.define('users',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
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
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        token: {
            type: DataTypes.CHAR(255),
            allowNull: false
        },
        salt: {
            type: DataTypes.CHAR(255),
            allowNull: false
        }
    }
)

export default User