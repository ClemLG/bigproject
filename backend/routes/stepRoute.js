// Imports
import express from 'express'
import * as stepCtrl from '../controllers/stepController.js'

// Création du routeur
const router = express.Router()

// Définition des routes CRUD
    router.post('/random', stepCtrl.getRandomPairs)


//Exports
export default router