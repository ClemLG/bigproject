import express from 'express';
import db from './config/db.js';
import dotenv from 'dotenv'

//Import des routes
import authRoute from './routes/authRoute.js';


dotenv.config()

// Appel de la méthode "express" pour créer l'application
const app = express();

// Creation du middleware pour accèder au corps de la requête
app.use(express.json());

const port = process.env.PORT || 7000;

console.log(port)

// MIDDLEWARE CORS HEADER
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Utilisation des routes
app.use('/api/auth', authRoute);

// Ecoute du port serveur
app.listen(port, () => {
    // Enregistrement et synchronisation avec la base de données
    db.sync()
        .then(() => console.log('Connexion à la base de données MariaDB réussie !'))
        .catch((error) => console.log('Connexion à la base de données MariaDB échouée !' + error));
});

export default app;