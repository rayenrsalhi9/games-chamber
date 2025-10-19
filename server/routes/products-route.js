import express from 'express'
import { getGenres, getProducts } from '../controllers/products-controllers.js'

export const productsRoute = express.Router()

productsRoute.get('/', getProducts)
productsRoute.get('/genres', getGenres)