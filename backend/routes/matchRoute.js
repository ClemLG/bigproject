// Imports
import express from 'express'
import * as matchCtrl from '../controllers/matchController.js'

// Création du routeur
const router = express.Router()

// Définition des routes CRUD
router.put('/:id', matchCtrl.update)


//Exports
export default router