var Q = require('q');
var fs = require('fs');
var md5 = require("../md5.min.js");
var AdminTaskProfile = require("../../model/AdminTaskProfileModel.js");

exports.getAdminResponseMerchantList = function(req,res){
	var admin_name = req.query.admin_name;
	AdminTaskProfile.getAdminResponseMerchantList(admin_name, function (err, merchant_name_list){
		if (err||merchant_name_list==null) {
			res.sendError("读取发生问题");
		} else{
			res.sendData(merchant_name_list, "读取成功");
		};
	});
}

exports.getAllTasks = function(req, res){

	var page = req.query.page;
	var page_size = req.query.page_show_amount;

	  AdminTaskProfile.getAllTasks( page, page_size, function (err, tasks) {
	    if (err) {
	      	res.sendError(err);
	    } else{
	      	res.sendData(tasks,"获取成功");
	    };
	  })
}