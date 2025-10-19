import express from 'express'

const app = express()

app.use(express.static('../client/dist'))

app.listen(8000, () => {
  console.log('Server is running on port 8000')
})