// Imports
import express from 'express'
import * as eventCtrl from '../controllers/eventController.js'

// Création du routeur
const router = express.Router()

// Définition des routes CRUD
router.post('/create', eventCtrl.createEvent)
router.post('/:id/join', eventCtrl.joinEvent)
router.post('/:id/invite', eventCtrl.invitePlayers)
router.get('/', eventCtrl.getAllEvents)
router.get('/:id', eventCtrl.getOneEvent)

//Exports
export default router