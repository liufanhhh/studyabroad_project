

exports.indexpageEnter = function(req, res) {
    console.log("enter saindex.html");
    res.sendfile("./views/saindex.html");
}

exports.userSignUpEnter = function(req,res) {
	res.sendfile("./views/UserArea/userSignUp.html");
}

exports.merchantCooperate = function(req,res) {
	res.sendfile("./views/MerchantArea/merchantCooperate.html");
}