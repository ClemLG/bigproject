import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import secrets from '../config/secrets'

// Import du model user
import User from '../models/userModel'

// Implementation des routes

//Créer un compte
exports.register = (req, res) => {
    //Récuperation des données des champs du formulaire envoyé dans la requete par l'utlisateur
    const requestPayload = req.body

    //Verification de la conformité des données
    //Vérification de la présence des champs obligatoires
    if (
        requestPayload.username === undefined
        || requestPayload.email === undefined
        || requestPayload.password === undefined
    ) {
        return res.status(400).json({error: 'missing fields'})
    }
    //Vérification du format/TYPE de chaque champs
    if (
        typeof requestPayload.username !== "string"
        || requestPayload.username.length > 255
        || requestPayload.username.length === 0
    ) {
        throw "Invalid username"
    }

    if (
        typeof requestPayload.email !== "string"
        || requestPayload.email.length > 255
        || requestPayload.email.length === 0
        || requestPayload.email.match(/^[\w\.]+@(dualz+\.)+[fr]{2,4}$/g) === null
    ) {
        throw "Invalid email"
    }

    if (
        typeof requestPayload.password !== "string"
        || requestPayload.password.length > 255
        || requestPayload.password.length < 4
    ) {
        throw "Invalid password"
    }


    //Enregistrement d'un nouvel user dans la table "users"
    return User.create({
        email: `${requestPayload.email}`,
        password: bcrypt.hashSync(`${requestPayload.password}`, 10),
        username: `${requestPayload.username}`
    })
        .then((user) => res.status(201).send(user),
            console.log('Utilisateur créé'))
        .catch(error => res.status(400).json({error}))
}

// Connexion
exports.login = (req, res) => {
    const requestPayload = req.body
    // Récupération de l'utlisateur dans la base de données
    User.findOne({
        where: {
            email: requestPayload.email
        }
    })
        .then(user => {
            // Si l'utilisateur n'existe pas dans la base de données, on retourne une erreur 401 avec un objet JSON
            if (!user) {
                return res.status(401).json({error: 'User not found !'})
            }
            // Si on trouve l'utilisateur, on compare le mot de passe envoyé par l'utilisateur qui veut se connecter avec le hash enregistré
            let passwordIsValid = bcrypt.compareSync(
                requestPayload.password,
                user.password
            )
            // Si mot de passe incorrect on renvoi un status 401 avec message au serveur
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password !"
                })
            }

            // Sinon on renvoi un status 200 OK avec un objet JSON qui contient l'identifiant de l'utilisateur dans la base ainsi qu'un token
            let token = jwt.sign(
                {
                    id: user.id,
                    isAdmin: user.isAdmin
                },
                //SecretOrPublicKey
                secrets.jwtSecret,
                {expiresIn: "24h"}
            )

            res.status(200).json({
                accessToken: token,
                user: user
            })

        })
        .catch(err => {
            res.status(500).send({message: err.message})
        })
}