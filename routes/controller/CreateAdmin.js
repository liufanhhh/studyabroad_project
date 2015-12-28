var Q = require('q');
var fs = require('fs');
var adminProfile = require("../../model/adminProfileModel.js");
var WebsiteProfile = require("../../model/WebsiteProfileModel.js");

exports.createNewAdmin = function(req,res){
  var admin = req.body.admin;
  var sameName = Q.nfbind(adminProfile.findadminByName.bind(adminProfile));

  var handleNameResult = function(exist){
    var deferred = Q.defer();
    if (exist) {
      deferred.reject("商户名相同");
    }else{
      WebsiteProfile.getInformation(websit_name,function (err, website_profile) {
        var admin_amount = website_profile
        .admin_amount+1;
        deferred.resolve(admin_amount);
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
      WebsiteProfile.setadminsAmount(websit_name, amount, function (error, result) {
        if(result){
          result.admin_amount++;
          deferred.resolve(result.admin_amount);
        } else{
          deferred.reject("设置失败");
        };
        return deferred.promise;
      });
    }
    return deferred.promise;
  }

  var createadmin = function (amount){
    var deferred = Q.defer();
    if (!amount) {
      deferred.reject("设置失败");
    }else{
      adminProfile.createNewadmin(amount, admin, function(err, new_admin){
        deferred.resolve(new_admin);
        return deferred.promise;
      });
    }
    return deferred.promise;
  }

  sameName(admin.name)
  .then(handleNameResult)
  .then(changeWebsiteProfile)
  .then(createadmin)
  .done(
    function(data){
      fs.mkdir("./views/storage/admin/"+data.admin_id);
      res.sendData(data,"创建成功");
    },function(error){
        res.sendError("创建失败");
    });
}