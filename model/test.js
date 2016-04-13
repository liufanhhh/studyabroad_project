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

var task = { 
header: '新创建的商户33311等待跟进',
  merchant: { id: 11, hierarchy: '2', willing_to_cooperate: true },
  admin: 'nobody',
  type: 'SignUpMerchant',
  status: 'initial',
  create_time: 1460544317298 
}

AdminTaskProfile.createNewTask ( task,function(error,userprofile){
	if (error) {
		console.log(error);
	} else {
		console.log(userprofile);
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

