const expressDetail = require("../models/model").expressDetail;
const express = require("../models/model").express;

const getExpressObj = (data) => {
	return {
		id: data.id || null,
		number: data.number,
		customerID: data.customerID || null,
		companyName: data.companyName || null,
		courierID: data.courierID || null,
		siteID: data.siteID || null,		
		state: data.state,
		receiverName: data.receiverName,
		remarks: data.remarks
	}
}

/*
获取快递信息列表
 */
function getListExpressDetail() {
	this.exec = (route, req, res) => {
		listDetail(req, res);
	}
}

const listDetail = (req, res) => {
	let params = {};

	let data = req.body;
	if(data) {
		if(data.number) {
			params.number = data.number
		}
		if(data.customeName) {
			params.customeName = {
				$like: '%' + data.customeName + '%'
			}
		}
		if(data.customerMPhone) {
			params.customerMPhone = {
				$like: '%' + data.customerMPhone + '%'
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
		if(data.state) {
			params.state = data.state
		}
		if(data.startTime || data.endTime) {
			params.updatedAt = {
				$lt: data.endTime ? new Date(data.endTime) : new Date(),
				$gt: data.startTime ? new Date(data.startTime) : new Date(1970, 0, 1, 8)
			}
		}
	}

	expressDetail.findAll({
		where: params
	}).then(result => {
		res.send({
			isSuccess: true,
			result: result
		})
	})
}

/*
集散中心录入快递信息
 */

function addExpress() {
	this.exec = (route, req, res) => {
		add(req, res);
	}
}

async function add(req, res) {
	let expressObj = getExpressObj(req.body);
	
	const _express = await express.findOrCreate({
		where: {
			number: expressObj.number
		},
		defaults: expressObj
	});
	
	if(_express[1]) {
		//发送快递通知信息
		
		res.send({
			isSuccess: true,
			result: expressObj
		});
	} else {
		res.send({
			isSuccess: false,
			result: '该快速单号已扫描'
		});
	}
}

/**
 * 拿到快递后发送信息模板   乡亲派【快递员昵称】已为您代取【快递公司名称】单号为【单号】的包裹，正在送往【对应服务站】。
 集散中心拿到快递之后的录入
 * */
function sendMessage() {
	
}


/*
 * 站点更新快递信息，更新当前快递负责人，客户签收快递
 */
function updateExpress() {
	this.exec = (route, req, res) => {
		update(req, res);
	}
}


/*
更新快递信息
 */
const update = (req, res) => {
	var data = req.body;
	let expressObj = {
		id: data.id,
	    courierID: data.courierID,
	    state: data.state
	};
	express.update(expressObj, {
		where: {
			id: expressObj.id
		}
	}).then(result => {
		res.send({
			isSuccess: true,
			result: result
		});
	});
}


/*
 * 客户签收快递
 */
function signExpress() {
	this.exec = (route, req, res) => {
		sign(req, res);
	}
}


/*
签收
 */
const sign = (req, res) => {
	var data = req.body;
	let expressObj = {
		id: data.id,
	    state: data.state,
	    receiverName: data.receiverName
	};
	express.update(expressObj, {
		where: {
			id: expressObj.id
		}
	}).then(result => {
		res.send({
			isSuccess: true,
			result: result
		});
	});
}

module.exports = {
	getListExpressDetail: new getListExpressDetail(),
	addExpress: new addExpress(),
	updateExpress: new updateExpress(),
	signExpress: new signExpress()
}