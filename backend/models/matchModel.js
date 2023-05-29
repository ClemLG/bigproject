import {DataTypes} from 'sequelize'
import sequelize from '../config/db.js'
import Step from "./stepModel.js";
import User from "./userModel.js";

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

Match.associate = () => {
    Match.belongsTo(Step);
    Match.belongsTo(User, { as: 'player1' });
    Match.belongsTo(User, { as: 'player2' });
};

export default Match