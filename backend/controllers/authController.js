import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'

dotenv.config()

// Import du model user
import User from '../models/userModel.js'

// Implementation des routes

//Créer un compte
export async function register(req, res) {
    //Récuperation des données des champs du formulaire envoyé dans la requete par l'utlisateur
    const requestPayload = req.body

    const secretKey = crypto.randomBytes(64).toString("hex")

    //Verification de la conformité des données
    //Vérification de la présence des champs obligatoires
    if (
        requestPayload.username === undefined
        || requestPayload.email === undefined
        || requestPayload.password === undefined
    ) {
        res.status(400).json({error: 'missing fields'})
        return
    }
    //Vérification du format/TYPE de chaque champs
    if (
        typeof requestPayload.username !== "string"
        || requestPayload.username.length > 255
        || requestPayload.username.length === 0
    ) {
        res.status(400).json({error: 'invalid username'})
        return
    }

    if (
        typeof requestPayload.email !== "string"
        || requestPayload.email.length > 255
        || requestPayload.email.length === 0
        || requestPayload.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) === null
    ) {
        res.status(400).json({error: 'invalid email'})
        return
    }

    if (
        typeof requestPayload.password !== "string"
        || requestPayload.password.length > 255
        || requestPayload.password.length < 4
    ) {
        res.status(400).json({error: 'invalid password'})
        return
    }


    //Enregistrement d'un nouvel user dans la table "users"
    let salt = bcrypt.genSaltSync(10)

    const token = jwt.sign(
        {
            username: requestPayload.username
        },
        //SecretOrPublicKey
        process.env.JWT_TOKEN,
        {expiresIn: "24h"}
    )
    // @TODO : dynamique https://localhost:3003
    let confirmationUrl = `https://localhost:3003/ws/confirm-email?token=${token}`

    let user
    try {
        user = await User.create({
            username: `${requestPayload.username}`,
            email: `${requestPayload.email}`,
            password: bcrypt.hashSync(`${requestPayload.password + salt}`, 10),
            token: token,
            salt: salt,
            isActive: 0
        })
    } catch (err) {
        res.status(500).json({err})
        return
    }

    res.status(201).send(user)
    console.log('Utilisateur créé')

    //Envoi d'un mail de confirmation
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    console.log(process.env.SENDGRID_API_KEY)
    const msg = {
        to: `${requestPayload.email}`, // Change to your recipient
        from: 'rumbeul.app@gmail.com', // Change to your verified sender
        subject: 'confirmation',
        html: `<h1>Bonjour ${requestPayload.username} !</h1> <br>
                <h2>Prêt pour la compétition ?</h2> <br>
                <p>Confirme ton inscription en cliquant sur le lien suivant: <br> ${confirmationUrl}`,
    }

    try {
        await sgMail.send(msg)
        console.log('Email sent')
    } catch (err) {
        console.error(err)
    }

}

// Connexion
export async function login(req, res) {
    const requestPayload = req.body
    let user
    try {
        user = await User.findOne({
            where: {
                email: requestPayload.email
            }
        })
    } catch (err) {
        res.status(500).send({message: err.message})
        return
    }

    // Si l'utilisateur n'existe pas dans la base de données, on retourne une erreur 401 avec un objet JSON
    if (!user) {
        res.status(401).json({error: 'User not found !'})
        return
    }
    // Si on trouve l'utilisateur, on compare le mot de passe envoyé par l'utilisateur qui veut se connecter avec le hash enregistré
    let passwordIsValid = bcrypt.compareSync(
        requestPayload.password,
        user.password
    )
    // Si mot de passe incorrect on renvoi un status 401 avec message au serveur
    if (!passwordIsValid) {
        res.status(401).send({
            accessToken: null,
            message: "Invalid Password !"
        })
        return
    }

    // Sinon on renvoi un status 200 OK avec un objet JSON qui contient l'identifiant de l'utilisateur dans la base ainsi qu'un token
    let token = jwt.sign(
        {
            username: user.username
        },
        //SecretOrPublicKey
        process.env.JWT_TOKEN,
        {expiresIn: "24h"}
    )

    res.status(200).json({
        accessToken: token,
        user: user
    })
}