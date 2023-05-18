import {DataTypes} from 'sequelize'
import sequelize from '../config/db.js'

const Step = sequelize.define('steps',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        }
    }
)

export default Step