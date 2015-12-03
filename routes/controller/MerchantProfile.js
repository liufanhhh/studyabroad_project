var Q = require('q');

var MerchantProfile = require("../../model/MerchantProfileModel.js");
var WebsiteProfile = require("../../model/WebsiteProfileModel.js");

exports.createNewMerchant = function(req,res){
  var merchant = req.body.merchant;
  var websit_name = "liufan";
  var sameName = Q.nfbind(MerchantProfile.findMerchantByName.bind(MerchantProfile));

  var handleNameResult = function(exist){
    var deferred = Q.defer();
    if (exist) {
      deferred.reject("商户名相同");
    }else{
      WebsiteProfile.getInformation(websit_name,function (err, website_profile) {
        var merchant_amount = website_profile.merchant_amount+1;
        deferred.resolve(merchant_amount);
        return deferred.promise;
      });
    }
    return deferred.promise;
  }

  var changeWebsiteProfile = function (amount) {
    var amount = amount;
    var deferred = Q.defer();
    if (!amount) {
      deferred.reject("设置失败");
    }else{
      WebsiteProfile.setMerchantsAmount(websit_name, amount, function (error, result) {
        if(result){
          result.merchant_amount++;
          deferred.resolve(result.merchant_amount);
        } else{
          deferred.reject("设置失败");
        };
        return deferred.promise;
      });
    }
    return deferred.promise;
  }

  var createMerchant = function (amount){
    var deferred = Q.defer();
    if (!amount) {
      deferred.reject("设置失败");
    }else{
      MerchantProfile.createNewMerchant(amount, merchant, function(err, new_merchant){
        deferred.resolve(new_merchant);
        return deferred.promise;
      });
    }
  }

  sameName(merchant.name)
  .then(handleNameResult)
  .then(changeWebsiteProfile)
  .then(createMerchant)
  .done(
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