var Q = require('q');
var fs = require('fs');

var UserProfileModel = require("../../model/UserProfileModel.js");
var md5 = require("../Util/md5.min.js");
var nodemailer = require("nodemailer");

exports.newuserCreate = function(req, res) {
    var user = req.body.user;
    console.log(user);
    var findUserByEmail = Q.nfbind(UserProfileModel.findUserByEmail.bind(UserProfileModel));

    var findUserByNickname = function(email_found_profile){
      var deferred = Q.defer();
      if (email_found_profile&&email_found_profile.user.email_confirm==true) {
        deferred.reject("邮箱相同");
      }else if(email_found_profile&&email_found_profile.user.email_confirm==false){
        createConfirmEmail(email_found_profile);
        res.status(200).send({location:'/user/email/sent'});
        deferred.reject("邮箱未验证");
      }else if(!email_found_profile) {
        UserProfileModel.findUserByNickname(user.name,function (err, user_profile) {
          if (user_profile) {
            deferred.reject("用户昵称重复");
          } else{
            deferred.resolve(1);
          };
          return deferred.promise;
        });
      };
      return deferred.promise;
    }
    var getUserId = function(email_found_profile){
      var deferred = Q.defer();
      if (email_found_profile!=1) {
        deferred.reject("服务器错误");
      }else{
        UserProfileModel.countUsersAmount(function(err, amount){
          if (err||amount==null) {
              deferred.reject("err:"+err+"服务器错误");
          } else{
              user.id = amount;
              deferred.resolve(amount);
              return deferred.promise;
          };
        });
      }
      return deferred.promise;
    }

    var createUser = function (amount){
      var deferred = Q.defer();
      if (!amount) {
        deferred.reject("设置失败");
      }else{
        user.password = user.password_sign;
        UserProfileModel.createNewUser(user, function(err, new_user){
          deferred.resolve(new_user);
          return deferred.promise;
        });
      }
      return deferred.promise;
    };

    var createConfirmEmail = function (new_user) {
      var deferred = Q.defer();
      if (new_user) {
        var sign = md5(new Date());
        req.session.sign = sign;
        req.session.userid = new_user._id;
        var expire_time = 5*60*1000;
        req.session.cookie.maxAge = expire_time;
        var transport = nodemailer.createTransport("SMTP", {
            host: "smtp.126.com",
            secureConnection: true, // use SSL
            port: 465, // port for secure SMTP
            auth: {
                user: "liuxuedianping@126.com",
                pass: "liufanHH0406"
            }
        });
        transport.sendMail({
            from: "liuxuedianping@126.com",
            to: new_user.user.email,
            subject: "【Hello】 邮箱验证",
            //  generateTextFromHTML : true,
            html: "<b>欢迎使用</b><br/>请点击链接进行验证:" + "<br/>http://localhost:3000/verification?sign="+sign
        }, function(error, response) {
            if (error) {
                console.log(error)
                deferred.reject("发送失败");
            } else {
                deferred.resolve(new_user);
            }
            transport.close();
            return deferred.promise;
        });
      };
      return deferred.promise; 
    }

    findUserByEmail(user.email)
    .then(findUserByNickname)
    .then(getUserId)
    .then(createUser)
    .then(createConfirmEmail)
    .done(
      function(data){
        fs.mkdir("./views/storage/user/"+data.user.id);
        res.status(200).send({location:'/user/email/sent'});
      },function(error){
          res.sendError(error);
      });
}
