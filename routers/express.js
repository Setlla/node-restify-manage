const expressDetail = require("../models/model").expressDetail;
const express = require("../models/model").express;

const getExpressObj = (data) => {
	return {
		id: data.id || null,
		number: data.number,
		customerID: data.customerID || null,
		companyID: data.companyID || null,
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
			params.number = {
				$like: '%' + data.number + '%'
			}
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
获取快递信息列表
 */
function addExpress() {
	this.exec = (route, req, res) => {
		add(req, res);
	}
}

async function add(req, res) {
	let expressObj = getExpressObj(req.body);

	const _express = await customer.findOrCreate({
		where: {
			id: expressObj.id,
		},
		defaults: expressObj
	});

	if(!_express[0]) {
		res.send({
			isSuccess: true,
			result: _express
		});
	} else {
		update(expressObj, res);
	}
}


/*
编辑快递信息
 */
const update = (expressObj, res) => {
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
	addExpress: new addExpress()
}