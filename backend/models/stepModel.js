import Sequelize, {DataTypes} from 'sequelize'
import sequelize from '../config/db.js'
import eventModel from "./eventModel.js";

const Step = sequelize.define('step',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        level: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
)

export default Step
