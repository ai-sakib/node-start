const express = require('express')
const path = require('path')

const rootDir = require('../utils/path')

const router = express.Router()

const ADD_PRODUCT_ROUTE = 'add-product'
const MAIN_ROUTE = 'admin'

var products = []
router.get(`/${ADD_PRODUCT_ROUTE}`, (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: `/${MAIN_ROUTE}/${ADD_PRODUCT_ROUTE}`,
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
    })
})

router.post(`/${ADD_PRODUCT_ROUTE}`, (req, res) => {
    products.push({ title: req.body.title })
    res.redirect('/')
})

module.exports = {
    routes: router,
    products,
}
