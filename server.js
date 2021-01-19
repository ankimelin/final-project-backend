import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

import { Exhibition } from './models/exhibition.js'

// Connects to mongodb
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/curated"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

// Create error messages?

// Defines the port the app will run on. 
// Defaults to 8080, but can be overridden when starting the server. 
// For example: PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Defined routes
app.get('/', (req, res) => {
  res.send('Curated API')
})

app.get('/exhibitions', async (req, res) => {
  try {
    const exhibitions = await Exhibition.find()
    return res.status(200).json(exhibitions) // add sorting? 200 OK
  } catch (err) {
    return res.status(400).json({ message: 'Could not get exhibitions', error: err }) // 400 bad request
  }
})

app.post('/exhibitions', async (req, res) => {
  try {
    const { title, artists, museum, startDate, endDate, link } = req.body
    const exhibition = await new Exhibition({ title, artists, museum, startDate, endDate, link }).save()
    res.status(201).json(exhibition) // 201 created
  } catch (err) {
    res.status(400).json({ message: 'Could not create exhibition', error: err.message })
  }
})

app.patch('/exhibitions/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { title, museum, artists, startDate, endDate, link } = req.body
    const exhibition = await Exhibition.updateOne({ _id: id }, { title, museum, artists, startDate, endDate, link }, { runValidators: true })
    res.status(202).json(exhibition) // 202 Accepted - ok to use here or should be 200 OK or 201 Created?
  } catch (err) {
    res.status(404).json({ message: 'Could not find exhibition', error: err.message }) // 404 not found
  }
})

app.delete('/exhibitions/:id', async (req, res) => {
  try {
    const { id } = req.params
    const exhibition = await Exhibition.deleteOne({ _id: id })
    res.status(200).json(exhibition)
  } catch (err) {
    res.status(404).json({ message: 'Could not find exhibition', path: err.path, value: err.value })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
