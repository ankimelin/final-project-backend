import express from 'express'

import { Exhibition } from '../models/exhibition.js'

const ERROR_MESSAGE_GET_ALL = 'Could not get exhibitions'
const ERROR_MESSAGE_CREATE = 'Could not create exhibition'
const ERROR_MESSAGE_GET_ONE = 'Could not get exhibition'
const ERROR_MESSAGE_UPDATE = 'Could not update exhibition'
const ERROR_MESSAGE_DELETE = 'Could not delete exhibition'

export const exhibitions = express.Router()

exhibitions.route('/')
  .get(async (req, res) => {
    try {
      const exhibitions = await Exhibition.find()
      return res.status(200).json(exhibitions)
    } catch (err) {
      return res.status(400).json({ ERROR_MESSAGE_GET_ALL, error: err })
    }
  })
  .post(async (req, res) => {
    try {
      const { title, artists, museum, startDate, endDate, link, image, imageText, topExhibition } = req.body
      const exhibition = await new Exhibition({ title, artists, museum, startDate, endDate, link, image, imageText, topExhibition }).save()
      return res.status(200).json(exhibition)
    } catch (err) {
      return res.status(400).json({ message: ERROR_MESSAGE_CREATE, error: err })
    }
  })

exhibitions.route('/:exhibitionId')
  .get(async (req, res) => {
    try {
      const { exhibitionId } = req.params
      const exhibition = await Exhibition.findById(exhibitionId)
      return res.status(200).json(exhibition)
    } catch (err) {
      return res.status(400).json({ message: ERROR_MESSAGE_GET_ONE, error: err })
    }
  })
  .patch(async (req, res) => {
    try {
      const { exhibitionId } = req.params
      const exhibition = await Exhibition.findById(exhibitionId)
      // validation should be there for updates, hence added runValidators: true
      // this makes all required fields needed when updating, even though I only want to update one value
      // what is after "=" is the default excisting value sent in, which is overwritten by what is sent in the req body
      const {
        title = exhibition.title,
        place = exhibition.place,
        artists = exhibition.artists,
        startDate = exhibition.startDate,
        endDate = exhibition.endDate,
        link = exhibition.link,
        image = exhibition.image,
        imageText = exhibition.imageText,
        topExhibition = exhibition.topExhibition
      } = req.body
      const updatedExhibition = await Exhibition.findByIdAndUpdate(exhibitionId,
        { title, place, artists, startDate, endDate, link, image, imageText, topExhibition },
        { runValidators: true, new: true })
      return res.status(200).json(updatedExhibition)
    } catch (err) {
      return res.status(400).json({ message: ERROR_MESSAGE_UPDATE, error: err })
    }
  })
  .delete(async (req, res) => {
    try {
      const { exhibitionId } = req.params
      const exhibition = await Exhibition.findByIdAndDelete(exhibitionId)
      return res.status(200).json(exhibition)
    } catch (err) {
      return res.status(400).json({ message: ERROR_MESSAGE_DELETE, error: err })
    }
  })