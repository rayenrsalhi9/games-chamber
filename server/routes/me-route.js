import express from 'express'
import { getUserDetails } from '../controllers/me-controller.js'

export const meRoute = express.Router()

meRoute.get('/', getUserDetails)