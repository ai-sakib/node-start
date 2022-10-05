const express = require('express')
const path = require('path')
const rootDir = require('../utils/path')

const shopRouter = express.Router()
const adminData = require('./admin')

shopRouter.get('/', (req, res) => {
    console.log('shop.js', adminData.products)
    res.sendFile(path.join(rootDir, 'views', 'shop.html'))
})

module.exports = shopRouter
