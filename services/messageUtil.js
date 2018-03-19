const SMSClient = require('@alicloud/sms-sdk');

const accessKeyId = 'LTAIHjqDafoicGK2',
	  secretAccessKey = 'yteXsCZ5AzAMaGYftFQDMvW2a2WOLC';

async function sendMessage(phone, templateParams) {
	//初始化sms_client
	let smsClient = new SMSClient({accessKeyId, secretAccessKey});
	//发送短信
	var result = await smsClient.sendSMS({
	    PhoneNumbers: phone,
	    SignName: '乡亲派',
	    TemplateCode: 'SMS_127161083',
	    TemplateParam: templateParams
	});
	console.log(result);
	
	return result;
}

module.exports = {
	sendMessage: sendMessage
}