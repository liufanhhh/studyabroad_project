var UserProfileModel = require('./UserProfileModelBackup');
var AdminTaskProfile = require("./AdminTaskProfileModel.js");
var mongoose = require("mongoose");

mongoose.connect("mongodb://"+"localhost"+"/"+"studyabroad"+"");

var db = mongoose.connection;

db.on('error', function() {
	console.log("failed to open mongodb://" + "localhost"+"/"+"studyabroad");
});

db.once('open', function() {
	console.log("succeeded to open mongodb://" +"localhost"+"/"+"studyabroad");
});


var assign_admin = ["Nobody","liufan"];

AdminTaskProfile.findTaskByFilter(assign_admin,function(error,profile){
	if (error) {
		console.log(error);
	} else {
		console.log(typeof(profile));
		console.log(profile);
	};
	db.close();
});

// UserProfileModel.updateUserById("56175af65e50735c2bf101a0","dd",function(error,aa){
// 	if (error) {
// 		console.log(error);
// 	} else {
// 		console.log(aa);
// 	};
// 	db.close();
// });

