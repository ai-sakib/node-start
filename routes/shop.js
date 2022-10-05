const express = require('express')
const path = require('path')
const rootDir = require('../utils/path')

const shopRouter = express.Router()
const adminData = require('./admin')

shopRouter.get('/', (req, res) => {
    res.render('shop', {
        prods: adminData.products,
        pageTitle: 'Shop',
        path: '/',
    })
})

module.exports = shopRouter
