// Redirect to a new page.

exports.indexpageEnter = function(req, res) {
	var session = req.session;
	console.log(req.session);
	if (session.merchant_id) {
		res.redirect("/merchant/:"+session.merchant_id);
	} else if(session.user_id){
		res.redirect("/user/:"+session.user_id);
	} else{
		console.log("enter saindex.html");
		res.sendfile("./views/html/MerchantArea/merchantCooperate.html");
	};
}


exports.adminpageEnter = function(req, res) {
    res.sendfile("./views/html/AdminArea/merchantProfileAdmin.html");
}

exports.merchantSessionLogin = function (req, res) {
  res.sendfile("./views/html/MerchantArea/merchantIndex.html");
}

// Define authentication middleware BEFORE your routes
exports.authenticateMerchant = function (req, res, next) {
	var session = req.session;
	if (session.merchant_id) {
		next();
	} else {
		res.status(500).send('<p>请先登录</p>');
	};
}

exports.authenticateUser = function (req, res, next) {
	var session = req.session;
	if (session.user_id) {
		next();
	} else {
		res.redirect("/user/login/page");
	};
}