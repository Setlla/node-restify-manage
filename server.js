const restify = require('restify');
const fs = require('fs');
//增加cors中间件
const corsMiddleware = require('restify-cors-middleware');

// Setup some https server options
var https_options = {
  key: fs.readFileSync('ssl/214502927270500.key'),
  certificate: fs.readFileSync('ssl/214502927270500.pem')
};

//添加路由表
const router = require("./routerList.js");

const onListened = () => {
	console.log('Node server starts at 443.');
}

const onConnected = (req, res) => {
	router.handleRoute(req.url, req, res);
}

var server = restify.createServer();
var https_server = restify.createServer(https_options);

const cors = corsMiddleware({
    'origins': ['*']
});

server.pre(cors.preflight);
server.use(cors.actual);

https_server.pre(cors.preflight);
https_server.use(cors.actual);

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

https_server.use(restify.plugins.queryParser());
https_server.use(restify.plugins.bodyParser());

server.post(/^\/(.*)/, onConnected);
https_server.post(/^\/(.*)/, onConnected);

server.listen(8000);
https_server.listen(443, onListened);