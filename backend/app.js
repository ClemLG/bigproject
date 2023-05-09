import express from 'express'
import db from './config/db.js'

//Import des routes
import authRoute from './routes/authRoute.js'

// Appel de la méthode "express" pour créer l'application
const app = express()


const port = process.env.PORT || 9050;

//Enregistrement et synchronisation avec la base de données
db.sync()
    .then(() => console.log('Connexion à la base de données MariaDB réussie !'))
    .catch((error) => console.log('Connexion à la base de données MariaDB échouée !' + error))

//Ecoute du port serveur
app.listen(port)

// Creation du middleware pour accèder au corps de la requête
app.use(express.json())


//MIDDLEWARE CORS HEADER
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

//Enregistrement des routes
app.use('/api/auth', authRoute)

export default app