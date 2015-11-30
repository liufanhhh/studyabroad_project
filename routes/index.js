var express = require('express');
var router = express.Router();
var path = require('path');

var Enter = require('./controller/Enter.js');
var CreateUser = require('./controller/CreateUser.js');
var Login = require('./controller/Login.js');
var MerchantProfile = require('./controller/MerchantProfile.js');

var UserInformation = require('./controller/UserInformation.js');


var Test = require('./controller/Test.js');



module.exports = function(app) {

	app.all("/",Enter.indexpageEnter);
	app.all("/user/signup/page",CreateUser.userSignUpEnter);
  app.all("/user/login/page",Login.pageLogin);
	app.post("/register",CreateUser.newuserCreate);
	app.get('/login', Login.pageLogin);
	app.post('/login', Login.userLogin);
	app.get('/loginFailure',Login.failedLogin);
	app.get('/loginSuccess', Login.isLoggedIn);
	app.post('/user/information',UserInformation.getOneUser);
	app.get('/user/information',UserInformation.getOneUserNew);




	app.all("/merchant/information/logo",MerchantProfile.merchantPage);



}
