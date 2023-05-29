import express from 'express'
import * as userCtrl from '../controllers/userController.js'

//Création du routeur
const router = express.Router()

router.get('/:id', userCtrl.getOneUser)

export default router