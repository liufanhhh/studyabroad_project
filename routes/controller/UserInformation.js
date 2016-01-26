var Q = require('q');
var fs = require('fs');
var md5 = require("../md5.min.js");

var UserProfileModel = require("../../model/UserProfileModel.js");


exports.getOneUser = function(req, res) {
	UserProfileModel.findUserByEmail(req.body.email,function(err,user){
		res.sendData(user,"success");
	});	
}

exports.userLogin = function (req, res) {
	var user = req.body.user;
	var signature = 

	$scope.person.password = signature(token, $scope.person.password);
	var salt = $scope.person.salt = new Date();
	$scope.person.signature = signature(salt, $scope.person.password);


	UserProfileModel.findUserByEmail(user.email,function(err,user_profile){
		if (user_profile) {
			var signature = md5(user.salt+"liufanhh"+md5(password));
			if (user.password == user_profile.password&&user.signature==signature) {
				req.session.user_id = user_profile.user_id;
				res.status(200).send({location:'/user/login'});
			} else{
				res.sendError("密码错误");
			};
		} else if(user==null){
			res.sendError("用户不存在");
		} else if(err){
			res.sendError(err);
		};
	});	
}

exports.nameChecking = function(req, res) {
	var name = req.body.name;

	UserProfileModel.findUserByNickname(name,function(err,user){
		if (err) {
			res.sendError(err);
		} else if(user!=null){
			res.sendError("用户名重复");
		} else{
			res.sendSuccess("success");
		}
	});	
}

exports.emailChecking = function(req, res) {
	var email = req.body.email;

	UserProfileModel.findUserByEmail(email,function(err,user){
		if (err) {
			res.sendError(err);
		} else if(user!=null){
			res.sendError("邮箱重复");
		} else{
			res.sendSuccess("success");
		}
	});	
}

exports.getToken = function  (req, res) {
	UserProfileModel.findUserByEmail(req.body.email,function(err,user){
		if (error) {
			res.sendError(err);
		} else if(user){
			res.sendData(user.create_time, "success");
		} else{
			res.sendError("没有此用户");
		}
	});	
}

exports.getOneUserNew = function(req, res) {
	UserProfileModel.findUserByNickname(req.query.name,function(err,user){
		if (err) {
			res.sendError(err);
		} else{
			res.sendData(user,"success");
		}
	});	
}

exports.emailVerify = function (req, res) {
	if (req.session.sign == req.query.sign) {
		req.session.user_verify = true;
        res.status(301).redirect('/');
	} else {
		res.status(401).send("<p>IP 已变更或验证码已经失效</p>");
	};
}
