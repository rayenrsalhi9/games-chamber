import express from 'express'
import { productsRoute } from './routes/products-route.js'
import { authRoute } from './routes/auth-route.js'

const app = express()

app.use(express.static('../client/dist'))
app.use(express.json())
app.use('/api/products', productsRoute)
app.use('/api/auth', authRoute)

app.listen(8000, () => {
  console.log('Server is running on port 8000')
})