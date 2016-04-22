/*var UserProfileModel = require('./UserProfileModelBackup');
var AdminTaskProfile = require("./AdminTaskProfileModel.js");
var MerchantProfile = require("./MerchantProfileModel.js");
var mongoose = require("mongoose");

mongoose.connect("mongodb://"+"localhost"+"/"+"studyabroad"+"");

var db = mongoose.connection;

db.on('error', function() {
	console.log("failed to open mongodb://" + "localhost"+"/"+"studyabroad");
});

db.once('open', function() {
	console.log("succeeded to open mongodb://" +"localhost"+"/"+"studyabroad");
});

console.log(typeof(1));
var assign_admin = "5719bb8de17ecf9c0fe0243f";

AdminTaskProfile.searchTaskByMerchantId(assign_admin,function(error,profile){
	if (error) {
		console.log(error);
	} else {
		console.log(typeof(profile));
		console.log(profile);
	};
	db.close();
});*/

// MerchantProfile.findMerchantById(assign_admin, function (err, merchant_profile){
// 	console.log("aa"+merchant_profile);
// 	db.close();
// });

var task = {
	merchant_name_id:"123"
}

task.merchant_id = parseInt(task.merchant_name_id);

if (task.merchant_id!=task.merchant_id) {
	task.merchant_name = task.merchant_name_id;
	console.log("hehe");
} else{
	console.log(typeof(task.merchant_id));
};

