const site = require("../models/model").site;
const result = require("../services/getResult");

const getSiteObj = (data) => {
	return {
		name: data.name,
		address: data.address,
		province: data.province,
		city: data.city,
		area: data.area,
		territory: data.territory,
		contactName: data.contactName,
		contactNickname: data.contactNickname,
		contactPhone: data.contactPhone,
		contactWechat: data.contactWechat,
		contactHometown: data.contactHometown,
		remarks: data.remarks 
	}
}

/*
添加站点
 */
function addSite() {
	this.exec = (route, req, res) => {
		add(req, res);
	}
}

const add = (req, res) => {
	let siteObj = getSiteObj(req.body);
	site.create(siteObj).then(result => {
		res.send({isSuccess:true, result: result})
	});
}

/*
获取站点列表
 */
function getSite() {
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
	site.findAll({
		where: params
	}).then(result => {
		res.send({isSuccess:true, result: result})
	})
}

/*
删除站点
 */
function delSite() {
	this.exec = (route, req, res) => {
		del(req, res);
	}
}

const del = (req, res) => {
	site.destroy({
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
function updateSite() {
	this.exec = (route, req, res) => {
		update(req, res);
	}
}

const update = (req, res) => {
	let siteObj = getSiteObj(req.body);
	site.update(siteObj, {
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
	addSite: new addSite(),
	getSite: new getSite(),
	delSite: new delSite(),
	updateSite: new updateSite()
}
