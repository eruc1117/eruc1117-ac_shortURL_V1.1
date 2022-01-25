const express = require('express')
const exhbs = require('express-handlebars')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const routes = require('./routes')

app.use(express.static('public'))
app.engine('handlebars', exhbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
require('./config/mongoose')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})