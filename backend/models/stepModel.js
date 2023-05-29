import {DataTypes} from 'sequelize'
import sequelize from '../config/db.js'
import Match from "./matchModel.js";
import Event from "./eventModel.js"

const Step = sequelize.define('step',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        level: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
)

Step.associate = () => {
    Step.belongsTo(Event);
    Step.hasMany(Match);
};


export default Step
