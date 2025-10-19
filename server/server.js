import express from 'express'
import { productsRoute } from './routes/products-route.js'

const app = express()

app.use(express.static('../client/dist'))
app.use('/api/products', productsRoute)

app.listen(8000, () => {
  console.log('Server is running on port 8000')
})