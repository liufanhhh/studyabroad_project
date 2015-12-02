var express = require('express');
var router = express.Router();
var path = require('path');

var Enter = require('./controller/Enter.js');
var CreateUser = require('./controller/CreateUser.js');
var Login = require('./controller/Login.js');
var MerchantProfile = require('./controller/MerchantProfile.js');
var UserInformation = require('./controller/UserInformation.js');
var ResetWebsiteProfile = require('./controller/ResetWebsiteProfile.js');


var Test = require('./controller/Test.js');


module.exports = function(app) {

	app.all("/",Enter.indexpageEnter);
	app.all("/user/signup/page",CreateUser.userSignUpEnter);
    app.all("/user/login/page",Login.pageLogin);

    app.get("/website/profile/create",ResetWebsiteProfile.createWebsiteInformation);
    app.get("/website/profile/usersAmountCount",ResetWebsiteProfile.countUsersAmount);
    app.get("/website/profile/usersAmountSet",ResetWebsiteProfile.setUsersAmount);
    app.get("/website/profile/merchantsAmountCount",ResetWebsiteProfile.countMerchantsAmount);
    app.get("/website/profile/merchantsAmountSet",ResetWebsiteProfile.setMerchantsAmount);
	app.get("/login", Login.pageLogin);
	app.get("/loginFailure",Login.failedLogin);
	app.get("/loginSuccess", Login.isLoggedIn);
	app.get("/user/information",UserInformation.getOneUserNew);

	app.post("/register",CreateUser.newuserCreate);
	app.post("/login", Login.userLogin);
	app.post("/user/information",UserInformation.getOneUser);

	app.post("/merchant/profile/create", MerchantProfile.createNewMerchant);



}
