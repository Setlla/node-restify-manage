const Sequelize = require("sequelize");
const sequelize = require("../connect.js");

//个人中心
const user = sequelize.define('user', {
	username: Sequelize.STRING,
	password: Sequelize.STRING,
	auth: Sequelize.STRING,
	remarks: Sequelize.STRING
});

//站点信息
const site = sequelize.define('site', {
	name: Sequelize.STRING,
	address: Sequelize.STRING,
	province: Sequelize.STRING,
	city: Sequelize.STRING,
	area: Sequelize.STRING,
	territory: Sequelize.STRING,
	contactName: Sequelize.STRING,
	contactNickname: Sequelize.STRING,
	contactPhone: Sequelize.STRING,
	contactWechat: Sequelize.STRING,
	contactHometown: Sequelize.STRING,
	remarks: Sequelize.STRING
});

//快递公司
const company = sequelize.define('company', {
	name: Sequelize.STRING,
	code: Sequelize.STRING,
	remarks: Sequelize.STRING
});

//快递员
const courier = sequelize.define('courier', {
	userID: Sequelize.INTEGER,
	name: Sequelize.STRING,
	nickName: Sequelize.STRING,
	phone: Sequelize.STRING,
	wechat: Sequelize.STRING,
	hometown: Sequelize.STRING,
	province: Sequelize.STRING,
	city: Sequelize.STRING,
	area: Sequelize.STRING,
	siteID: Sequelize.INTEGER,
	remarks: Sequelize.STRING
});

//客户
const customer = sequelize.define('customer', {
	userID: Sequelize.INTEGER,
	name: Sequelize.STRING,
	mPhone: Sequelize.STRING,
	phone: Sequelize.STRING,
	wechat: Sequelize.STRING,
	siteID: Sequelize.INTEGER,
	courierID: Sequelize.INTEGER,
	grade: Sequelize.STRING,
	address1: Sequelize.STRING,
	address2: Sequelize.STRING,
	province: Sequelize.STRING,
	city: Sequelize.STRING,
	area: Sequelize.STRING,
	chargeTime: Sequelize.DATE,
	balance: Sequelize.STRING,
	remarks: Sequelize.STRING
});

//快递信息
const express = sequelize.define('express', {
	number: Sequelize.STRING,
	customerID: Sequelize.INTEGER,
	companyID: Sequelize.INTEGER,
	courierID: Sequelize.INTEGER,
	siteID: Sequelize.INTEGER,
	state: Sequelize.STRING,
	receiverName: Sequelize.STRING,	
	remarks: Sequelize.STRING
});

//快递详细信息
const expressDetail = sequelize.define('expressDetail', {
	number: Sequelize.STRING,
	customerID: Sequelize.INTEGER,
	companyID: Sequelize.INTEGER,
	courierID: Sequelize.INTEGER,
	siteID: Sequelize.INTEGER,
	state: Sequelize.STRING,
	receiverName: Sequelize.STRING,	
	remarks: Sequelize.STRING,
	courierName: Sequelize.STRING,
	courierNickName: Sequelize.STRING,
	courierPhone: Sequelize.STRING,
	courierWechat: Sequelize.STRING,
	courierHometown: Sequelize.STRING,
	companyName: Sequelize.STRING,
	siteName: Sequelize.STRING,
	siteAddress: Sequelize.STRING,
	siteTerritory: Sequelize.STRING,
	contactName: Sequelize.STRING,
	contactPhone: Sequelize.STRING,
	contactWechat: Sequelize.STRING,
	contactNickname: Sequelize.STRING,
	contactHometown: Sequelize.STRING,
	customeName: Sequelize.STRING,
	customerMPhone: Sequelize.STRING,
	customerPhone: Sequelize.STRING,
	customerWechat: Sequelize.STRING,
	customerGrade: Sequelize.STRING,
	balance: Sequelize.STRING,
	chargeTime: Sequelize.DATE
});


module.exports = {
	user: user,
	site: site,
	company: company,
	courier: courier,
	customer: customer,
	express: express,
	expressDetail: expressDetail
};