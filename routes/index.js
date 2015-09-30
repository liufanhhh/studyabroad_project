var express = require('express');
var router = express.Router();

var Enter = require('./controller/Enter.js');
var CreateUser = require('./controller/CreateUser.js');
var MerchantProfile = require('./controller/MerchantProfile.js');

module.exports = function(app) {
	app.all("/",Enter.indexpageEnter);
	app.all("/user/signup/page",Enter.userSignUpEnter);
	app.all("/register",CreateUser.newuserCreate);

	app.all("/merchant/cooperate",Enter.merchantCooperate);
	app.all("/merchant/profile/upload",MerchantProfile.profileUpload);
}