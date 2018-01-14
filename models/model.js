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

module.exports = {
	user: user,
	site: site,
	company: company 
};