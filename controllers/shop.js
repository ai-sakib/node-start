const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
    Product.get().then(([rows, fieldData]) => {
        res.render('shop/product-list', {
            prods: rows,
            pageTitle: 'All Products',
            path: '/products',
        })
    })
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId
    Product.find(prodId).then(([product]) => {
        res.render('shop/product-detail', {
            product: product[0],
            pageTitle: product.title,
            path: '/products',
        })
    })
}

exports.deleteProduct = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
        })
    })
}

exports.getIndex = (req, res, next) => {
    Product.get().then(([rows, fieldData]) => {
        res.render('shop/index', {
            prods: rows,
            pageTitle: 'Shop',
            path: '/',
        })
    })
}

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = []
            for (p of products) {
                const cartProductData = cart.products.find(
                    prod => prod.id === p.id
                )
                if (cartProductData) {
                    cartProducts.push({
                        productData: p,
                        qty: cartProductData.qty,
                    })
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts,
            })
        })
    })
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId
    console.log('cartProdId', prodId)

    Product.find(prodId, product => {
        Cart.deleteProduct(prodId, product.price)
        res.redirect('/cart')
    })
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId

    Product.find(prodId, product => {
        console.log('product', product)
        Cart.addProduct(product.id, product.price)
    })
    res.redirect('/cart')
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
    })
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout',
    })
}
