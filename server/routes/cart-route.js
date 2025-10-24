import express from 'express'
import { addToCart } from '../controllers/cart-controller.js'

export const cartRoute = express.Router()

cartRoute.post('/add', addToCart)