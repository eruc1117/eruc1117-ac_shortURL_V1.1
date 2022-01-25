const express = require('express')
const exhbs = require('express-handlebars')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const shortUrlModule = require('./modules/shortUrlModule')

app.engine('handlebars', exhbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
require('./config/mongoose')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/create/short', (req, res) => {
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

app.get('/:random', (req, res) => {
  let shortUrl = `http://localhost:3000/${req.params.random}`
  shortUrlModule.findOne({ shortUrl: shortUrl }, function (err, result) {
    if (err) { console.log('err') }
    if (result) {
      let fullUrl = result.fullUrl//這邊直接用有安全問題，handlebars會擋
      res.redirect(fullUrl)
    } else {
      res.render('index', { noResult: true })
    }
  })
})


app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})