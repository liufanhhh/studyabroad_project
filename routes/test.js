var Q = require('q');
var UserProfileModel = require("../model/UserProfileModel.js");
var MerchantProfileModel =  require("../model/UserProfileModel.js");


var user_realname = "aa";
var user_nickname = "dd";
var email = "1043099804@qq.com";
var password = "123QIbuZOU";
var userid = "12010419930406605X";
var user_status = "user";

var findUserByNickname = Q.nfbind(UserProfileModel.findUserByNickname.bind(UserProfileModel));
// var findUserByEmail =  Q.nfbind(UserProfileModel.findUserByEmail.bind(UserProfileModel));
// var createSimpleUser =  Q.nfbind(UserProfileModel.createSimpleUser.bind(UserProfileModel));

var nameFind = function(exist){
	if (exist) {
	    console.log("用户名重复");
		console.log(exist);
		var deferred = Q.defer();
		deferred.resolve(1);
		return deferred.promise;
	}else{
		findUserByEmail(email);
		console.log(exist);
	};
}

var emailFind = function(exist){
	if (exist===1) {
	    console.log("邮箱重复");
	    var deferred = Q.defer();
	    deferred.resolve(1);
	    return deferred.promise;
	}else{
		createSimpleUser(user_nickname,user_realname,email,password,userid);
	};
}

findUserByNickname(user_nickname)
.then(nameFind)
.then(emailFind)
.done(
console.log("注册成功");
),function(error){
	console.log("注册失败");
});