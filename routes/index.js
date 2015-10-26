var express = require('express');
var router = express.Router();
var path = require('path');

var Enter = require('./controller/Enter.js');
var CreateUser = require('./controller/CreateUser.js');
var MerchantProfile = require('./controller/MerchantProfile.js');
var Test = require('./controller/Test.js');

var passport = require('passport');

module.exports = function(app) {

	app.all("/",Enter.indexpageEnter);
	app.all("/user/signup/page",Enter.userSignUpEnter);
	app.all("/register",CreateUser.newuserCreate);

	app.all("/merchant/cooperate",Enter.merchantCooperate);
	app.all("/merchant/profile/upload",MerchantProfile.profileUpload);

	app.all("/picture",Test.pictureGet);
	app.all("/login",Enter.userLogin)

      var isLoggedIn = function(req, res, next) {
        if (req.isAuthenticated()) {
          return next();
        }
        res.redirect('/ShuaiLogin');
      }

    app.get('/ShuaiLogin', function(req, res, next) {
      //return res.sendfile(path.resolve('../views/shuaiLogin.html'));
      return res.sendfile('./views/shuaiLogin.html')
    });

      app.get('/loginFailure', function(req, res) {
        return res.send('Login failed.');
      });
      app.get('/loginSuccess', isLoggedIn,  function(req, res) {
        return res.send('Login succeeded.');
      });

      app.post('/ShuaiLogin', passport.authenticate('local-login', {
        successRedirect: '/loginSuccess',
        failureRedirect: '/loginFailure'
      }));

}
