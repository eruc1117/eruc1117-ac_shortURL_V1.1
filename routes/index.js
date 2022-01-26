const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const shortUrl = require('./modules/shortUrl')
const shortUrlRepeat = require('./modules/shortUrlRepreat')

router.use('/', home)
router.use('/create', shortUrl)
router.use('/repeat', shortUrlRepeat)

module.exports = router