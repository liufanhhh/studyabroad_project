var express = require('express');
var router = express.Router();
var path = require('path');

var Enter = require('./controller/Enter.js');
var CreateUser = require('./controller/CreateUser.js');
var Login = require('./controller/Login.js');
var MerchantArea = require('./controller/MerchantArea.js');


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






	app.all("/merchant/cooperate",MerchantArea.merchantPage);









}
