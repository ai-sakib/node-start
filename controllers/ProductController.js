const Product = require('../models/Product')

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: `/admin/add-product`,
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
    })
}

exports.postAddProduct = (req, res) => {
    const proudct = new Product(req.body.title)
    proudct.save()
    res.redirect('/')
}

exports.getAllProducts = (req, res) => {
    Product.get(products => {
        res.render('shop', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        })
    })
}
