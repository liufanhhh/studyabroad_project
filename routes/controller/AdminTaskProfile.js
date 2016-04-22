var Q = require('q');
var fs = require('fs');
var md5 = require("../md5.min.js");
var AdminTaskProfile = require("../../model/AdminTaskProfileModel.js");
var MerchantProfile = require("../../model/MerchantProfileModel.js");

var callbackFunction = function (res, err, profile, data) {
  var data = data||null;
  if (data!=null) {
    res.sendData(data,"获取成功");
  } else if(profile instanceof Array&&data==null){
    if (profile[0] == null) {
      res.sendData(profile,"没有符合记录");
    } else{
      res.sendData(profile,"获取成功");
    };
  } else if (profile==undefined||profile==null) {
    res.sendError("未能查询到");
  } else if(err) {
    res.sendError(err);
  } else{
    res.sendData(profile,"获取成功");
  };
}

exports.getAdminResponseMerchantList = function(req,res){
	var admin_name = req.query.admin_name;
	AdminTaskProfile.getAdminResponseMerchantList(admin_name, function (err, merchant_name_list){
		callbackFunction (res, err, merchant_name_list);
	});
}

exports.getAllTasks = function(req, res){

	var page = req.query.page;
	var page_size = req.query.page_show_amount;

	AdminTaskProfile.getAllTasks( page, page_size, function (err, tasks) {
		callbackFunction (res, err, tasks);
	});
}

exports.searchTaskById = function(req, res){
	var _id = req.query._id;
	AdminTaskProfile.searchTaskById( _id, function (err, tasks) {
		callbackFunction (res, err, tasks);
	});
}

exports.searchTaskByMerchantId = function(req, res){
	var merchant_id = req.query.merchant_id;
	AdminTaskProfile.searchTaskByMerchantId( merchant_id, function (err, tasks) {
		callbackFunction (res, err, tasks);
	});
}

exports.searchTaskByAllConditions = function(req, res){
	var task = req.query.task;
	task = JSON.parse(task);
	AdminTaskProfile.searchTaskByAllConditions( task, function (err, tasks) {
		callbackFunction (res, err, tasks);
	});
}

exports.adminTaskCreate = function(req, res){
	var task = req.body.task;
	task.merchant_id = parseInt(task.merchant_name_id);

	if (task.merchant_id!=task.merchant_id) {
		task.merchant_name = task.merchant_name_id;
		MerchantProfile.findMerchantByName(task.merchant_name_id, function (err, merchant_profile){
			if (err) {
				res.sendError(err);
			} else if(merchant_profile instanceof Array&&merchant_profile[0]!=null){
				task.merchant = {
					id: merchant_profile[0].merchant.id,
					name: merchant_profile[0].merchant.name,
					hierarchy: merchant_profile[0].merchant.hierarchy,
					willing_to_cooperate: merchant_profile[0].merchant.willing_to_cooperate
				};
				console.log("aa");
				AdminTaskProfile.createNewTask(task, function (err, task_profile){
					if (err) {
						res.sendError(err);
					} else if(task_profile!=null&&task_profile[0]==null){
						callbackFunction (res, err, task_profile);
					} else{
						console.log(merchant_profile);
						res.sendError("数据库错误");
					};
				});
			} else{
				console.log(merchant_profile);
				res.sendError("商户未查到");
			};
		})
	} else{
		MerchantProfile.findMerchantById(task.merchant_name_id, function (err, merchant_profile){
			if(merchant_profile instanceof Array&&merchant_profile[0]!=null){
				task.merchant = {
					id: merchant_profile[0].merchant.id,
					name: merchant_profile[0].merchant.name,
					hierarchy: merchant_profile[0].merchant.hierarchy,
					willing_to_cooperate: merchant_profile[0].merchant.willing_to_cooperate
				};
				AdminTaskProfile.createNewTask(task, function (err, task_profile){
					if (err) {
						res.sendError(err);
					} else if(task_profile!=null&&task_profile[0]==null){
						callbackFunction (res, err, task_profile);
					} else{
						console.log(merchant_profile);
						res.sendError("数据库错误");
					};
				});
			} else if(err){
				res.sendError(err);
			} else {
				console.log(merchant_profile);
				res.sendError("商户未查到");
			};
		});
	};
};

exports.taskAssignAdminUpdate = function(req, res){
	var _id = req.query._id;
	var assign_admin = req.query.assign_admin;
	AdminTaskProfile.taskAssignAdminUpdate( _id, assign_admin, function (err, tasks) {
		callbackFunction (res, err, tasks);
	});
}

exports.taskNoteUpdate = function(req, res){
	var _id = req.body._id;
	var new_note = req.body.new_note;
	AdminTaskProfile.taskNoteUpdate( _id, new_note, function (err, tasks) {
		callbackFunction (res, err, tasks);
	});
}

