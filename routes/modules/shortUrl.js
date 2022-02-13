const express = require('express')
const router = express.Router()
const shortUrlModule = require('../../modules/shortUrlModule')


router.post('/short', (req, res) => {
  const fullUrl = req.body.fullUrl
  findshortUrl(fullUrl).then(shortUrl => res.render('createEnd', { shortUrl }))
})

module.exports = router


async function findshortUrl(fullUrl) {
  try {
    const fullUrlResult = await shortUrlModule.findOne({ fullUrl }).exec()
    if (fullUrlResult !== null) { //當資料庫有資料時，直接回傳結果
      return fullUrlResult.shortUrl
    } else { //資料庫沒有時，新建資料
      let repeat = true //先設定重複判斷
      let shortUrl = ``
      while (repeat) {
        const randomNum = Math.random().toString(36).replace(/\.+/g, '').substring(1, 6)
        shortUrl += `http://localhost:3000/${randomNum}`
        let shortResult = await shortUrlModule.find({ shortUrl })//搜索資料庫確認重複(find的null 會導向catch)
        repeat = shortResult.length >= 1 ? true : false //改變重複判斷
      }
      await shortUrlModule.create({ fullUrl, shortUrl })
      return shortUrl
    }
  } catch {
    console.log('err')
  }
}

