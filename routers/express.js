const expressDetail = require("../models/model").expressDetail;

/*
获取快递员列表
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

module.exports = {
	getListExpressDetail: new getListExpressDetail()
}