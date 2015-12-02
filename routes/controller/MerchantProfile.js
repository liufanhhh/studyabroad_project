var Q = require('q');

var MerchantProfile = require("../../model/MerchantProfileModel.js");
var WebsiteProfile = require("../../model/WebsiteProfileModel.js");

exports.createNewMerchant = function(req,res){
  var merchant = req.body.merchant;
  var deferred = Q.defer();
  var websit_name = "liufan";

  var sameName = function () {
    MerchantProfile.findMerchantByName(merchant.name, function (err, exist) {
      if (exist) {
        deferred.reject("商户名相同");
      } else if (err){
        deferred.reject(err);
      } else{
        deferred.resolve(exist);
      }
      return deferred.promise;
    });
  }

  var handleNameResult = function(exist){
    WebsiteProfile.getInformation(websit_name,function (err, website_profile) {
      if (website_profile) {
        var merchant_amount = website_profile.merchant_amount+1;
        WebsiteProfile.setMerchantsAmount(websit_name, merchant_amount, function (error, result) {
          if (err) {
            deferred.reject(err);
          } else if(result){
            deferred.resolve(result.merchant_amount);
          } else{
            deferred.reject("设置失败");
          };
          return deferred.promise;
        })
      } else if(err) {
        deferred.reject(err);
        return deferred.promise;
      };
  }

  var createMerchant = function (result) {
    if (result) {
      MerchantProfileModel.createNewMerchant(merchant_amount, merchant, function(err, new_merchant){
        if (err) {
          deferred.reject(err);
        } else{
          deferred.resolve(new_merchant);
        };
        return deferred.promise;
      })
    }else {
      deferred.reject("设置失败");
    };
  }

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
