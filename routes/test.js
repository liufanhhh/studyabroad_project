var md5 = require('./md5.min.js');
console.log(md5("ag_external_id=12685ag_name=7nujoom_coinsag_type=fixedamount=1currencyCode=USDemail=haoxiaohu@feinno.comhistory=1464943972key=d56b2cabc6a041063dfdcaa762d4145eorderId=cb9019a6-1411-49e9-b909-1ca13a978450ps=testsign_version=2uid=541086widget=p2_1139b374e5fadb4aa6931caee0777baae"));

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