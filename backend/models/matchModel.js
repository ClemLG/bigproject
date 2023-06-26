import {DataTypes} from 'sequelize'
import sequelize from '../config/db.js'

const Match = sequelize.define('match',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        u1score1: {
            type: DataTypes.INTEGER
        },
        u1score2: {
            type: DataTypes.INTEGER
        },
        u2score1: {
            type: DataTypes.INTEGER
        },
        u2score2: {
            type: DataTypes.INTEGER
        },
        isDone: {
            type: DataTypes.VIRTUAL,
            get() {
                return this.u1score1 && this.u1score2 && this.u2score1 && this.u2score2
                    && this.u1score1 === this.u2score1 && this.u1score2 === this.u2score2
                    && this.u1score1 !== this.u1score2;
            },
            set() {
                throw new Error('Do not try to set the `isDone` value!');
            }
        }
    })


import User from "./userModel.js";

Match.belongsTo(User, {as: 'player1'});
Match.belongsTo(User, {as: 'player2'});
export default Match