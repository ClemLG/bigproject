//Import du package JsonWebToken pour l'attribut de token aux requêtes
import jwt from 'jsonwebtoken'
import User from "../models/userModel.js";

//On exporte le middleware d'authentification
export default async function (req, res, next) {
    console.log('Je passe par le middleware auth')

    //On récupère le token en le séparant du bearer dans "authorization", au cas echeant dans les cookies
    const token = req.headers?.authorization?.split(' ')[1] || req?.cookies?.Authentification
    console.log(token)
    if (!token) {
        res.status(401).json({message: "Vous devez être connecté"})
        return
    }

    // On vérifie le token
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)

    // Si il y a un userId dans la requete, on verifie qu'il correspond bien à celui du token
    const user = await User.findOne({token: token})
    if (user !== null && user.username === decodedToken.username) {
        if (!user.isActive) {
            res.status(401).json({error: error | 'Utilisateur non actif, voir mail'})
            return
        }
        //Si ok, on appelle 'next' car il s'agit d'un middleware donc on peut passer la requete au prochain middleware
        req.user = user
        next()
    } else {
        res.status(401).json({error: error | 'Requête non authentifiée !'})
    }
}