const express = require('express')
const router = express.Router()
const shortUrlModule = require('../../modules/shortUrlModule')

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/:random', (req, res) => {
  let shortUrl = `http://localhost:3000/${req.params.random}`
  shortUrlModule.findOne({ shortUrl: shortUrl }, function (err, result) {
    if (err) { console.log('err') }
    if (result) {
      let fullUrl = result.fullUrl
      res.redirect(fullUrl)
    } else {
      res.render('index', { noResult: true })
    }
  })
})

module.exports = router