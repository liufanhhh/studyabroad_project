var Q = require('q');
var UserProfileModel = require("../model/UserProfileModel.js");
var MerchantProfileModel =  require("../model/UserProfileModel.js");


var user_realname = "刘凡";
var user_nickname = "liufanhh";
var email = "1043099804@qq.com";
var password = "123QIbuZOU";
var userid = "12010419930406605X";
var user_status = "user";

var findUserByNickname = Q.nfbind(UserProfileModel.findUserByNickname.bind(UserProfileModel));
var findUserByEmail =  Q.nfbind(UserProfileModel.findUserByEmail.bind(UserProfileModel));
var createSimpleUser =  Q.nfbind(UserProfileModel.createSimpleUser.bind(UserProfileModel));

findUserByNickname("liufanhh")
.then(function(user){
	if (user) {
	    console.log("用户名重复");
	}else{
		findUserByEmail(email);
	};
},function(error){
	console.log("数据库错误");
})
.then(function(user){
	if (user) {
	    console.log("邮箱重复");
	}else{
		createSimpleUser(user_nickname,user_realname,email,password,userid);
	};
},function(error){
	console.log("数据库错误");
})
.then(function(user){
	console.log("注册成功");
},function(error){
	console.log("注册失败");
});