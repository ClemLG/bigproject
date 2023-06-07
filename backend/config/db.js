import Sequelize from 'sequelize'
import Config from './config.json' assert {type: "json"}

//Configurations pour la liaison avec la base de données
const sequelize = new Sequelize(Config)

try {
    sequelize.authenticate()
    console.log('Connecté à la base de données MariaDB !')
} catch (error) {
    throw error
}

export default sequelize