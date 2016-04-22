var Q = require('q');
var fs = require('fs');
var MerchantProfile = require("../../model/MerchantProfileModel.js");
var WebsiteProfile = require("../../model/WebsiteProfileModel.js");
var AdminTaskProfile = require("../../model/AdminTaskProfileModel.js");

exports.createNewMerchant = function(req,res){
  var merchant = req.body.merchant;
  merchant.password = merchant.password_sign;
  var websit_name = "留学点评网";
  var sameName = Q.nfbind(MerchantProfile.findMerchantByName.bind(MerchantProfile));

  var handleNameResult = function(exist){
    console.log(exist[0]);
    console.log("aaa");
    var deferred = Q.defer();
    if (typeof(exist)=="array"&&exist[0]!=null) {
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
    console.log(amount);
    var deferred = Q.defer();
    if (!amount) {
      deferred.reject("设置失败");
    }else{
      MerchantProfile.findMerchantByEmail(merchant.email, function (err, profile) {
        if (typeof(exist)=="array"&&exist[0]!=null) {
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
    console.log(amount);
    var deferred = Q.defer();
    if (!amount) {
      deferred.reject("设置失败");
    }else{
      merchant.id = amount;
      MerchantProfile.createNewMerchant(merchant, function(err, new_merchant){
        if (err||new_merchant==null) {
          deferred.reject("设置失败");
        } else{
          deferred.resolve(new_merchant);
        };
        return deferred.promise;
      });
    }
    return deferred.promise;
  }

  var createTask = function (merchant_profile) {
    var deferred = Q.defer();
    if (!merchant_profile) {
      deferred.reject("设置失败");
    } else{

      var task = {
        header: "新创建的商户"+merchant_profile.merchant.name+"等待跟进",
        merchant: {
            id: merchant_profile.merchant.id,
            hierarchy: merchant_profile.merchant.hierarchy,
            willing_to_cooperate: merchant_profile.merchant.willing_to_cooperate,
            name: merchant_profile.merchant.name
        },
        assign_admin: merchant.follow_up_admin,
        create_admin: "System",
        task_type: "SignUpMerchant",
        status: "Initial",
        create_time: new Date().getTime()
      };
      AdminTaskProfile.createNewTask(task, function(err, new_task){
        if (err||new_task==null) {
          deferred.reject("设置失败");
        } else{
          deferred.resolve(merchant_profile);
        };
      })
      return deferred.promise;
    };
    return deferred.promise;
  }

  sameName(merchant.name)
  .then(handleNameResult)
  .then(checkEmail)
  .then(createMerchant)
  .then(createTask)
  .done(
    function(data){
      fs.mkdir("./views/storage/merchant/"+data.merchant.id);
      res.sendData(data,"创建成功");
    },function(error){
        console.log(error);
        res.sendError(error);
    });
};




