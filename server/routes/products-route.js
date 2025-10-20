import express from 'express'
import { getGenres, getProducts } from '../controllers/products-controller.js'

export const productsRoute = express.Router()

productsRoute.get('/', getProducts)
productsRoute.get('/genres', getGenres)