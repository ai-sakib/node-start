const express = require('express')

const ProductController = require('../controllers/ProductController')

const shopRouter = express.Router()

shopRouter.get('/', ProductController.getAllProducts)

module.exports = shopRouter
