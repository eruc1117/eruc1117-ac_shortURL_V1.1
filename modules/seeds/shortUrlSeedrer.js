const db = require('../../config/mongoose')
const shortUrlModules = require('../shortUrlModule')

db.once('open', () => {
  shortUrlModules.create({
    fullUrl: 'https://tw.yahoo.com',
    shortUrl: 'https://localhost:3000/seed1'
  })
  console.log('connect')
})