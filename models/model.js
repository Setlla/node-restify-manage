const Sequelize = require("sequelize");
const sequelize = require("../connect.js");

//个人中心
const user = sequelize.define('user', {
	username: Sequelize.STRING,
	password: Sequelize.STRING,
	auth: Sequelize.STRING,
	remarks: Sequelize.STRING
});

module.exports = {
	user: user
};