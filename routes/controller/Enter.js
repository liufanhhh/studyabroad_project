exports.enter = function(req, res) {
    console.log("enter saindex.html");
    res.sendfile("./views/saindex.html");
}
