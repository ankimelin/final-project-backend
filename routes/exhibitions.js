import express from 'express'

import { Exhibition } from '../models/exhibition.js'

export const exhibitions = express.Router()

exhibitions.get('/exhibitions', async (req, res) => {
  console.log("hi from exhibitions route in routes folder")
  try {
    const exhibitions = await Exhibition.find()
    return res.status(200).json(exhibitions)
  } catch (err) {
    return res.status(400).json({ message: 'Could not get exhibitions', error: err })
  }
})