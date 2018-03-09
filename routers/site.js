const site = require("../models/model").site;

const getSiteObj = (data) => {
	return {
		id: data.id || null,
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
function addUpdateSite() {
	this.exec = (route, req, res) => {
		add(req, res);
	}
}

async function add(req, res) {
	let siteObj = getSiteObj(req.body);
	const _site = await site.findOrCreate({
		where: {
			id: siteObj.id,
		},
		defaults: siteObj
	});
	
	if(_site[1]) {
		res.send({
			isSuccess: true,
			result: _site
		});
	} else {
		update(siteObj, res);
	}
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
	let data = req.body;
	if(data) {
		if(data.name) {
			params.name = {
				$like: '%' + data.name + '%'
			}
		}
		if(data.id) {
			params.id = data.id
		}
	}

	site.findAll({
		where: params
	}).then(result => {
		res.send({
			isSuccess: true,
			result: result
		})
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
		res.send({
			isSuccess: true,
			result: result
		})
	})
}

/*
编辑站点
 */
const update = (siteObj, res) => {
	site.update(siteObj, {
		where: {
			id: siteObj.id
		}
	}).then(result => {
		res.send({
			isSuccess: true,
			result: result
		})
	})
}

module.exports = {
	addUpdateSite: new addUpdateSite(),
	getSite: new getSite(),
	delSite: new delSite()
}