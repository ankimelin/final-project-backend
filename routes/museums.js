import express from 'express'

import { Exhibition } from '../models/exhibition.js'

const ERROR_MESSAGE_GET_ALL = 'Could not get museums'

export const museums = express.Router()

museums.route('/')
  .get((req, res) => {
    try {
      const museums = Exhibition.schema.path('museum').enumValues
      return res.status(200).json(museums)
    } catch (err) {
      return res.status(400).json({ ERROR_MESSAGE_GET_ALL, errors: err })
    }
  })