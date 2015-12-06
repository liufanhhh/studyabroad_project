var WebsiteProfile = require("../../model/WebsiteProfileModel.js");
var MerchantProfile = require("../../model/MerchantProfileModel.js");
var UserProfile = require("../../model/UserProfileModel.js");

exports.setMerchantsAmount = function(req,res){
	var website_name = req.query.website_name;
	var amount = req.query.amount;
	WebsiteProfile.setMerchantsAmount(website_name, amount, function(error, website_profile){
		if (website_profile) {
			res.sendSuccess("商户总数已重新设定");
		} else{
			res.sendError("数据库错误");
		};
	})
}

exports.countMerchantsAmount = function(req,res){
	var conditions = req.query.conditions||null;
	MerchantProfile.countMerchantsAmount(conditions, function(error, amount){
		if (amount) {
			res.sendSuccess(amount);
		} else{
			res.sendError("获取失败");
		};
	});
}

exports.setUsersAmount = function(req,res){
	var website_name = req.query.website_name;
	var amount = req.query.amount;
	WebsiteProfile.setUsersAmount(website_name, amount, function(error, website_profile){
		if (website_profile) {
			res.sendSuccess("用户总数已重新设定");
		} else{
			res.sendError("数据库错误");
		};
	})
}

exports.countUsersAmount = function(req,res){
	var conditions = req.query.conditions||null;
	UserProfile.countUsersAmount(conditions, function(error, amount){
		if (amount) {
			res.sendSuccess(amount);
		} else{
			res.sendError("获取失败");
		};
	});
}

exports.createWebsiteInformation = function (req,res) {
	var website_name = req.query.website_name;
	var user_amount = req.query.user_amount||0;
	var merchant_amount = req.query.merchant_amount||0;
	console.log(website_name);
	WebsiteProfile.getInformation(website_name, function(error, website_profile){
		console.log(website_profile);
		if (website_profile == null) {
			WebsiteProfile.createWebsiteInformation(website_name, user_amount, merchant_amount, function (error, website_profile) {
				if (error) {
					res.sendError("设定失败");
				}else {
					res.sendSuccess("成功初始化网站信息");
				}
			});
		} else{
			res.sendError("设定失败");
		};
	});
}