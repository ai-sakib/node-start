const express = require('express')
const path = require('path')

const rootDir = require('../utils/path')

const router = express.Router()

const ADD_PRODUCT_ROUTE = 'add-product'
const MAIN_ROUTE = 'admin'

router.get(`/${ADD_PRODUCT_ROUTE}`, (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
})

router.post(`/${ADD_PRODUCT_ROUTE}`, (req, res) => {
    console.log(req.body)
    res.redirect('/')
})

module.exports = router

// const express = require('express');

// const router = express.Router();

// router.get('/add-product', (req, res, next) => {
//   res.send(
//     '<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
//   );
// });

// router.post('/add-product', (req, res, next) => {
//   console.log(req.body);
//   res.redirect('/');
// });

// module.exports = router;
