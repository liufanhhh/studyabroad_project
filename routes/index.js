var express = require('express');
var router = express.Router();

var Enter = require('./controller/Enter.js');
var CreateUser = require('./controller/CreateUser.js');
var Brick = require('./controller/Brick.js');

module.exports = function(app) {
	app.all("/",Enter.enter);
	app.all("/register",CreateUser.createrNewUser);
	app.all("/brick",Brick.brick);
}