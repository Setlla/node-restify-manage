const SMSClient = require('@alicloud/sms-sdk');

function sendMessage(phone, templateParams) {
	//初始化sms_client
	var accessKeyId = 'LTAIHjqDafoicGK2';
	var secretAccessKey = 'yteXsCZ5AzAMaGYftFQDMvW2a2WOLC';
	  
	let smsClient = new SMSClient({accessKeyId, secretAccessKey});
  
  //发送短信
	smsClient.sendSMS({
	    PhoneNumbers: phone,
	    SignName: '乡亲派',
	    TemplateCode: 'SMS_127159523',
	    TemplateParam: templateParams
	}).then(function (res) {
	    let {Code}=res
	    if (Code === 'OK') {
	        //处理返回参数
	        console.log(res)
	    }
	}, function (err) {
	    console.log(err)
	})

}

module.exports = {
	sendMessage: sendMessage
}