const express = require('express');
const app = express();
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const path = require('path');

const PORT = 8080;
const STATIC = path.resolve(__dirname);
const INDEX = path.resolve(__dirname, "index.html");

app.use(express.static(STATIC));

const serverOne = 'http://localhost:8085';
app.all("/api/*", function (req, res) {
    console.log('redirecting  to Server1');
    apiProxy.web(req, res, { target: serverOne });
});

// add more proxy here....

app.get("*", function (req, res) {
    res.sendFile(INDEX);
});

app.listen(PORT, () => {
    console.log(`server is up on ${PORT}`)
})