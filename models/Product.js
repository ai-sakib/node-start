const fs = require('fs')
const path = require('path')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
)

const getAllProductsFromFile = callback => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            callback([])
        } else {
            callback(JSON.parse(fileContent))
        }
    })
}

module.exports = class Product {
    constructor(title) {
        this.title = title
    }

    save() {
        getAllProductsFromFile(products => {
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), error => {
                if (!error) {
                    return this
                }
                console.log(error)
            })
        })
    }

    static get(callback) {
        getAllProductsFromFile(callback)
    }
}
