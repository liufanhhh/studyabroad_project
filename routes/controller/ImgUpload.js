var fs = require('fs');

exports.imgUpload = function(req, res) {
	console.log("a");
	console.log(req.body.file);
	req.pipe(req.busboy);
	req.busboy.on('file', function (fieldname, file, filename) {
	  var stream = fs.createWriteStream(__dirname + '/upload/' + filename);
	  file.pipe(stream);
	  stream.on('close', function () {
	    console.log('File ' + filename + ' is uploaded');
	    res.json({
	      filename: filename
	    });
	  });
	});
}