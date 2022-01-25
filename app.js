const express = require('express')
const exhbs = require('express-handlebars')
const app = express()
const bodyParser = require('body-parser')
const routes = require('./routes')
const port = 3000

require('./config/mongoose')
app.engine('handlebars', exhbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})