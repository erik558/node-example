import { createServer } from 'http'
import fs from 'fs'
import path from 'path'

const mineTypes = {
    "/html":"text/html",
    "/css":"text/css",
    "/js":"text/js"

}

function fireMideleware(req, res, next) {

    let url =req.url
    if(url==="/"){
        url='/index.html'
    }

    const filePath = path.resolve('public' + url);
    fs.promises.access(filePath)
        .then(() => {
            const ext = path.extname(filePath)
            res.writeHead(200, { "Content-type": mineTypes[ext] })
            fs.createReadStream(filePath).pipe(res)
        })
        .catch(() => {
            next()
        })
}

const server = createServer((req, res) => {

    fireMideleware(req, res, () => {
        if (req.url === '/hello') {

            res.writeHead(200, { "Content-type": "text/plain" })
            res.end('hello')
        } else if (req.url === '/bye') {
            res.writeHead(200, { "Content-type": "text/plain" })
            res.end('good by')
        } else {
            res.writeHead(200, { "Content-type": "text/plain" })
            res.end('DATA NOT FOUND')
        }
    })

})

server.listen(3001)