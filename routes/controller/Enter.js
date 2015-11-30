// Redirect to a new page.

exports.indexpageEnter = function(req, res) {
    console.log("enter saindex.html");
    res.sendfile("./views/html/MerchantArea/merchantprofile.html");
}

exports.testpageEnter = function(req, res) {
    console.log("enter saindex.html");
    res.sendfile("./views/test.html");
}

