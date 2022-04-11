const CONFIG = {
	//=>WEB服务端口号
	PORT: 1001
};

/*-CREATE SERVER-*/
const express = require('express'),
	app = express();
app.listen(CONFIG.PORT, () => {
	console.log(`THE WEB SERVICE IS CREATED SUCCESSFULLY AND IS LISTENING TO THE PORT：${CONFIG.PORT}`);
});

/*-MIDDLE WARE-*/
app.use((req, res, next) => {
	// 允许CORS跨域资源请求
	// 1.允许的源ORIGIN有两种写法
	//   "*" ：允许所有客户端发送请求，但是不能携带资源凭证（Credentials===false）
	//   "xxx"：想要携带资源凭证，只能指定一个源，不能指定多个
	res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,HEAD");
	// 2.POST请求中，在请求发送前，一般都会先发送一个OPTIONS试探请求，目的是验证，当前请求能否和服务器端建立链接，能链接上在发正式请求
	req.method === 'OPTIONS' ? res.send('CURRENT SERVICES SUPPORT CROSS DOMAIN REQUESTS!') : next();
});

/* 
 * JSONP的服务器端处理：所有的JSONP请求都需要服务器端接收到请求后做特殊处理
 */
/* app.get('/test', (req, res) => {
	let {
		lx,
		name,
		callback //callback存储的就是客户端传递过来的函数名
	} = req.query;
	let data = {
		code: 0,
		codeText: 'SUCCESS',
		text: `LX：${lx} === NAME：${name}`
	};
	//=>特殊处理：把客户端传递的函数名和需要给客户端的数据，拼成这样的格式 “函数(数据)”
	res.send(`${callback}(${JSON.stringify(data)})`);
}); */


app.get('/test', (req, res) => {
	let data = {
		code: 0,
		codeText: 'SUCCESS'
	};
	res.send(data);
});

app.use(express.static('./'));