import mongoose from 'mongoose'

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
  topExhibition: {
    type: Boolean,
    required: false,
    default: false
  }
}, { timestamps: true })

export const Exhibition = mongoose.model('Exhibition', exhibitionSchema)