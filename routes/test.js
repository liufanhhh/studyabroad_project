// // var md5 = require('./md5.min.js');
// var nodemailer = require('nodemailer');
// // console.log(md5("123"));



// var transport = nodemailer.createTransport("SMTP", {
//     host: "smtp.126.com",
//     secureConnection: true, // use SSL
//     port: 465, // port for secure SMTP
//     auth: {
//         user: "liuxuedianping@126.com",
//         pass: "liufanHH0406"
//     }
// });

// transport.sendMail({
//     from: "liuxuedianping@126.com",
//     to: "1043099804@qq.com",
//     subject: "【Hello】 邮箱验证",
//     html: "<b>欢迎使用</b><br/>请点击链接进行验证:" + "localhost:3000/verification?sign"
// }, function(error, response) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Message sent: " + response.message);
//     }
//     transport.close();
// });

var date = new Date().getTime()+20*60*60;
console.log(date);

// var transport = nodemailer.createTransport("SMTP", {
//     host: "smtp.126.com",
//     secureConnection: true, // use SSL
//     port: 465, // port for secure SMTP
//     auth: {
//         user: "passwordcomatrix@126.com",
//         pass: "5211314comatrix"
//     }
// });
// transport.sendMail({
//     from: "passwordcomatrix@126.com",
//     to: "1043099804@qq.com",
//     subject: "【Co-Matrix】 找回您的密码",
//     //  generateTextFromHTML : true,
//     html: "<b>欢迎使用comatrix</b><br/>您找回密码的验证码为："
// }, function(error, response) {
//     if (error) {
//         console.log(error);
//         res.senderror("发送失败");
//     } else {
//         console.log("Message sent: " + response.message);
//     }
//     transport.close();
// });