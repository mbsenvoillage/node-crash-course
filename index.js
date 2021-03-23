/*
const Person = require('./person');
// import Person from './person';

let John = new Person("John Doe", 30);
//console.log(John.greeting());

const Logger = require('./logger');

const logger = new Logger();
logger.on('message', (data) => console.log('Called Listener', data));
logger.log("Hello");
*/

const http = require('http'), path = require('path'), fs = require('fs');

const server = http.createServer((req, res) => {
    /*
     if (req.url === "/home") {
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
            if(err) throw err;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        })
    }
    if (req.url === "/about") {
        fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, data) => {
            if(err) throw err;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        })
    }
    if (req.url === "/whoami") {
        res.write("How should I know ? ");
        res.end();
    }
    if(req.url === "/api/users") {
        const users = [
            {name: "Jimmy Slithers", favfruit: "Banana"},
            {name: "Julia Pednasson", favfruit: "Peach"}
        ]
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(users));
    }
     */
    let filePath = path.join(__dirname, 'public', req.url === '/' ?
    'index.html' : req.url
    );
    //Extension of the file
    let extname = path.extname(filePath);
    // Initial content type
    let contentType = 'text/html';
    // Check extension
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/png';
            break;
    }

    // Read File
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(content, 'utf8');
                })
            } else {
                // Probs server error
                res.writeHead(500);
                res.end('Server Error: ' + err.code);

            }
        } else {
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf8');
        }
    })
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log('Server running on port ' + PORT));
