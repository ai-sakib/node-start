const fs = require('fs')
const path = require('path')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
)

module.exports = class Cart {
    static addProduct(productId, price, cb) {
        console.log('productId', productId)

        fs.readFile(p, (err, fileContent) => {
            // Fetch previous cart
            let cart = { products: [], totalPrice: 0 }
            if (!err) {
                cart = JSON.parse(fileContent)
            }

            // Analyze exisiting product
            let existingProductIndex = cart.products.findIndex(
                prod => prod.id === productId
            )
            let existingProduct = cart.products[existingProductIndex]
            console.log('existingProduct', existingProduct)

            // Add/update new product information
            let updatedProduct
            if (existingProduct) {
                updatedProduct = { ...existingProduct }
                updatedProduct.qty++
                cart.products[existingProductIndex] = updatedProduct
            } else {
                updatedProduct = { id: productId, qty: 1 }
                cart.products = [...cart.products, updatedProduct]
            }

            cart.totalPrice = cart.totalPrice + +price

            // Finally, save to database
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err)
            })
        })
    }

    static deleteProduct(id, price) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return
            }

            const updatedCart = { ...JSON.parse(fileContent) }
            const product = updatedCart.products.find(prod => prod.id === id)
            if (!product) {
                return
            }

            const productQty = product.qty
            updatedCart.products = updatedCart.products.filter(
                prod => prod.id !== id
            )
            updatedCart.totalPrice = updatedCart.totalPrice - productQty * price

            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err)
            })
        })
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent)
            if (err) {
                cb(null)
            } else {
                cb(cart)
            }
        })
    }
}
