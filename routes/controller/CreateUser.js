var Q = require('q');

var UserProfileModel = require("../../model/UserProfileModel.js");
var UserProfileModel =  require("../../model/UserProfileModel.js");
var md5 = require("../md5.min.js");

exports.newuserCreate = function(req, res) {
    var user = req.body.user;
    var websit_name = "留学点评网";
    var findUserByEmail = Q.nfbind(UserProfileModel.findUserByEmail.bind(UserProfileModel));

    var handleEmailResult = function(exist){
      var deferred = Q.defer();
      if (exist) {
        deferred.reject("邮箱相同");
      }else{
        UserProfileModel.findUserByNickname(user.name,function (err, user_profile) {
          if (user_profile) {
            deferred.reject("用户昵称重复");
          } else{
            deferred.resolve(1);
          };
          return deferred.promise;
        });
      }
      return deferred.promise;
    }
    var handleNameResult = function(exist){
      var deferred = Q.defer();
      if (exist!=1) {
        deferred.reject("服务器错误");
      }else{
        WebsiteProfile.getInformation(websit_name,function (err, website_profile) {
          var user_amount = website_profile.user_amount+1;
          deferred.resolve(user_amount);
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
        WebsiteProfile.setUsersAmount(websit_name, amount, function (error, result) {
          if(result){
            result.user_amount++;
            deferred.resolve(result.user_amount);
          } else{
            deferred.reject("设置失败");
          };
          return deferred.promise;
        });
      }
      return deferred.promise;
    }

    var createUser = function (amount){
      var deferred = Q.defer();
      if (!amount) {
        deferred.reject("设置失败");
      }else{
        UserProfileModel.createNewUser(amount, user, function(err, new_user){
          deferred.resolve(new_user);
          return deferred.promise;
        });
      }
      return deferred.promise;
    }

    findUserByEmail(user.email)
    .then(handleEmailResult)
    .then(handleNameResult)
    .then(changeWebsiteProfile)
    .then(createuser)
    .done(
      function(data){
        fs.mkdir("./views/storage/User/"+data.user_id);
        res.sendData(data,"创建成功");
      },function(error){
          res.sendError("创建失败");
      });
}
