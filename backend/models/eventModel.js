import {DataTypes} from 'sequelize'
import sequelize from '../config/db.js'

const Event = sequelize.define('event',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        nb_users: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        game: {
            type: DataTypes.STRING,
            allowNull: false
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }
)

import User from "./userModel.js";
import Step from "./stepModel.js";

Event.belongsToMany(User, {through: 'events_users'});
User.belongsToMany(Event, {through: 'events_users'});
Event.hasMany(Step, {onDelete: 'CASCADE'});
Step.belongsTo(Event);
export default Event