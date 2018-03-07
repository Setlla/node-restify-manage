const restify = require('restify');
//增加cors中间件
const corsMiddleware = require('restify-cors-middleware');

//添加路由表
const router = require("./routerList.js");

const onListened = () => {
	console.log('Node server starts at 80.');
}

const onConnected = (req, res) => {
	router.handleRoute(req.url, req, res);
}

const server = restify.createServer();

const cors = corsMiddleware({
    'origins': ['*']
});

server.pre(cors.preflight);
server.use(cors.actual);

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.post(/^\/(.*)/, onConnected);

server.listen(80);