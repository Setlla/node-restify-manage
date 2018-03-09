const axios = require('axios');

const appid = 'wx8ebf557aa45d5b20',
	secret = '30c40b43c292402c07f1012d7c931fca',
	grant_type = 'authorization_code';

//通过code获取openid
async function getWechatLogin(code) {
	var result = await axios({
		method: 'GET',
		url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=${grant_type}`
	})

	if(result.data.errcode) {
		return false
	} else {
		var data = result.data;
		var loginKey = await get3rd_session();
		var sessionKey = data.session_key;
		var openid = data.openid;
		return {
			loginKey: loginKey,
			sessionKey: sessionKey,
			openid: openid
		}
	}
}

function get3rd_session() {　　
	var len = 168;　　
	var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/ 　　
	var maxPos = chars.length;　　
	var pwd = '';　　
	for(i = 0; i < len; i++) {　　　　
		pwd += chars.charAt(Math.floor(Math.random() * maxPos));　　
	}
	console.log(pwd);　
	return pwd;
}

module.exports = {
	getWechatLogin: getWechatLogin
}