const express = require('express')
const router = express.Router()
const shortUrlModule = require('../../modules/shortUrlModule')


router.post('/repeat/:fullUrl', (req, res) => {
  const fullUrl = req.params.fullUrl
  shortUrlModule.findOne({ fullUrl }, function (err, result) {
    if (err) { console.log('err') }
    if (result) {//資料庫已有原始網址，直接從資料庫取出
      const shortUrl = result.shortUrl//這邊直接用有安全問題，handlebars會擋
      res.render('createEnd', { shortUrl })
    }
  })
})

module.exports = router