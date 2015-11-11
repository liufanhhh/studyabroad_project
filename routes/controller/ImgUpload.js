var fs = require('fs');

exports.imgUpload = function(req, res) {
	console.log("a");
	console.log(req.session.uid);
	req.pipe(req.busboy);
	req.busboy.on('file', function (fieldname, file, filename) {
	  var stream = fs.createWriteStream('storage'+ uid + filename);
	  file.pipe(stream);
	  stream.on('close', function () {
	    console.log('File ' + filename + ' is uploaded');
	    res.sendSuccess(filename+'文件上传成功');
	  });
	});
}