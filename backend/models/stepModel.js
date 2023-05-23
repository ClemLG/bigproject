import {DataTypes} from 'sequelize'
import sequelize from '../config/db.js'
import Match from "./matchModel.js";

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

Step.hasMany(Match, { onDelete: 'CASCADE' });

export default Step