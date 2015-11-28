var Q = require('q');
var fs = require('fs');

var UserProfileModel = require("../../model/UserProfileModel.js");


exports.getOneUser = function(req,res) {
	UserProfileModel.findUserByEmail(req.body.email,function(err,user){
		res.sendData(user,"success");
	});	
}

exports.getOneUserNew = function(req,res) {
	UserProfileModel.findUserByNickname(req.query.name,function(err,user){
		if (err) {
			res.sendError(err);
		} else{
			res.sendData(user,"success");
			$scope.username = res.user.nickname;
		}
	});	
}
