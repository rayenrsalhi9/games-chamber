import express from 'express'
import { addToCart, getCartCount } from '../controllers/cart-controller.js'

export const cartRoute = express.Router()

cartRoute.post('/add', addToCart)
cartRoute.get('/count', getCartCount)