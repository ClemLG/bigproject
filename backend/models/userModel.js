import {DataTypes} from 'sequelize'
import sequelize from '../config/db.js'
import Event from './eventModel.js'
import Match from "./matchModel.js";

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
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        token: {
            type: DataTypes.CHAR(255),
            allowNull: false
        }
    }
)

User.associate = () => {
    User.hasMany(Match);
    User.belongsToMany(Event, { through: 'EventUser' });
};

export default User