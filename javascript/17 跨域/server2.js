const CONFIG = {
	//=>WEB服务端口号
	PORT: 1002
};

/*-CREATE SERVER-*/
const express = require('express'),
	app = express();
app.listen(CONFIG.PORT, () => {
	console.log(`THE WEB SERVICE IS CREATED SUCCESSFULLY AND IS LISTENING TO THE PORT：${CONFIG.PORT}`);
});

app.use(express.static('./'));