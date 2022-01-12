const http = require('http');
const { routers } = require('./routers/routers');

const { CONFIG, STATUS_CODE } = require('./configurations');

require('dotenv').config();
require('./dataBase/dataBase');

http.createServer(async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Content-Type', 'application/json, text/plain; charset=utf-8;');
    res.setHeader('Access-Control-Max-Age', '-1');

    if (req.method === "OPTIONS") {
        res.statusCode = 200;
        return res.end();
    }

    req.on('error', (err) => {
        console.error('Server error: ', err);
        res.statusCode = STATUS_CODE.INTERNAL_SERVER_ERROR;
        res.end(JSON.stringify({ message: err }));
    });

    const buffer = [];

    req.on('data', chunk => {
        buffer.push(chunk);
    });

    req.on('end', async () => {
        const body = buffer.length ?
            JSON.parse(buffer) : JSON.stringify({ message: "body is empty" });
        await routers({ req, res, body });
    });

}).listen(CONFIG.PORT, () => {
    console.log(`App listen port: ${CONFIG.PORT}`);
});