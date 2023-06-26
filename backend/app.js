import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()


import db from './config/db.js';

//Import des routes
import authRoute from './routes/authRoute.js';
import eventRoute from './routes/eventRoute.js';
import userRoute from './routes/userRoute.js';
import matchRoute from "./routes/matchRoute.js";

//Import du middleware d'authentification
import authMiddleware from './middlewares/authMiddleware.js'
import {activate} from "./controllers/authController.js";

// Appel de la méthode "express" pour créer l'application
const app = express();

// Creation du middleware pour accèder au corps de la requête
app.use(express.json());

//Utilisation du gestionnaire de cookies
app.use(cookieParser());

//Configuration du port du serveur
const port = process.env.PORT || 7000;

// MIDDLEWARE CORS HEADER
app.use('/api', (req, res, next) => {
    const origin = req.headers.origin;
    res.set({
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type, *"
    })
    next();
});

//Utilisation des routes
app.all('/api/*', authMiddleware)
app.get('/activate', activate)
app.use('/api/auth', authRoute);
app.use('/api/event', eventRoute);
app.use('/api/user', userRoute);
app.use('/api/match', matchRoute);

// Ecoute du port serveur et synchronisation bdd
app.listen(port, () => {
    // Enregistrement et synchronisation avec la base de données
    db.sync()
        .then(() => console.log('Connexion à la base de données MariaDB réussie !'))
        .catch((error) => console.log('Connexion à la base de données MariaDB échouée !' + error));
});

export default app;