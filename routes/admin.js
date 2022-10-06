const express = require('express')

const ProductController = require('../controllers/ProductController')
const router = express.Router()

var products = []
router.get(`/add-product`, ProductController.getAddProduct)

router.post(`/add-product`, ProductController.postAddProduct)

module.exports = router
