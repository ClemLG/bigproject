import express from 'express'
import authController from '../controllers/authController.js'

// Création du routeur
const router = express.Router()

// Définition des routes CRUD
router.post('/register', authController.register)
router.post('/login', authController.login)

//Exports
export default router