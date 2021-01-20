import mongoose, { Schema } from 'mongoose'

// Mongoose schema 
const exhibitionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artists: {
    type: Array,
    required: false
  },
  museum: {
    type: String,
    enum: ['Moderna Museet', 'ArkDes', 'Fotografiska', 'Sven-Harrys', 'Bonniers Konsthall', 'Färgfabriken', 'Marabouparken'],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  topExhibition: {
    type: Boolean,
    required: false,
    default: false
  }
}, { timestamps: true })

// Mongoose model
export const Exhibition = mongoose.model('Exhibition', exhibitionSchema)