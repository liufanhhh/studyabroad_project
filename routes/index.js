var express = require('express');
var router = express.Router();

var Enter = require('./controller/Enter.js');
var CreateUser = require('./controller/CreateUser.js');

module.exports = function(app) {
	app.all("/",Enter.enter);
	app.all("/register",CreateUser.createrNewUser);
}