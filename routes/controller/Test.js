
exports.pictureGet = function(req, res) {
    res.sendfile("storage/public/logo.jpg");
}

exports.userSignUpEnter = function(req,res) {
	res.sendfile("views/UserArea/userSignUp.html");
}

exports.merchantCooperate = function(req,res) {
	res.sendfile("views/MerchantArea/merchantCooperate.html");
}