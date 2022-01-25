const express = require('express')
const router = express.Router()
const shortUrlModule = require('../../modules/shortUrlModule')


router.post('/short', (req, res) => {
  const fullUrl = req.body.fullUrl

  shortUrlModule.findOne({ fullUrl: fullUrl }, function (err, result) {
    if (err) { console.log('err') }
    if (result) {
      let shortUrl = result.shortUrl//這邊直接用有安全問題，handlebars會擋
      res.render('createEnd', { shortUrl })
    } else {
      let randomNum = Math.random().toString(36).replace(/\.+/g, '').substring(1, 6)
      let shortUrl = `http://localhost:3000/${randomNum}`
      shortUrlModule.create({ fullUrl, shortUrl })
      res.render('createEnd', { shortUrl })
    }
  })
})


module.exports = router