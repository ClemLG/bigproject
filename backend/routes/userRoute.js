import express from 'express'
import userCtrl from '../controllers/userController'

//Création du routeur
const router = express.Router()

router.get('/:id', userCtrl)