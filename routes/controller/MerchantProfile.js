var MerchantProfile = require("../../model/MerchantProfileModel.js");
var WebsiteProfile = require("../../model/WebsiteProfileModel.js");

exports.createNewMerchant = function(req,res){
  var merchant = req.body.merchant;
  var sameName = MerchantProfile.findMerchantByName(merchant.name).exec;

  var handleNameResult = function(result){
    if (result==null) {
      return WebsiteProfile.getInformation().exec;
    }else {
      return new Error('商户名相同');
    };
  };

  var createMerchant = function (result) {
    if (result==null) {
      return new Error('数据库错误');
    }else {
      var merchant_id = result.merchant_amount+1;
      return MerchantProfile.createNewMerchant(merchant).exec;
    };
  };

  sameName
  .then(handleNameResult)
  .then(createMerchant)
  .then(
    function(data){
        res.sendData(data,"创建成功");
    },function(error){
        res.sendError("创建失败");
        console.log(error);
    });
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
