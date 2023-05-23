//Import du package JsonWebToken pour l'attribut de token aux requêtes
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from "../models/userModel.js";

dotenv.config()

//On exporte le middleware d'authentification
module.exports = async (req, res, next) => {
    console.log('Je passe par le middleware auth')
    try {
        //On récupère le token en le séparant du bearer dans "authorization", au cas echeant dans les cookies
        const token = req.headers.authorization.split(' ')[1] || req.cookies.token

        // On vérifie le token
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)

        //  req.auth = {userId}
        // Si il y a un userId dans la requete, on verifie qu'il correspond bien à celui du token
        const user = await User.findOne({token: token})
        if (user !== null && user.username === decodedToken.username) {
            //Si ok, on appelle 'next' car il s'agit d'un middleware donc on peut passer la requete au prochain middleware
            req.user = user
            next()
        } else {
            throw new Error()
        }
    } catch (error) {
        res.status(401).json({error: error | 'Requête non authentifiée !'})
    }
}