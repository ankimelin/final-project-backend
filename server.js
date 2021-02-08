import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

import { exhibitions } from './routes/exhibitions.js'
import { reviews } from './routes/reviews.js'

// Connects to mongodb
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/curated"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

// Defines the port the app will run on
const port = process.env.PORT || 8082
// Creates an instance of express, which is needed to start the server and create API endpoints
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Checks whether database is available
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next()
  } else {
    res.status(503).json({ error: 'Database unavailable' })
  }
})

// Routes
app.get('/', (req, res) => {
  res.send('Curated API')
})

app.use('/exhibitions', exhibitions)
app.use('/exhibitions/:exhibitionId/reviews', reviews)

// Starts the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
