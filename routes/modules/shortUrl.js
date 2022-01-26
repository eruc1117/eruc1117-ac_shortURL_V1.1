const express = require('express')
const router = express.Router()
const shortUrlModule = require('../../modules/shortUrlModule')


router.post('/short', (req, res) => {
  const fullUrl = req.body.fullUrl

  shortUrlModule.findOne({ fullUrl }, function (err, result) {
    if (err) { console.log('err') }
    if (!result) {
      //資料庫沒有原始網址，製作新的短網址並存到資料庫中
      const randomNum = Math.random().toString(36).replace(/\.+/g, '').substring(1, 6)
      let shortUrl = `http://localhost:3000/${randomNum}`
      shortUrlModule.create({ fullUrl, shortUrl },
        function (err) {
          if (err.code === 11000) {
            let newShortUrl = shortUrl
            while (shortUrl === newShortUrl) {
              let newRandomNum = Math.random().toString(36).replace(/\.+/g, '').substring(1, 6)
              newShortUrl = `http://localhost:3000/${newRandomNum}`
            }
            shortUrlModule.findByIdAndDelete({ fullUrl })
            shortUrl = newShortUrl
            shortUrlModule.create({ fullUrl, shortUrl })
          }
        })
      res.redirect(`/create/short/repeat/${fullUrl}`)
    } else {//資料庫已有原始網址，直接從資料庫取出
      const shortUrl = result.shortUrl//這邊直接用有安全問題，handlebars會擋
      res.render('createEnd', { shortUrl })
    }
  })
})



module.exports = router