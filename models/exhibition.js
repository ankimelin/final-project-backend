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
    enum: ['Sven-Harrys Konstmuseum', 'Bonniers Konsthall', 'Färgfabriken', 'Waldemarsudde', 'Magasin III'],
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
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }]
}, { timestamps: true })

export const Exhibition = mongoose.model('Exhibition', exhibitionSchema)