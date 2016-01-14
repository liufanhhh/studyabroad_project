var Q = require('q');
var fs = require('fs');

var UserProfileModel = require("../../model/UserProfileModel.js");


exports.getOneUser = function(req, res) {
	UserProfileModel.findUserByEmail(req.body.email,function(err,user){
		res.sendData(user,"success");
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

exports.getOneUserNew = function(req,res) {
	UserProfileModel.findUserByNickname(req.query.name,function(err,user){
		if (err) {
			res.sendError(err);
		} else{
			res.sendData(user,"success");
		}
	});	
}
