var nodemailer = require("nodemailer");
var CallbackChecking = require("./CallbackChecking.js");
var LogFan = require("../../LogFan/LogFan.js");
var log = LogFan.createLogger({log_writer:"liufanhh",log_name:'EmailErrorLog'});
/*Sending email function
Formal parameter sample should be 
{
	host: "smtp.126.com",
	user: "sample@126.com",
	pass: "password",
	from: "sample@126.com",
	to:   "receiver@sample.com",
	subject: "Headline",
	content: "email content, format page"
}*/

exports.sendEmail = function(email_info, type){
	try {
		var transport = nodemailer.createTransport("SMTP", {
		    host: email_info.host,
		    secureConnection: true, // use SSL
		    port: 465, // port for secure SMTP
		    auth: {
		        user: email_info.user,
		        pass: email_info.pass
		    }
		});
		transport.sendMail({
		    from: email_info.from,
		    to: email_info.to,
		    subject: email_info.subject,
		    //  generateTextFromHTML : true,
		    html: email_info.content
		}, function(error, info) {
			CallbackChecking.checkCallback(null, error, info, type);
		});
	} catch(e){
		log.Error("SendEmail Function Error", 
			{
				ErrorInfo:e.stack,
			});
	}
}

