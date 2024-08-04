const http = require('http');
const fs = require('fs');
const path = require('path');
const portNumber = 8080;

// Create a server instance
const httpServer = http.createServer((req, res) => {
    // Handle the root URL (/) by serving the index.html file
    if (req.url === '/') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else {
        // Construct the file path
        const filePath = path.join(__dirname, req.url);
        const extName = path.extname(filePath);
        let contentType = 'text/html';

        // Set the content type based on the file extension
        switch (extName) {
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
                contentType = 'image/jpg';
                break;
            case '.wav':
                contentType = 'audio/wav';
                break;
        }

        fs.readFile(filePath, (err, data) => {
            if (err) {
                if (err.code == 'ENOENT') {
                    fs.readFile('./404.html', (err, data) => {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end(data, 'utf-8');
                    });
                } else {
                    res.writeHead(500);
                    res.end('Server Error: ' + err.code);
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data, 'utf-8');
            }
        });
    }
});

// Setup the server to listen on port 8080
httpServer.listen(portNumber, () => {
    console.log('Server is listening on port ' + portNumber);
});
