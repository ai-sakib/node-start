const db = require('../util/database')
const Cart = require('./cart')

const getProductsFromFile = cb => {}

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id
        this.title = title
        this.imageUrl = imageUrl
        this.description = description
        this.price = price
    }

    save() {
        return db.execute(
            'INSERT INTO products (title, price, imageUrl, description, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
            [
                this.title,
                this.price,
                this.imageUrl,
                this.description,
                new Date(),
                new Date(),
            ]
        )
    }

    static delete(id) {
        return db.execute('DELETE FROM products WHERE products.id = ?', [id])
    }

    static find(id) {
        return db.execute('SELECT * FROM products WHERE products.id = ?', [id])
    }

    static get() {
        return db.execute('SELECT * FROM products')
    }
}
