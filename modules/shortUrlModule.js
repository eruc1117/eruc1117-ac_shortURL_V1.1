const mongoose = require('mongoose')
const schema = mongoose.Schema

const shortUrlSchema = new schema({
  fullUrl: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
})

module.exports = mongoose.model('shortUrlModules', shortUrlSchema)