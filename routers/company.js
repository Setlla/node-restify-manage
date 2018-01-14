const company = require("../models/model").company;

const getCompanyObj = (data) => {
	return {
		name: data.name,
		code: data.code,
		remarks: data.remarks 
	}
}

/*
添加站点
 */
function addCompany() {
	this.exec = (route, req, res) => {
		add(req, res);
	}
}

const add = (req, res) => {
	let companyObj = getCompanyObj(req.body);
	company.create(companyObj).then(result => {
		res.send({isSuccess:true, result: result})
	});
}

/*
获取站点列表
 */
function getCompany() {
	this.exec = (route, req, res) => {
		list(req, res);
	}
}

const list = (req, res) => {
	let params = {};
	if(req.body && req.body.name) {
		params.name = {
			$like: '%' + req.body.name + '%'
		}
	}
	if(req.body && req.body.code) {
		params.code = {
			$like: '%' + req.body.code + '%'
		}
	}
	company.findAll({
		where: params
	}).then(result => {
		res.send({isSuccess:true, result: result})
	})
}

/*
删除站点
 */
function delCompany() {
	this.exec = (route, req, res) => {
		del(req, res);
	}
}

const del = (req, res) => {
	company.destroy({
		where: {
			id: req.body.id
		}
	}).then(result => {
		res.send({isSuccess:true, result: result})
	})
}

/*
编辑站点
 */
function updateCompany() {
	this.exec = (route, req, res) => {
		update(req, res);
	}
}

const update = (req, res) => {
	let companyObj = getCompanyObj(req.body);
	company.update(companyObj, {
		where: {
			id: req.body.id
		}
	}).then(result => {
		res.send({
			isSuccess: true,
			result: result
		});
	});
}



module.exports = {
	addCompany: new addCompany(),
	getCompany: new getCompany(),
	delCompany: new delCompany(),
	updateCompany: new updateCompany()
}
