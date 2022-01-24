const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/shortUrl")

const db = mongoose.connection

db.on('error', () => {
  console.log('error')
})

db.once('open', () => {
  console.log('connect Mongodb database')
})

module.exports = db