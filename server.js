import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

import { Exhibition } from './models/exhibition.js'

// Connects to mongodb
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/curated"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

// Defines the port the app will run on. 
// Defaults to 8080, but can be overridden when starting the server. 
// For example: PORT=9000 npm start
const port = process.env.PORT || 8082
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

app.use((request, response, next) => {
  if (mongoose.connection.readyState === 1) {
    next()
  } else {
    response.status(503).json({ error: 'Database unavailable' })
  }
})

// Defined routes
app.get('/', (req, res) => {
  res.send('Curated API')
})

//*** EXHIBITIONS ROUTES */

// Gets all exhibitions
app.get('/exhibitions', async (req, res) => {
  try {
    const exhibitions = await Exhibition.find()
    return res.status(200).json(exhibitions)
  } catch (err) {
    return res.status(400).json({ message: 'Could not get exhibitions', error: err })
  }
})

// Gets exhibition
app.get('/exhibitions/:id', async (req, res) => {
  const { id } = req.params
  try {
    const exhibition = await Exhibition.findById({ _id: id })
    return res.status(200).json(exhibition)
  } catch (err) {
    return res.status(404).json({ message: 'Could not find exhibition', id })
  }
})

// Creates exhibition
app.post('/exhibitions', async (req, res) => {
  try {
    const { title, artists, museum, startDate, endDate, link, topExhibition } = req.body
    const exhibition = await new Exhibition({ title, artists, museum, startDate, endDate, link, topExhibition }).save()
    return res.status(201).json(exhibition)
  } catch (err) {
    return res.status(400).json({ message: 'Could not create exhibition', error: err.message })
  }
})

// Updates exhibition
app.patch('/exhibitions/:id', async (req, res) => {
  const { id } = req.params
  try {
    const { title, museum, artists, startDate, endDate, link, topExhibition } = req.body
    const exhibition = await Exhibition.findByIdAndUpdate({ _id: id }, { title, museum, artists, startDate, endDate, link, topExhibition }, { runValidators: true })
    return res.status(202).json(exhibition) // returns the found object before the update
  } catch (err) {
    try {
      await Exhibition.findById({ _id: id }) // id is matching, the model validation is off
      return res.status(400).json({ message: 'Could not update exhibition', error: err.message })
    } catch (err) { // id is not matching
      return res.status(404).json({ message: 'Could not find exhibition', id })
    }
  }
})

// Deletes exhibition
app.delete('/exhibitions/:id', async (req, res) => {
  const { id } = req.params
  try {
    const exhibition = await Exhibition.findByIdAndDelete({ _id: id })
    return res.status(200).json(exhibition)
  } catch (err) {
    return res.status(404).json({ message: 'Could not find exhibition', id })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
