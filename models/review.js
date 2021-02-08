import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, 'Author required']
  },
  text: {
    type: String,
    required: [true, 'Text required']
  },
  exhibitionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exhibition',
    required: true
  }
}, { timestamps: true })

export const Review = mongoose.model('Review', reviewSchema)