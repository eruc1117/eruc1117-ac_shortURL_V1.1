const express = require('express')
const router = express.Router()
const shortUrlModule = require('../../modules/shortUrlModule')


router.post('/short', (req, res) => {
  const fullUrl = req.body.fullUrl
  findFullUrl(fullUrl).then(shortUrl => res.render('createEnd', { shortUrl }))
})

module.exports = router

async function findFullUrl(fullUrl) {
  const result = await findshortUrl(fullUrl)
  console.log(result)
  const shortUrl = result.shortUrl
  console.log(shortUrl)
  return shortUrl
}

async function findshortUrl(fullUrl) {
  let result
  try {
    result = await shortUrlModule.findOne({ fullUrl }).exec()
    if (result !== null) { //當資料庫有資料時，直接回傳結果
      return result
    } else { //資料庫沒有時，新建資料
      const randomNum = Math.random().toString(36).replace(/\.+/g, '').substring(1, 6)
      let shortUrl = `http://localhost:3000/${randomNum}`
      try {
        await shortUrlModule.create({ fullUrl, shortUrl })//測試是否重複或新建
        return shortUrlModule.findOne({ shortUrl })//成功新建後將資料回傳
      } catch {//如果有重複，出現錯誤訊息，重新產生一個shortUrl
        const randomNum = Math.random().toString(36).replace(/\.+/g, '').substring(1, 6)
        let shortUrl = `http://localhost:3000/${randomNum}`
        await shortUrlModule.create({ fullUrl, shortUrl })
        return shortUrlModule.findOne({ shortUrl })
      }
    }
  } catch {
  }
}
