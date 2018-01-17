const courier = require("../models/model").courier;

const getCourierObj = (data) => {
	return {
		id: data.id || null,
		userID: data.userID,
		name: data.name,
		nickName: data.nickName,
		phone: data.phone,
		wechat: data.wechat,
		hometown: data.hometown,
		province: data.province,
		city: data.city,
		area: data.area,
		siteID: data.siteID,
		remarks: data.remarks
	}
}

/*
添加快递员
 */
function addUpdateCourier() {
	this.exec = (route, req, res) => {
		add(req, res);
	}
}

async function add(req, res) {
	let courierObj = getCourierObj(req.body);
	
	const _courier = await courier.findOrCreate({
		where: {
			id: courierObj.id,
		},
		defaults: courierObj
	});
	
	if(_courier[1]) {
		res.send({
			isSuccess: true,
			result: _Courier
		});
	} else {
		update(courierObj, res);
	}
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
	}
	
	courier.findAll({
		where: params
	}).then(result => {
		res.send({isSuccess:true, result: result})
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
		res.send({isSuccess:true, result: result})
	})
}

/*
编辑快递员
 */
const update = (courierObj, res) => {
	courier.update(courierObj, {
		where: {
			id: courierObj.id
		}
	}).then(result => {
		res.send({
			isSuccess: true,
			result: result
		});
	});
}

module.exports = {
	addUpdateCourier: new addUpdateCourier(),
	getCourier: new getCourier(),
	delCourier: new delCourier()
}
