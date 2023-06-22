import {DataTypes} from 'sequelize'
import sequelize from '../config/db.js'

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

import Match from "./matchModel.js";

Step.hasMany(Match, {onDelete: 'CASCADE'});
Match.belongsTo(Step);
export default Step