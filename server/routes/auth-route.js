import express from 'express'
import { loginUser, registerUser } from '../controllers/auth-controller.js'

export const authRoute = express.Router()

authRoute.get('/register', registerUser)
authRoute.get('/login', loginUser)