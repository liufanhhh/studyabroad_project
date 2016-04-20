var Q = require('q');
var fs = require('fs');
var AdminProfile = require("../../model/AdminProfileModel.js");

exports.createNewAdmin = function(req,res){
  var admin = req.body.admin;
  admin.password = admin.password_sign;
  admin.deleted = false;
  var sameName = Q.nfbind(AdminProfile.findAdminByName.bind(AdminProfile));

  var handleNameResult = function(exist){
    var deferred = Q.defer();
    if (exist) {
      deferred.reject("管理员名字相同");
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
    },function(err){
        res.sendError(err);
    });
}