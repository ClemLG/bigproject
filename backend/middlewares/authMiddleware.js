
//Import du package JsonWebToken pour l'attribut de token aux requêtes
import jwt from 'jsonwebtoken'
import secrets from '../config/secrets.js'

//On exporte le middleware d'authentification
module.exports = (req, res, next) => {
    console.log('Je passe par le middleware auth')
    try {
        //On récupère le token en le séparant du bearer dans "authorization"
        const token = req.headers.authorization.split(' ')[1]
        console.log("Test1")
        console.log(token)

        // On vérifie le token
        const decodedToken = jwt.verify(token, secrets.jwtSecret)
        console.log("Test2")
        // Le token décodé devient un objet Javascript, on récupère donc le userId dedans
        const userId = decodedToken.id
        req.auth = {userId}
        // Si il y a un userId dans la requete, on verifie qu'il correspond bien à celui du token
        if (req.body.id && req.body.id !== userId) {
            throw 'Invalid User ID !'
        } else {
            //Si ok, on appelle 'next' car il s'agit d'un middleware donc on peut passer la requete au prochain middleware
            req.bearerToken = decodedToken
            next()
        }
    } catch (error) {
        res.status(401).json({error: error | 'Requête non authentifiée !'})
    }
}

export default authController