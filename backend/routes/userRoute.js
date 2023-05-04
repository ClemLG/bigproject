import express from 'express'
import userController from '../controllers/userController.js'

//Création du routeur
const router = express.Router()

router.get('/:id', userController)