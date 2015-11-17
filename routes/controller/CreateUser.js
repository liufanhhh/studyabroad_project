var Q = require('q');
var fs = require('fs');

var UserProfileModel = require("../../model/UserProfileModel.js");
var MerchantProfileModel =  require("../../model/MerchantProfileModel.js");
var bcrypt = require('bcrypt-nodejs');

exports.userSignUpEnter = function(req,res) {
    res.sendfile("./views/SignUpLogin/signUp.html");
}

exports.newUserCreate = function(req, res) {
    var user_realname = req.body.realname;
    var user_nickname = req.body.nickname;
    var email = req.body.email;
    var password = req.body.password;
    var id_number = req.body.id_number;
    var message = "";
    console.log('aa');


    var findUserByNickname = Q.nfbind(UserProfileModel.findUserByNickname.bind(UserProfileModel));

    var nameFind = function(exist){
        var deferred = Q.defer();
        if (exist) {
            message = "用户名重复";
            deferred.resolve(1);
        }else{
            UserProfileModel.findUserByEmail(email,function(err,user){
                if (user) {
                    deferred.resolve(1);
                    message = "邮箱重复";
                }else {
                    deferred.resolve(0);
                };
            });
        };
        return deferred.promise;
    }

    var emailFind = function(exist){
        var deferred = Q.defer();
        if (exist==0){
            var newPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            UserProfileModel.countUserAmount(function(err,user_amount){
                UserProfileModel.createSimpleUser(user_nickname,user_realname,email,newPassword,id_number, user_amount, function(err,user){
                    deferred.resolve(user);
                    fs.mkdir('../../views/storage/private/'+user_amount, function(err){
                        if (err) {
                            console.log(err);
                            message = "注册失败";
                        }else{
                            message = "注册成功";
                        }
                    });

                });                
            });
        }else{
            deferred.resolve(1);
        }
        return deferred.promise;
    }


    findUserByNickname(user_nickname)
    .then(nameFind)
    .then(emailFind)
    .then(
    function(data){
        res.sendRedirect('/login',message);
        console.log(message);
    },function(error){
        res.sendError(message);
        console.log(error);
    });

}
