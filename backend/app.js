import express from 'express'
import db from './config/db.js'

// Appel de la méthode "express" pour créer l'application
const app = express()

const port = process.env.PORT || 9050;

//Enregistrement et synchronisation avec la base de données
db.sync()
    .then(() => console.log('Connexion à la base de données MariaDB réussie !'))
    .catch((error) => console.log('Connexion à la base de données MariaDB échouée !' + error))

//Ecoute du port serveur
app.listen(port)

export default app