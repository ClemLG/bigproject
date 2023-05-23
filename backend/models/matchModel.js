import {DataTypes} from 'sequelize'
import sequelize from '../config/db.js'
import Step from "./stepModel.js";

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
        },
    }
)


Match.belongsTo(Step)

export default Match