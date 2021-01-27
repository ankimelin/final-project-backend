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
      values: ['Moderna Museet', 'ArkDes', 'Fotografiska', 'Sven-Harrys', 'Bonniers Konsthall', 'Färgfabriken', 'Marabouparken'],
      message: 'Choose predefined value'
    },
    required: [true, 'Place required']
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