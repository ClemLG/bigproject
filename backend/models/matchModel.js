import {DataTypes} from 'sequelize'
import sequelize from '../config/db.js'
import stepModel from "./stepModel.js";

const Match = sequelize.define('match',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        scoreJ1: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        scoreJ2: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    })

export default Match