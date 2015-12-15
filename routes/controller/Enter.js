// Redirect to a new page.

exports.indexpageEnter = function(req, res) {
    console.log("enter saindex.html");
    res.sendfile("./views/html/MerchantArea/merchantCooperate.html");
}
exports.adminpageEnter = function(req, res) {
    res.sendfile("./views/html/AdminArea/merchantProfileAdmin.html");
}

