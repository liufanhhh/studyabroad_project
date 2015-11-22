var MerchantProfileModel = require("../../model/MerchantProfileModel.js");




exports.createrNewUser = function(req, res) {
	console.log(req.nickname);
    var email = req.query.email;
    var nickname = req.query.nickname;
    var password = req.query.password;

    MerchantProfileModel.findUserByNickname(nickname,function(err, user){
    	if (user&&user.confirm) {
    		res.sendError("用户名重复");
    	}
    	else if (err) {
    		res.sendError("系统繁忙，数据库错误");
    	}
    	else{
    		MerchantProfileModel.findUserByEmail(email,function(err,user){
    			if (user&&user.confirm) {
	    			res.sendError("邮箱重复");
    			}
    			else if (err) {
    				res.sendError("系统繁忙，数据库错误");
    			}
    			else {
    				MerchantProfileModel.createSimpleUser(nickname, email, password,function(err,user){
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
}
