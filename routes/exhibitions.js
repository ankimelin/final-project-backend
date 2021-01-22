import express from 'express'

import { Exhibition } from '../models/exhibition.js'

const ERROR_MESSAGE_404 = 'Could not find exhibition'

export const exhibitions = express.Router()

exhibitions.route('/')
  .get(async (req, res) => {
    try {
      const exhibitions = await Exhibition.find()
      return res.status(200).json(exhibitions)
    } catch (err) {
      return res.status(400).json({ message: 'Could not get exhibitions', error: err })
    }
  })
  .post(async (req, res) => {
    try {
      const { title, artists, place, startDate, endDate, link, topExhibition } = req.body
      const exhibition = await new Exhibition({ title, artists, place, startDate, endDate, link, topExhibition }).save()
      return res.status(200).json(exhibition)
    } catch (err) {
      return res.status(400).json({ message: 'Could not create exhibition', error: err.message })
    }
  })

exhibitions.route('/:id')
  .get(async (req, res) => {
    const { id } = req.params
    try {
      const exhibition = await Exhibition.findById({ _id: id })
      return res.status(200).json(exhibition)
    } catch (err) {
      return res.status(404).json({ message: ERROR_MESSAGE_404, id })
    }
  })
  .patch(async (req, res) => {
    const { id } = req.params
    try {
      const exhibition = await Exhibition.findById({ _id: id })
      const {
        title = exhibition.title, // chooses default value exhibition.title to pass in if title is not passed in
        place = exhibition.place,
        artists = exhibition.artists,
        startDate = exhibition.startDate,
        endDate = exhibition.endDate,
        link = exhibition.link,
        topExhibition = exhibition.topExhibition
      } = req.body
      const updatedExhibition = await Exhibition.findByIdAndUpdate({ _id: id }, { title, place, artists, startDate, endDate, link, topExhibition }, { runValidators: true })
      return res.status(202).json(updatedExhibition) // returns the found object before the update
    } catch (err) {
      try {
        await Exhibition.findById({ _id: id }) // id is matching, the model validation is off
        return res.status(400).json({ message: 'Could not update exhibition', error: err.message })
      } catch (err) { // id is not matching, the validation can be either right or wrong
        return res.status(404).json({ message: ERROR_MESSAGE_404, id })
      }
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params
    try {
      const exhibition = await Exhibition.findByIdAndDelete({ _id: id })
      return res.status(200).json(exhibition)
    } catch (err) {
      return res.status(404).json({ message: ERROR_MESSAGE_404, id })
    }
  })