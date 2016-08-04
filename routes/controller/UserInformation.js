var Q = require('q');
var fs = require('fs');
var signature = require("../Util/Signature.js");

var UserProfileModel = require("../../model/UserProfileModel.js");


exports.getOneUser = function(req, res) {
	UserProfileModel.findUserByEmail(req.body.email,function(err,user){
		res.sendData(user,"success");
	});	
}

exports.userLogin = function (req, res) {
	var user = req.body.user;

	var findUserByEmail = Q.nfbind(UserProfileModel.findUserByEmail.bind(UserProfileModel));

	var handleEmailResult = function(user_email_profile){
	  var deferred = Q.defer();
	  if (user_email_profile) {
	    deferred.resolve(user_email_profile);
	  }else{
	    UserProfileModel.findUserByNickname(user.name_email, function (err, user_name_profile) {
	      if (user_name_profile) {
	        deferred.resolve(user_name_profile);
	      } else{
	        deferred.reject("没有此用户");
	      };
	      return deferred.promise;
	    });
	  }
	  return deferred.promise;
	}

	findUserByEmail(user.name_email)
	.then(handleEmailResult)
	.done(function(user_profile){
		var confirm_signature = signature.calculate(user.salt, user_profile.password);
		console.log(user_profile.create_time);
		console.log(confirm_signature);
		console.log(user.signature);
		console.log(user_profile.password);
		console.log(user.password_sign);
		if (user_profile.password==user.password_sign&&confirm_signature==user.signature) {
			if (user_profile.email_confirm) {
				req.session.userid = new_user._id;
				req.session.user_verify = true;
				res.status(200).send({location:'/user/email/sent'});
			} else{
				res.sendError("邮箱未验证");
			};
		} else {
			res.sendError("密码错误");
		};
	},function(error){
	      console.log(error);
	      res.sendError(error);
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
	var user = req.body.user;
	UserProfileModel.findUserByEmail(req.body.name_email,function(err,user){
		if (err) {
			res.sendError(err);
		} else if(user){
			res.sendData(user.create_time, "success");
		} else{
			UserProfileModel.findUserByNickname(req.body.name_email, function (err, user_name_profile) {
			  if (user_name_profile) {
			  	res.sendData(user_name_profile.create_time, "success");
			  } else if(err){
			    res.sendError(err);
			  } else{
			  	res.sendError("没有此用户");
			  };
			});
		}
	});	
}

exports.getOneUserNew = function(req, res) {
	UserProfileModel.findUserByNickname(req.query.name, function (err, user){
		if (err) {
			res.sendError(err);
		} else{
			res.sendData(user,"success");
		}
	});	
}

exports.emailVerify = function (req, res) {
	if (req.session.sign == req.query.sign) {
		UserProfileModel.emailVerify(req.session.userid, function (err, user) {
			if (user) {
				req.session.user_verify = true;
		        res.status(301).redirect('/');
			} else{
				res.sendError("数据库错误");
			};
		});

	} else {
		res.status(401).send("<p>IP 已变更或验证码已经失效</p>");
	};
}
