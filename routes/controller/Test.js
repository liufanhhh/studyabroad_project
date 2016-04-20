var Q = require('q');
var signature = require('./Signature.js');


// var MerchantProfile = require("../../model/MerchantProfileModel.js");
// var WebsiteProfile = require("../../model/WebsiteProfileModel.js");

// var merchant_name = "liufan";
// var websit_name = "liufan";


// var sameName = function () {
//   var deferred = Q.defer();
//   MerchantProfile.findMerchantByName(merchant_name, function (err, exist) {
//     if (exist) {
//       deferred.reject("商户名相同");
//       return deferred.promise;
//     }else{
//       console.log("step1 success");
//       deferred.resolve(false);
//       return deferred.promise;
//     }
//     return deferred.promise;
//   });
// }

// var checkWebsiteProfile = function(exist){
//   var deferred = Q.defer();
//   console.log("step2 success");
//   WebsiteProfile.getInformation(websit_name,function (err, website_profile) {
//     var merchant_amount = website_profile.merchant_amount+1;
//     deferred.resolve(merchant_amount);
//     return deferred.promise;
//   });
// }

// var changeWebsiteProfile = function (amount) {
//   var deferred = Q.defer();
//   WebsiteProfile.setMerchantsAmount(websit_name, amount, function (error, result) {
//     if(result){
//       deferred.resolve(result.merchant_amount);
//       console.log("bb");
//     } else{
//       deferred.reject("设置失败");
//     };
//     console.log("step2 success");
//     return deferred.promise;
//   });
// }

// var createMerchant = function (result){
//   var deferred = Q.defer();
//   MerchantProfileModel.createNewMerchant(merchant_amount, merchant, function(err, new_merchant){
//     if (err) {
//       deferred.reject(err);
//     } else{
//       deferred.resolve(new_merchant);
//     };
//     console.log("step3 success");
//     return deferred.promise;
//   });
// }

// sameName(merchant_name)
// .then(checkWebsiteProfile)
// .then(changeWebsiteProfile)
// // .then(createMerchant)
// .done(
//   function(data){
//       res.sendData(data,"创建成功");
//   },function(error){
//       res.sendError("创建失败");
//       console.log(error);
//   });