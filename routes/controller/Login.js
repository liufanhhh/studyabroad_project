var passport = require('passport');

exports.pageLogin = function(req,res) {
	return res.sendfile('./views/MerchantArea/merchantprofile.html');
}

exports.isLoggedIn = function(req, res) {
    if (req.isAuthenticated()) {
    	return res.send('Login succeeded.');
    }
    res.redirect('/Login');
}

exports.failedLogin =  function(req, res) {
    return res.send('Login failed.');
 }

exports.userLogin = function(req,res) { 
	//不同身份登陆导向不同页面 Merchant MerchantArea User UserArea 这样做两个不同的页面系统

	passport.authenticate('local-login', {
    	successRedirect: '/loginSuccess',
    	failureRedirect: '/loginFailure'
    })
}
