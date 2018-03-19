const axios = require('axios');
const crypto = require('crypto');

const EBusinessID = '1324027';
const APIkey = '756f59c5-242a-4bcb-aa8e-fd41ca7d958a';

function getCompanyByNum() {
	this.exec = (route, req, res) => {
		getCompany(req, res);
	}
}

//通过快递单号获取公司名称
async function getCompany(req, res) {
	var requestData = {
		'LogisticCode': req.body.LogisticCode
	};
	requestData = JSON.stringify(requestData);
	var result = await axios({
		method: 'POST',
		headers: {
			'Content-Type': "application/x-www-form-urlencoded"
		},
		data: {
			'EBusinessID': EBusinessID,
			'DataType': '2',
			'RequestType': '2002',
			'RequestData': encodeURIComponent(requestData),
			'DataSign': encrypt(requestData, APIkey)
		},
		transformRequest: [function(data) {
			let ret = ''
			for(let it in data) {
				ret += it + '=' + data[it] + '&'
			}
			ret = ret.substring(0,ret.length-1);
			return ret
		}],
		url: 'http://api.kdniao.cc/Ebusiness/EbusinessOrderHandle.aspx'
	})

	res.send({
		isSuccess: true,
		result: result.data.Shippers
	});
}

//数据内容签名  把(请求内容(未编码)+AppKey)进行MD5加密，然后Base64编码，最后 进行URL(utf-8)编码
function encrypt(data, appkey) {
	var md5 = crypto.createHash('md5');
	var transformData = data + appkey;
	var b = new Buffer(md5.update(transformData, 'utf-8').digest('hex'));
	return b.toString('base64');
}

module.exports = {
	getCompanyByNum: new getCompanyByNum()
}
