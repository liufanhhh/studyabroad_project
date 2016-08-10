var EmailSending = require("../routes/Util/EmailSending.js");
var CallbackChecking = require("../routes/Util/CallbackChecking.js");

exports.sendLogEmail = function(content){
	EmailSending.sendEmail(
		{
			host: "smtp.126.com",
			user: "liuxuedianping@126.com",
			pass: "liufanHH0406",
			from: "liuxuedianping@126.com",
			to:   "1043099804@qq.com",
			subject: "【Important】服务器日志报警",
			content: content
		},
		"LogEmail"
	);
}