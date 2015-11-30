var UserProfileModel = require("../../model/MerchantProfileModel.js");


exports.merchantPage = function(req,res){
    res.sendfile("./views/html/MerchantArea/merchantprofile.html");
}

exports.profileUpload = function(req, res) {
    
    console.log(req.body.formData);

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
