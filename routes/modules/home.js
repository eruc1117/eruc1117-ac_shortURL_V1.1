const express = require('express')
const router = express.Router()
const shortUrlModule = require('../../modules/shortUrlModule')

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/:random', (req, res) => {
  let shortUrl = `http://localhost:3000/${req.params.random}`
  shortUrlModule.findOne({ shortUrl }, function (err, result) {
    if (err) { console.log('err') }
    if (result) {//資料庫有搜索到資料，將網頁導向原始頁面
      let fullUrl = result.fullUrl
      res.redirect(fullUrl)
    } else {//資料庫沒有資料，網頁重新導向首頁，並提示此短網址沒有製作過
      res.render('index', { noResult: true })
    }
  })
})

module.exports = router