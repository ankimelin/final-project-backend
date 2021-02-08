import express from 'express'

import { Exhibition } from '../models/exhibition.js'
import { Review } from '../models/review.js'

const ERROR_MESSAGE_GET_ALL = 'Could not get reviews'
const ERROR_MESSAGE_CREATE = 'Could not create review'
const ERROR_MESSAGE_GET_ONE = 'Could not get review'
const ERROR_MESSAGE_UPDATE = 'Could not update review'
const ERROR_MESSAGE_DELETE = 'Could not delete review'

export const reviews = express.Router()

reviews.route('/:exhibitionId/reviews')
  .get(async (req, res) => {
    try {
      const { exhibitionId } = req.params
      const reviews = await Review.find({ exhibitionId: exhibitionId })
      return res.status(200).json(reviews)
    } catch (err) {
      return res.status(400).json({ ERROR_MESSAGE_GET_ALL, error: err })
    }
  })
  .post(async (req, res) => {
    try {
      const { exhibitionId } = req.params
      const { author, text } = req.body
      const newReview = await new Review({ author, text, exhibitionId }).save()
      const updatedExhibition = await Exhibition.findByIdAndUpdate(exhibitionId,
        { $push: { reviews: newReview._id } })
      return res.status(200).json(updatedExhibition)
    } catch (err) {
      return res.status(400).json({ message: ERROR_MESSAGE_CREATE, error: err })
    }
  })

reviews.route('/:exhibitionId/reviews/:reviewId')
  .get(async (req, res) => {
    try {
      const { exhibitionId, reviewId } = req.params
      const review = await Review.findOne({ exhibitionId, _id: reviewId })
      return res.status(200).json(review)
    } catch (err) {
      return res.status(400).json({ message: ERROR_MESSAGE_GET_ONE, error: err })
    }
  })
  .delete(async (req, res) => {
    try {
      const { exhibitionId, reviewId } = req.params
      const review = await Review.findOneAndDelete({ exhibitionId, _id: reviewId })
      return res.status(200).json(review)
    } catch (err) {
      return res.status(400).json({ message: ERROR_MESSAGE_DELETE, error: err })
    }
  })
  .patch(async (req, res) => {
    try {
      const { exhibitionId, reviewId } = req.params
      const { author, text } = req.body
      const review = await Review.findOneAndUpdate({ exhibitionId, _id: reviewId }, { author, text })
      return res.status(200).json(review)
    } catch (err) {
      return res.status(400).json({ message: ERROR_MESSAGE_UPDATE, error: err })
    }
  })