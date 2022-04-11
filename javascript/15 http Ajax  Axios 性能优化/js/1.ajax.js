/*
 * 发送AJAX请求有四步操作
 *   1.创建一个XHR对象
 * 		+ 不兼容XMLHttpRequest的浏览器使用ActiveXObject创建
 *   2.打开请求连接（配置请求信息）
 * 		+ xhr.open([METHOD],[URL],[ASYNC],[USER-NAME],[USE-PASS])
 * 		+ [METHOD]请求方式
 * 			+ GET系列：从服务器获取
 * 			+ POST系列：向服务器发送信息
 * 		+ [ASYNC]是否为异步请求，默认是true，也就是异步，设置为false代表当前请求任务为同步（项目中基本上都采用异步请求）
 *      + [USER-NAME],[USE-PASS] 向服务器发送请求所携带的用户名密码，只有在服务器设置了安全来宾账号的情况下需要（一般不用）
 *   3.监听请求状态，在不同状态中做不同的事情
 *   4.发送AJAX请求（AJAX任务开始，直到响应主体信息返回[AJAX状态为4]代表当前任务结束）
 *  
 * =====================================
 * 
 * GET系列 VS POST系列
 *   不管是哪一种请求方式，客户端都可以把信息传递给服务器，服务器也可以把信息返回给客户端，只不过GET偏向于拿（给的少拿的多），而POST偏向于给（给的多拿的少）
 *   [GET系列]：GET / HEAD（只获取响应头的信息，不获取响应主体内容）/ DELETE（删除，一般代指删除服务器上指定的文件） / OPTIONS（试探性请求，在CROSS跨域请求中，所以正常请求发送前，先发送一个试探请求，验证是否可以和服务器正常的建立连接）
 *   [POST系列]：POST / PUT（新增，一般代指向服务器中新增文件）
 *  
 * 基于GET向服务器发送请求，传递给服务器的方式：
 * 	 + 基于请求头传递给服务器（比如想把本地的Cookie信息传递给服务器）
 *   + 请求URL地址后面的问号传参（主要方式）  xhr.open('get', './data.json?id=2&lx=0') 
 *  
 * 基于POST向服务器发送请求，传递给服务器的方式：
 * 	 + 基于请求头传递给服务器
 *   + 基于请求主体，把信息传递给服务器（主要方式） xhr.open('post', './data.json');  xhr.send(data);
 *  
 * 1. GET请求传递给服务器的信息有大小的限制（因为它是基于地址问号传参方式传递信息，而URL有长度的限制：IE浏览器只有2KB大小...）；而POST请求理论上是没有大小限制的（实际操作中也都会给予限制）；
 * 2. GET请求相对POST请求来说不太安全，也是因为传参是基于地址栏问号传参，会被别人基于URL劫持的方式把信息获取到...所以真实项目中，涉及到安全的信息（例如：密码等）都是基于POST方式传递的（互联网面前人人都在裸奔，没有绝对的安全，我们需要更多的处理安全性）
 * 3. GET请求容易产生缓存，原因还是因为GET是基于问号传参传递信息的，浏览器在每一次获取数据后，一般会缓存一下数据，下一次如果请求的地址和参数和上一次一样，浏览器直接获取缓存中的数据，所以我们基于GET发送请求，需要清除缓存的时候，一般都会在地址栏中添加一个随机数
 *    xhr.open('get', './data.json?lx=1&name=zhufeng&_='+Math.random())
 *  
 * 传递给服务器的数据格式：
 *   + application/x-www-form-urlencoded：xxx=xxx&xxx=xxx （最常用的方式） 【字符串】
 * 	 + multipart/form-data （也很常用，例如：表单提交或者文件上传）  【对象】
 *   + raw （可以上传text、json、xml、html等格式的文本，富文本编辑器中的内容可以基于这种格式传递）
 *   + binary （上传二进制数据或者编码格式的数据）
 *   + ...
 */
/* let xhr = new XMLHttpRequest;
xhr.open('get', './data.json?lx=1&name=zhufeng');
xhr.send();

xhr = new XMLHttpRequest;
xhr.open('post', './data.json');
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.send('lx=1&name=zhufeng&obj=' + encodeURIComponent(JSON.stringify({
	name: '哈哈'
})));

xhr = new XMLHttpRequest;
xhr.open('post', './data.json');
xhr.setRequestHeader('Content-Type', 'multipart/form-data');
let formData = new FormData();
formData.append('lx', 2);
formData.append('name', 'zhufeng');
formData.append('obj', {
	name: '哈哈'
});
xhr.send(formData); */


/*
 * 状态码：AJAX状态码 \ 服务器返回的HTTP网络状态码（代表了服务器返回信息的状态）
 *    https://baike.baidu.com/item/HTTP%E7%8A%B6%E6%80%81%E7%A0%81/5053660?fr=aladdin#2_3
 * 
 *    [2开头的基本都是代表成功]
 *    	+ 200 OK 正常返回数据
 * 
 *    [3开头的一般也是成功了，只不过中间做了一些额外处理]
 *    	+ 301 Moved Permanently 永久性转移/重定向   一般应用于网站域名更换，访问老域名，永久都跳转到新的域名上
 * 		+ 302 Move Temporarily 临时转移
 * 		+ 307 Temporary Redirect 临时重定向   一般应用于服务器的负载均衡
 * 		+ 304 Not Modified 读取的是缓存中的数据   这个是客户端和服务器端共建的协商缓存（把不经常更新，请求过的资源文件做缓存，后期在访问这些资源直接走缓存数据，除非服务器端更新了此资源，或者客户端强制清缓存刷新等）
 *    
 *    [4开头的都是失败：失败的原因一般都是客户端的问题]
 *    	+ 400 Bad Request  请求参数错误
 *      + 401 Unauthorized 无权限访问
 * 		+ 404 Not Found  地址错误
 *      + 405 Method Not Allowed 当前请求的方式服务器不支持
 * 
 *    [5开头的都是失败：失败的原因一般都是服务器问题]
 *      + 500 Internal Server Error  未知服务器错误
 * 		+ 503 Service Unavailable  服务器超负荷
 *  
 * 真实项目中，后台开发者可能不是按照这个规则来进行处理的，不管传参或者权限是否正确等，只要服务器接收到请求最后都给返回200，再返回的JSON数据中，基于某一个字段（例如：code）来表示错误信息
 *    {
 *        code:0, 0成功  1无权限  2参数错误  3服务器错误 ....
 *        message:'' 当前状态的具体描述
 *    }
 */
let xhr = new XMLHttpRequest;
xhr.open('get', './data.json');
// xhr.timeout = 100; 设置超时时间
// xhr.withCredentials=true; 跨域资源共享中，允许携带资源凭证
// xhr.abort() 强制中断AJAX请求
// xhr.setRequestHeader() 设置请求头信息（记住：属性值不能是中文和特殊字符）
xhr.setRequestHeader('name', encodeURIComponent("珠峰培训"));
xhr.onreadystatechange = function () {
	let status = xhr.status,
		state = xhr.readyState,
		result = null;
	if (!/^(2|3)\d{2}$/.test(status)) {
		// 错误处理
		return;
	}
	// AJAX状态码为2的时候，响应头信息回来了
	if (state === 2) {
		// 获取响应头信息
		console.log(xhr.getAllResponseHeaders());
		// console.log(xhr.getResponseHeader('date')); //=>获取的服务器日期是格林尼治时间 GMT（比北京时间晚了八个小时 北京时间：GMT+0800）
		console.log(new Date(xhr.getResponseHeader('date'))); //=>转换为北京时间
		return;
	}
	if (state === 4) {
		// 获取响应主体信息  responseText/responseType/responseXML
		result = xhr.response;
		console.log(result);
	}
};
xhr.send();
/* SEND后：首先响应头信息回来  最后响应主体信息再回来 */