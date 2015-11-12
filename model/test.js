// var UserProfileModel = require('./UserProfileModel');
// var mongoose = require("mongoose");

// mongoose.connect("mongodb://"+"localhost"+"/"+"studyabroad"+"");



// var db = mongoose.connection;

// db.on('error', function() {
// 	console.log("failed to open mongodb://" + "localhost"+"/"+"studyabroad");
// });

// db.once('open', function() {
// 	console.log("succeeded to open mongodb://" +"localhost"+"/"+"studyabroad");
// });
// var realname ="aa";
// var email = "1043099804";

// // UserProfileModel.updatePasswordByEmail(email, "123", function(error){
// // if (error) {
// // 	console.log(error);
// // } else{
// // 	console.log("success");
// // };
// // });

// var realname ="aa";

// var language_level = {
// 	name: 'IELTS'
// }
// UserProfileModel.updateEmailByRealname ( language_level,function(error,userprofile){
// 	console.log("length"+userprofile.language_level[1])
// 	if (error) {
// 		console.log(error);
// 	} else {
// 		console.log(userprofile);
// 	};
// 	db.close();
// });

// // UserProfileModel.updateUserById("56175af65e50735c2bf101a0","dd",function(error,aa){
// // 	if (error) {
// // 		console.log(error);
// // 	} else {
// // 		console.log(aa);
// // 	};
// // 	db.close();
// // });
var fs = require('fs');
var userid = 1043099806; 
path = '../views/storage/private/'+userid;
console.log(path);
fs.mkdir('../views/storage/private/'+userid,function(err){
	if(err){
		console.log(err);
	}
});