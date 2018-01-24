const customer = require("../models/model").customer;

const getCustomerObj = (data) => {
	return {
		id: data.id || null,
		userID: data.userID || null,
		name: data.name,
		mPhone: data.mPhone,
		phone: data.phone,
		wechat: data.wechat,		
		siteID: data.siteID || null,
		courierID: data.courierID || null,
		grade: data.grade,
		address1: data.address1,
		address2: data.address2,		
		province: data.province,
		city: data.city,
		area: data.area,
		chargeTime: data.chargeTime,
		balance: data.balance || null,
		remarks: data.remarks		
	}
}

/*
添加快递员 默认新增用户信息，设置初始密码
 */
function addUpdateCustomer() {
	this.exec = (route, req, res) => {
		add(req, res);
	}
}

async function add(req, res) {
	let customerObj = getCustomerObj(req.body);

	const _customer = await customer.findOrCreate({
		where: {
			id: customerObj.id,
		},
		defaults: customerObj
	});

	if(!_customer[0]) {
		res.send({
			isSuccess: true,
			result: _customer
		});
	} else {
		update(customerObj, res);
	}
}

/*
获取快递员列表
 */
function getCustomer() {
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
		if(data.courierID) {
			params.courierID = data.courierID
		}
		if(data.id) {
			params.id = data.id
		}
		if(data.mPhone) {
			params.mPhone = {
				$like: '%' + data.mPhone + '%'
			}
		}
		if(data.grade) {
			params.grade = data.grade
		}
	}

	customer.findAll({
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
function delCustomer() {
	this.exec = (route, req, res) => {
		del(req, res);
	}
}

const del = (req, res) => {
	customer.destroy({
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

/*
编辑快递员
 */
const update = (customerObj, res) => {
	customer.update(customerObj, {
		where: {
			id: customerObj.id
		}
	}).then(result => {
		res.send({
			isSuccess: true,
			result: result
		});
	});
}

module.exports = {
	addUpdateCustomer: new addUpdateCustomer(),
	getCustomer: new getCustomer(),
	delCustomer: new delCustomer()
}