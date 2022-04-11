axios.defaults.baseURL = 'http://127.0.0.1:1001';
// 允许跨域资源共享的时候携带资源凭证（很重要：因为项目中我们要携带cookie信息给服务器，这个必须设置为TRUE）
axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = function (data) {
	if (!data) return data;
	let result = ``;
	for (let attr in data) {
		if (!data.hasOwnProperty(attr)) break;
		result += `&${attr}=${data[attr]}`;
	}
	return result.substring(1);
};
axios.interceptors.response.use(function onFulfilled(response) {
	return response.data;
}, function onRejected(reason) {
	return Promise.reject(reason);
});
axios.defaults.validateStatus = function (status) {
	return /^(2|3)\d{2}$/.test(status);
}