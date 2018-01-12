const user = require("../models/model").user;
const result = require("../services/getResult");
const encodeToken = require("../token").encodeToken

/*
 用户登录
 */
function login() {
	this.exec = (route, req, res) => {
		getLogin(req, res);
	}
}

const getLogin = (req, res) => {
	const data = req.body;
	user.findAll({
		where: {
			username: data.username,
			password: data.password
		}
	}).then(user => {
		if(user[0]) {
			sendToken(user[0], res);
		} else {
			res.send({
				islogin: false,
				result: result.loginFail
			});
		}

	})
}

//token处理
function sendToken(userinfo, res) {
	var token = encodeToken(userinfo.dataValues);
	res.send({
		islogin: true,
		token: token
	});
}

module.exports = {
	login: new login()
}