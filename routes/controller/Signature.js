var md5 = require("../md5.min.js");

exports.calculate = function (salt, value) {
	return md5(salt+"liufanhh"+md5(value));
}