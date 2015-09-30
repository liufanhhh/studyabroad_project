var UserProfileModel = require("../../model/UserProfileModel.js");
var MerchantProfileModel =  require("../../model/UserProfileModel.js");

exports.newuserCreate = function(req, res) {
    var user_realname = req.body.realname;
    var user_nickname = req.body.nickname;
    var email = req.body.email;
    var password = req.body.password;
    var userid = req.body.userid;
    var user_status = req.body.user_status;


    if (user_status=='user') {
        UserProfileModel.findUserByNickname(user_nickname,function(err, user){
            if (user&&user.confirm) {
                res.sendError("用户名重复");
            }
            else if (err) {
                res.sendError("系统繁忙，数据库错误");
            }
            else{
                UserProfileModel.findUserByEmail(email,function(err,user){
                    if (user&&user.confirm) {
                        res.sendError("邮箱重复");
                    }
                    else if (err) {
                        res.sendError("系统繁忙，数据库错误");
                    }
                    else {
                        UserProfileModel.createSimpleUser(nickname, email, password,function(err,user){
                            if (err) {
                                res.sendError("注册失败");
                            }
                            else{
                                res.sendSuccess("感谢"+user.nickname+"的支持,注册成功");
                            }
                        });
                    }
                });
            }
        });
    } else{

    };
    

}
