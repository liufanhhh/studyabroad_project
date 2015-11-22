var UserProfileModel = require('./UserProfileModel');
var mongoose = require("mongoose");

mongoose.connect("mongodb://"+"localhost"+"/"+"studyabroad"+"");

var db = mongoose.connection;

db.on('error', function() {
	console.log("failed to open mongodb://" + "localhost"+"/"+"studyabroad");
});

db.once('open', function() {
	console.log("succeeded to open mongodb://" +"localhost"+"/"+"studyabroad");
});
var realname ="aa";
var email = "1043099804";

// UserProfileModel.updatePasswordByEmail(email, "123", function(error){
// if (error) {
// 	console.log(error);
// } else{
// 	console.log("success");
// };
// });

var realname ="aa";
UserProfileModel.updateEmailByRealname( realname,"acccd",function(error,userprofile){
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

