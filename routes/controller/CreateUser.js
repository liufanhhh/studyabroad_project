var Q = require('q');
var fs = require('fs');

var UserProfileModel = require("../../model/UserProfileModel.js");
var WebsiteProfile =  require("../../model/WebsiteProfileModel.js");
var md5 = require("../md5.min.js");
var nodemailer = require("nodemailer");

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
        WebsiteProfile.getInformation(websit_name, function (err, website_profile) {
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

    var createConfirmEmail = function (new_user) {
      var deferred = Q.defer();
      if (new_user) {
        var sign = md5(new_user._id);
        req.session.sign = sign;
        req.session.expire_time = new Date().getTime()+20*60*60;
        req.session.userid = new_user._id;
        var transport = nodemailer.createTransport("SMTP", {
            host: "smtp.126.com",
            secureConnection: true, // use SSL
            port: 465, // port for secure SMTP
            auth: {
                user: "liuxuedianping@126.com",
                pass: "liufanHH0406"
            }
        });
        console.log("something wrong");
        transport.sendMail({
            from: "liuxuedianping@126.com",
            to: new_user.email,
            subject: "【Hello】 邮箱验证",
            //  generateTextFromHTML : true,
            html: "<b>欢迎使用</b><br/>请点击链接进行验证:" + "<br/>http://localhost:3000/verification?sign="+sign
        }, function(error, response) {
          console.log(new_user);
            if (error) {
                deferred.reject("发送失败");
            } else {
                console.log("Message sent: " + response.message);
                deferred.resolve(new_user);
            }
            transport.close();
            return deferred.promise;
        });
      };
      return deferred.promise; 
    }

    findUserByEmail(user.email)
    .then(handleEmailResult)
    .then(handleNameResult)
    .then(changeWebsiteProfile)
    .then(createUser)
    .then(createConfirmEmail)
    .done(
      function(data){
        console.log(data);
        fs.mkdir("./views/storage/user/"+data.user_id);
        res.status(200).send({location:'/user/email/sent'});
      },function(error){
          res.sendError(error);
      });
}
