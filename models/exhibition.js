import mongoose from 'mongoose'

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
    enum: ['Moderna Museet', 'ArkDes', 'Fotografiska', 'Sven-Harrys', 'Bonniers Konsthall'],
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
  }
}, { timestamps: true })

// Mongoose model
export const Exhibition = mongoose.model('Exhibition', exhibitionSchema)