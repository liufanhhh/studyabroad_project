var Q = require('q');
var fs = require('fs');
var signature = require("./Signature.js");

var UserProfileModel = require("../../model/UserProfileModel.js");


exports.getOneUser = function(req, res) {
	UserProfileModel.findUserByEmail(req.body.email,function(err,user){
		res.sendData(user,"success");
	});	
}

exports.userLogin = function (req, res) {
	var user = req.body.user;

	var findUserByEmail = Q.nfbind(UserProfileModel.findUserByEmail.bind(UserProfileModel));

	var findUserByNickname = function(user_email_profile){
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
	.then(findUserByNickname)
	.done(function(user_profile){
		console.log(user_profile.user.password);
		console.log(new Date(user_profile.user.create_time).getTime());
		if (user_profile.user.password==user.password_sign) {
			if (user_profile.user.email_confirm) {
				req.session.userid = user_profile.user._id;
				req.session.user_verify = true;
				res.status(200).send({location:'/user/login/profile'});
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
	var name_email = req.body.name_email;
	UserProfileModel.findUserByEmail(name_email,function(err,profile){
		if (err) {
			res.sendError(err);
		} else if(profile){
			res.sendData(profile.user.create_time, "success");
		} else{
			UserProfileModel.findUserByNickname(name_email, function (err, user_name_profile) {
			  if (user_name_profile) {
			  	res.sendData(user_name_profile.user.create_time, "success");
			  } else if(err){
			    res.sendError(err);
			  } else{
			  	res.sendError("没有此用户");
			  };
			});
		};
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
	console.log(req.query.sign);
	if (req.session.sign == req.query.sign) {
		UserProfileModel.findUserById(req.session.userid, function (err, user) {
			if (user) {
				req.session.user_verify = true;
				UserProfileModel.confirmUserEmail(req.session.userid, function (err, user) {
					if (user) {
						res.status(301).redirect('/');
					} else{
						res.sendError("数据库错误");
					};
				})
			} else{
				res.sendError("数据库错误");
			};
		});
	} else {
		res.status(401).send("<p>验证码错误或已经失效请重新注册</p>");
	};
}
