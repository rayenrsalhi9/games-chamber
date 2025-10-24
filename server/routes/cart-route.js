import express from 'express'
import { addToCart } from '../controllers/cart-controller.js'

export const cartRoute = express.Router()

cartRoute.use('/add', addToCart)