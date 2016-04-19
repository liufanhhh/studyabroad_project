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

exports.setAdminAmount = function(req,res){
	var website_name = "留学点评网";
	var amount = req.query.amount;
	WebsiteProfile.setAdminAmount(website_name, amount, function(error, website_profile){
		if (website_profile) {
			res.sendSuccess("管理员总数已重新设定");
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
	var merchant = {
		id: 0
	};
	var user = {
		id:0
	};
	MerchantProfile.createNewMerchant(merchant, function(err, new_merchant){
        if (err||new_merchant==null) {
          	res.sendError("设置失败");
        } else{
        	UserProfile.createNewUser(user, function(err, new_user){
        		if (err||new_user==null) {
        			res.sendError("设置失败");
        		} else{
	          		res.sendSuccess("设置成功");
        		};
        	});
        };
    });
}