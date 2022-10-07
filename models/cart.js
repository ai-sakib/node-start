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
}
