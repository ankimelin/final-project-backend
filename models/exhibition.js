import mongoose from 'mongoose'
// import { Review } from './review'

const exhibitionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title required']
  },
  artists: {
    type: Array,
    required: false
  },
  museum: {
    type: String,
    enum: {
      values: ['Sven-Harrys Konstmuseum', 'Bonniers Konsthall', 'Färgfabriken', 'Waldemarsudde', 'Magasin III']
    },
    required: [true, 'Museum required']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date requried']
  },
  link: {
    type: String,
    required: [true, 'Link required']
  },
  image: {
    type: String,
    required: [true, 'Image link required']
  },
  imageText: {
    type: String,
    required: [true, 'Image text required']
  },
  topExhibition: {
    type: Boolean,
    required: false,
    default: false
  },
  // reviews: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Review'
  // }
}, { timestamps: true })

export const Exhibition = mongoose.model('Exhibition', exhibitionSchema)

// const reviewSchema = new mongoose.Schema({
//   author: {
//     type: String,
//     required: true
//   },
//   review: {
//     type: String,
//     required: true
//   }
// }, { timestamps: true })

// export const Review = mongoose.model('Review', reviewSchema)