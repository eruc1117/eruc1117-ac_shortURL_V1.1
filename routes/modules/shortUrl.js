const express = require('express')
const router = express.Router()
const shortUrlModule = require('../../modules/shortUrlModule')


router.post('/short', (req, res) => {
  const fullUrl = req.body.fullUrl

  shortUrlModule.findOne({ fullUrl }, function (err, result) {
    if (err) { console.log('err') }
    if (result) {//資料庫已有原始網址，直接從資料庫取出
      let shortUrl = result.shortUrl//這邊直接用有安全問題，handlebars會擋
      res.render('createEnd', { shortUrl })
    } else {//資料庫沒有原始網址，製作新的短網址並存到資料庫中
      let randomNum = Math.random().toString(36).replace(/\.+/g, '').substring(1, 6)
      let shortUrl = `http://localhost:3000/${randomNum}`
      shortUrlModule.create({ fullUrl, shortUrl })
      res.render('createEnd', { shortUrl })
    }
  })
})


module.exports = router