// App
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

// Controllers
const ErrorController = require('./controllers/ErrorController')

// Setup Environment
const app = express()
app.set('view engine', 'ejs')
app.set('views', 'views')

// Import Routes
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes)
app.use(shopRoutes)
app.use(ErrorController.get404)

app.listen(4000)
