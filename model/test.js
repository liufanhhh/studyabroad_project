var UserProfileModel = require('./UserProfileModelBackup');
var mongoose = require("mongoose");

mongoose.connect("mongodb://"+"localhost"+"/"+"studyabroad"+"");

var db = mongoose.connection;

db.on('error', function() {
	console.log("failed to open mongodb://" + "localhost"+"/"+"studyabroad");
});

db.once('open', function() {
	console.log("succeeded to open mongodb://" +"localhost"+"/"+"studyabroad");
});
var user = {
    time: new Date(),
    nickname: "fan",
    realname: "String",
    email: "String",
    password: "String",
    mobile: "String",
    school: "String",
    major: "String",
    skill: "String",
    job: "String"
};

UserProfileModel.createSimpleUser( user,function(error,userprofile){
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

