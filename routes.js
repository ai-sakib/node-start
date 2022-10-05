const fs = require('fs')

const routes = (req, res) => {
    const url = req.url
    const method = req.method

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title>My First Page</title></head>')
        res.write(
            '<body><form method = "POST" action="/message"><input type="text" name="message" placeholder="Enter your name"/><button>Submit</button></form></body>'
        )
        res.write('</html>')
        res.statusCode = 200

        return res.end('Hello World')
    } else if (url === '/message' && method === 'POST') {
        let body = []
        req.on('data', chunk => {
            body.push(chunk)
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            const message = parsedBody.split('=')[0]
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end('Message Page')
            })
        })
    }
}

module.exports = {
    handler: routes,
    someText: 'Some hard coded text',
}
