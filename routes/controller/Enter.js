// Redirect to a new page.

exports.indexpageEnter = function(req, res) {
    console.log("enter saindex.html");
	// return res.sendfile('./views/MerchantArea/merchantprofile.html');
    res.sendfile("./views/saindex.html");
}

exports.testpageEnter = function(req, res) {
    console.log("enter saindex.html");
    res.sendfile("./views/test.html");
}

