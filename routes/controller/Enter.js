

exports.indexpageEnter = function(req, res) {
    console.log("enter saindex.html");
    res.sendfile("./views/saindex.html");
}

exports.testpageEnter = function(req, res) {
    console.log("enter saindex.html");
    res.sendfile("./views/test.html");
}

exports.userSignUpEnter = function(req,res) {
	res.sendfile("./views/SignUpLogin/signUp.html");
}

exports.merchantCooperate = function(req,res) {
	res.sendfile("./views/MerchantArea/merchantCooperate.html");
}

exports.userLogin = function(req,res) {
	res.sendfile("./views/MerchantArea/merchantCooperate.html");
}
