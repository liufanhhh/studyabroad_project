var Q = require('q');
var fs = require('fs');
var MerchantProfile = require("../../model/MerchantProfileModel.js");
var WebsiteProfile = require("../../model/WebsiteProfileModel.js");

exports.createNewMerchant = function(req,res){
  var merchant = req.body.merchant;
  var websit_name = "留学点评网";
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
    return deferred.promise;
  }

  sameName(merchant.name)
  .then(handleNameResult)
  .then(changeWebsiteProfile)
  .then(createMerchant)
  .done(
    function(data){
      fs.mkdir("./views/storage/Merchant/"+data.merchant_id);
      res.sendData(data,"创建成功");
    },function(error){
        res.sendError("创建失败");
    });
}