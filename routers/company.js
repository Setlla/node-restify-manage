const company = require("../models/model").company;

const getCompanyObj = (data) => {
	return {
		id: data.id || null,
		name: data.name,
		code: data.code,
		remarks: data.remarks 
	}
}

/*
添加站点
 */
function addUpdateCompany() {
	this.exec = (route, req, res) => {
		add(req, res);
	}
}

async function add(req, res) {
	let companyObj = getCompanyObj(req.body);
	
	const _company = await company.findOrCreate({
		where: {
			id: companyObj.id,
		},
		defaults: companyObj
	});
	
	if(!_company[0]) {
		res.send({
			isSuccess: true,
			result: _company
		});
	} else {
		update(companyObj, res);
	}
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
	
	let data = req.body;
	if(data) {
		if(data.name) {
			params.name = {
				$like: '%' + data.name + '%'
			}
		}
		if(data.code) {
			params.code = {
				$like: '%' + data.code + '%'
			}
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
const update = (companyObj, res) => {
	company.update(companyObj, {
		where: {
			id: companyObj.id
		}
	}).then(result => {
		res.send({
			isSuccess: true,
			result: result
		});
	});
}



module.exports = {
	addUpdateCompany: new addUpdateCompany(),
	getCompany: new getCompany(),
	delCompany: new delCompany()
}
