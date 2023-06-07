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

export default Event
