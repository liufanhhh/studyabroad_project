var Q = require('q');
var fs = require('fs');
var MerchantProfile = require("../../model/MerchantProfileModel.js");
var WebsiteProfile = require("../../model/WebsiteProfileModel.js");

exports.createNewMerchant = function(req,res){
  var merchant = req.body.merchant;
  console.log(merchant);
  merchant.password = merchant.password_sign;
  var websit_name = "留学点评网";
  var sameName = Q.nfbind(MerchantProfile.findMerchantByName.bind(MerchantProfile));

  var handleNameResult = function(exist){
    var deferred = Q.defer();
    if (exist) {
      deferred.reject("商户名重复");
    }else{
      MerchantProfile.countMerchantsAmount(function (err, amount) {
        if (err||amount==null) {
          deferred.reject("网站记录出现问题");
        } else{
          var merchant_amount = amount+1;
          deferred.resolve(merchant_amount);
        };
        return deferred.promise;
      });
    }
    return deferred.promise;
  }

  var checkEmail = function(amount){
    var deferred = Q.defer();
    if (!amount) {
      deferred.reject("设置失败");
    }else{
      MerchantProfile.findMerchantByEmail(merchant, function (err, profile) {
        if (err||profile!==null) {
          deferred.reject("邮箱重复");
        } else{
          deferred.resolve(amount);
        };
        return deferred.promise;
      })
    }
    return deferred.promise;
  }

  var createMerchant = function (amount){
    var deferred = Q.defer();
    if (!amount) {
      deferred.reject("设置失败");
    }else{
      merchant.id = amount;
      MerchantProfile.createNewMerchant(merchant, function(err, new_merchant){
        deferred.resolve(new_merchant);
        return deferred.promise;
      });
    }
    return deferred.promise;
  }

  sameName(merchant)
  .then(handleNameResult)
  .then(checkEmail)
  .then(createMerchant)
  .done(
    function(data){
      fs.mkdir("./views/storage/merchant/"+data.merchant.id);
      res.sendData(data,"创建成功");
    },function(error){
        res.sendError(error);
    });
}




