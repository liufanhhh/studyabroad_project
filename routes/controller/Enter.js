// Redirect to a new page.

exports.indexpageEnter = function(req, res) {
	res.sendfile("./views/saindex.html");
	var session = req.session;
	if (session.merchant_id) {
		res.sendfile("./views/html/MerchantArea/merchantIndex.html");
	} else if(session.user_id){
		res.redirect("/user/login"+session.user_id);
	} else if(session.admin){
		res.redirect("/merchant/login/"+session.merchant_id);
	} else{
		console.log("enter saindex.html");
		res.sendfile("./views/saindex.html");
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

exports.authenticateAdmin = function (req, res, next) {
	var session = req.session;
	if (session.user_id) {
		next();
	} else {
		res.redirect("/user/login/page");
	};
}