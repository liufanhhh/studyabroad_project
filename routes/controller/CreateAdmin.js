var Q = require('q');
var fs = require('fs');
var AdminProfile = require("../../model/AdminProfileModel.js");
var WebsiteProfile = require("../../model/WebsiteProfileModel.js");

exports.createNewAdmin = function(req,res){
  var admin = req.body.admin;
  admin.password = admin.password_sign;
  var sameName = Q.nfbind(AdminProfile.findAdminByName.bind(AdminProfile));
  var websit_name = "留学点评网";

  var handleNameResult = function(exist){
    var deferred = Q.defer();
    if (exist) {
      deferred.reject("用户名相同");
    }else{
      AdminProfile.createNewAdmin(admin, function(err, new_admin){
        deferred.resolve(new_admin);
        return deferred.promise;
      });
    }
    return deferred.promise;
  }

  sameName(admin.name)
  .then(handleNameResult)
  .done(
    function(data){
      res.sendData(data,"创建成功");
    },function(error){
        console.log(error);
        res.sendError("创建失败");
    });
}