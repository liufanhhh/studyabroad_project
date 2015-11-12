var fs = require('fs');

exports.imgUpload = function(req, res) {
	req.pipe(req.busboy);
	req.busboy.on('file', function (fieldname, file, filename) {
	  var stream = fs.createWriteStream('storage'+ uid + filename);
	  file.pipe(stream);
	  stream.on('close', function () {
	    res.sendSuccess('文件上传成功');
	  });
	});
}