const courier = require("../models/model").courier;
const getWechatLogin = require("../services/wechatUtil").getWechatLogin;

const getCourierObj = (data) => {
	return {
		id: data.id || null,
		userID: data.userID || null,
		name: data.name,
		nickName: data.nickName,
		phone: data.phone,
		wechat: data.wechat,
		hometown: data.hometown,
		province: data.province,
		city: data.city,
		area: data.area,
		siteID: data.siteID || null,
		remarks: data.remarks
	}
}

/*
添加快递员
 */
function addCourierByWechat() {
	this.exec = (route, req, res) => {
		add(req, res);
	}
}

async function add(req, res) {
	var data = req.body;

	var objData = await getWechatLogin(data.code);

	if(!objData) {
		res.send({
			isSuccess: false,
			result: 'code无效'
		});
		return;
	}
	if(data.name && data.siteID && data.phone) {
		objData.name = data.name;
		objData.siteID = data.siteID;
		objData.phone = data.phone;
	}else {
		res.send({
			isSuccess: false,
			result: '注册信息不完整'
		})
		return;
	}

	let result = await courier.findOrCreate({
		where: {
			openid: objData.openid,
		},
		defaults: objData
	});

	if(result[1]) {
		result = result[0].dataValues;
		var obj = {
			id: result.id,
			name: result.name,
			siteID: result.siteID,
			loginKey: result.loginKey
		}
		res.send({
			isSuccess: true,
			result: obj
		});
	} else {
		result = result[0].dataValues;
		objData.id = result.id;
		objData.name = result.name;
		objData.siteID = result.siteID
		update(objData, res);
	}

}

/**
 * 快递员是否已注册
 */
function isRegisterCourier() {
	this.exec = (route, req, res) => {
		isRegister(req, res);
	}
}

async function isRegister(req, res) {
	var data = req.body;

	var objData = await getWechatLogin(data.code);

	if(!objData) {
		res.send({
			isSuccess: false,
			result: 'code无效'
		});
		return;
	}

	courier.findAll({
		where: {
			openid: objData.openid
		}
	}).then(result => {
		if(result.length) {
			result = result[0].dataValues;
			var obj = {
				id: result.id,
				name: result.name,
				loginKey: result.loginKey,
				siteID: result.siteID
			}
			res.send({
				isRegister: true,
				result: obj
			})
		}else {
			res.send({
				isRegister: false,
				result: ''
			})
		}
	})
}

/*
编辑快递员
 */
function updateCourier() {
	this.exec = (route, req, res) => {
		let courierObj = getCourierObj(req.body);
		update(courierObj, res);
	}
}

function update(courierObj, res) {
	var obj = {
		id: courierObj.id,
		name: courierObj.name,
		loginKey: courierObj.loginKey,
		siteID: courierObj.siteID
	}
	courier.update(courierObj, {
		where: {
			id: courierObj.id
		}
	}).then(result => {
		res.send({
			isSuccess: true,
			result: obj
		});
	});
}

/*
获取快递员列表
 */
function getCourier() {
	this.exec = (route, req, res) => {
		list(req, res);
	}
}

const list = (req, res) => {
	let params = {};

	let data = req.body;
	if(data) {
		if(data.name) {
			params.name = {
				$like: '%' + data.name + '%'
			}
		}
		if(data.siteID) {
			params.siteID = data.siteID
		}
		if(data.id) {
			params.id = data.id
		}
	}

	courier.findAll({
		where: params
	}).then(result => {
		res.send({
			isSuccess: true,
			result: result
		})
	})
}

/*
删除快递员
 */
function delCourier() {
	this.exec = (route, req, res) => {
		del(req, res);
	}
}

const del = (req, res) => {
	courier.destroy({
		where: {
			id: req.body.id
		}
	}).then(result => {
		res.send({
			isSuccess: true,
			result: result
		})
	})
}

module.exports = {
	updateCourier: new updateCourier(),
	getCourier: new getCourier(),
	delCourier: new delCourier(),
	addCourierByWechat: new addCourierByWechat(),
	isRegisterCourier: new isRegisterCourier()
}