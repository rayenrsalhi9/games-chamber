import express from 'express'
import { productsRoute } from './routes/products-route.js'
import { authRoute } from './routes/auth-route.js'
import session from 'express-session'

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.static(path.join(__dirname, '../client/dist')))

app.use(express.json())
app.use(session({
  secret: import.meta.env.VITE_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax'
  }
}))

app.use('/api/products', productsRoute)
app.use('/api/auth', authRoute)

// Catch-all handler: send back React's index.html file for client-side routing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

// Handle all other routes by serving the React app
app.use((req, res, next) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  } else {
    next()
  }
})

app.listen(8000, () => {
  console.log('Server is running on port 8000')
})