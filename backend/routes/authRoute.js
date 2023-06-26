// Imports
import express from 'express'
import * as authCtrl from '../controllers/authController.js'

// Création du routeur
const router = express.Router()

// Définition des routes CRUD
router.post('/register', authCtrl.register)
router.post('/login', authCtrl.login)
router.post('/logout', authCtrl.logout)

//Exports
export default router