import express from 'express'
import { loginUser, registerUser, logoutUser } from '../controllers/auth-controller.js'

export const authRoute = express.Router()

authRoute.post('/register', registerUser)
authRoute.post('/login', loginUser)
authRoute.get('/logout', logoutUser)